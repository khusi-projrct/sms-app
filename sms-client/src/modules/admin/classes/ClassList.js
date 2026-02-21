import React, { useEffect, useState, useCallback } from "react";
import { getClasses, deleteClass } from "../../../api/class";
import { getAllSchools } from "../../../api/school";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import PermissionGuard from "../../../auth/PermissionGuard";
import ConfirmationModal from "../../common/ConfirmationModal";
import CreateClassModal from "./CreateClassModal";
import EditClassModal from "./EditClassModal";

export default function ClassList() {
    const { token } = useAuth();
    const { showToast } = useToast();

    const [classes, setClasses] = useState([]);
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [selectedSchool, setSelectedSchool] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const [deletingClass, setDeletingClass] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    // 🔹 Fetch Schools for Filter Dropdown
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const res = await getAllSchools(token);
                setSchools(res.data);
            } catch (err) {
                console.error("Failed to load schools");
            }
        };

        if (token) {
            fetchSchools();
        }
    }, [token]);

    // Fetch Classes
    const fetchClasses = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getClasses(
                {
                    page,
                    limit,
                    search,
                    school: selectedSchool,
                },
                token
            );

            setClasses(res.data.data);
            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.error("Failed to load classes", err);
            showToast("Failed to load classes", "error");
        } finally {
            setLoading(false);
        }
    }, [page, limit, search, selectedSchool, token, showToast]);

    useEffect(() => {
        if (token) {
            fetchClasses();
        }
    }, [fetchClasses, token]);

    const handleDelete = async () => {
        try {
            setDeleteLoading(true);

            await deleteClass(deletingClass._id, token);

            showToast("Class deleted successfully");
            setDeletingClass(null);

            fetchClasses();

        } catch (err) {
            showToast("Failed to delete class", "error");
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <div className="container mt-3">
            <h3>Classes</h3>
            <hr />

            <div className="row mb-3">

                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search class..."
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </div>

                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={selectedSchool}
                        onChange={(e) => {
                            setPage(1);
                            setSelectedSchool(e.target.value);
                        }}
                    >
                        <option value="">All Schools</option>
                        {schools.map((school) => (
                            <option key={school._id} value={school._id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Create Button */}
                <div className="col-md-4 text-end">
                    <PermissionGuard permission="class:create">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowCreateModal(true)}
                        >
                            + Create Class
                        </button>
                    </PermissionGuard>
                </div>

            </div>

            {loading ? (
                <p>Loading classes...</p>
            ) : classes.length === 0 ? (
                <p>No classes found</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>School</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map((cls, index) => (
                            <tr key={cls._id}>
                                <td>{(page - 1) * limit + index + 1}</td>
                                <td>{cls.name}</td>
                                <td>{cls.schoolId?.name}</td>
                                <td>
                                    <PermissionGuard permission="class:update">
                                        <button
                                            className="btn btn-sm btn-warning me-2"
                                            onClick={() => {
                                                setSelectedClass(cls);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </PermissionGuard>

                                    <PermissionGuard permission="class:delete">
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => setDeletingClass(cls)}
                                        >
                                            Delete
                                        </button>
                                    </PermissionGuard>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                    <ul className="pagination">

                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, i) => (
                            <li
                                key={i}
                                className={`page-item ${page === i + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}

                        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </li>

                    </ul>
                </div>
            )}

            <CreateClassModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={fetchClasses}
            />

            <EditClassModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedClass(null);
                }}
                onSuccess={fetchClasses}
                selectedClass={selectedClass}
            />

            {deletingClass && (
                <ConfirmationModal
                    title="Delete Class"
                    message={`Are you sure you want to delete "${deletingClass.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeletingClass(null)}
                    loading={deleteLoading}
                />
            )}
        </div>
    );
}
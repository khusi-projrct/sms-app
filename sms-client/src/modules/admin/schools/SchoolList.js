import React, { useEffect, useState, useCallback } from "react";
import { getSchools, deleteSchool } from "../../../api/school";
import { useAuth } from "../../../context/AuthContext";
import PermissionGuard from "../../../auth/PermissionGuard";
import CreateSchoolModal from "./CreateSchoolModal";
import EditSchoolModal from "./EditSchoolModal";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useToast } from "../../../context/ToastContext";

export default function SchoolList() {
    const { token } = useAuth();
    const { showToast } = useToast();

    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [editingSchool, setEditingSchool] = useState(null);
    const [deletingSchool, setDeletingSchool] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);


    const handleDelete = async () => {
        if (!deletingSchool) return;

        try {
            setDeleteLoading(true);

            await deleteSchool(deletingSchool._id, token);

            showToast("School deleted successfully");

            setDeletingSchool(null);
            await fetchSchools();

        } catch (err) {
            console.error("Delete failed", err);

            showToast(
                err.response?.data?.message || "Failed to delete school",
                "error"
            );
        } finally {
            setDeleteLoading(false);
        }
    };

    const fetchSchools = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getSchools(
                { page, limit },
                token
            );

            setSchools(res.data.data);
            setTotalPages(res.data.totalPages);

        } catch (err) {
            console.error("Failed to load schools", err);
        } finally {
            setLoading(false);
        }
    }, [token, page, limit]);

    useEffect(() => {
        if (token) {
            fetchSchools();
        }
    }, [token, fetchSchools]);

    if (loading) return <p>Loading schools...</p>;

    return (
        <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h3>Schools</h3>

                <PermissionGuard permission="school:create">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCreate(true)}
                    >
                        + Create School
                    </button>
                </PermissionGuard>
            </div>

            <hr />

            {schools.length === 0 ? (
                <p>No schools found</p>
            ) : (
                <>
                    <table className="table table-bordered mt-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>School Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schools.map((school, index) => (
                                <tr key={school._id}>
                                    <td>{index + 1}</td>
                                    <td>{school.name}</td>

                                    <td>
                                        <PermissionGuard permission="school:update">
                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() => setEditingSchool(school)}
                                            >
                                                Edit
                                            </button>
                                        </PermissionGuard>

                                        <PermissionGuard permission="school:delete">
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => setDeletingSchool(school)}
                                            >
                                                Delete
                                            </button>
                                        </PermissionGuard>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center mt-4">
                            <nav aria-label="Pagination">
                                <ul className="pagination">

                                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(prev => prev - 1)}
                                            disabled={page === 1}
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {[...Array(totalPages)].map((_, index) => (
                                        <li
                                            key={index}
                                            className={`page-item ${page === index + 1 ? "active" : ""}`}
                                        >
                                            <button
                                                className="page-link"
                                                onClick={() => setPage(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        </li>
                                    ))}

                                    <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => setPage(prev => prev + 1)}
                                            disabled={page === totalPages}
                                        >
                                            Next
                                        </button>
                                    </li>

                                </ul>
                            </nav>
                        </div>
                    )}

                </>
            )}

            {showCreate && (
                <CreateSchoolModal
                    onClose={() => setShowCreate(false)}
                    onCreated={() => {
                        setShowCreate(false);
                        fetchSchools(); // real refetch
                    }}
                />
            )}
            {editingSchool && (
                <EditSchoolModal
                    school={editingSchool}
                    onClose={() => setEditingSchool(null)}
                    onUpdated={() => {
                        setEditingSchool(null);
                        fetchSchools();
                    }}
                />
            )}
            {deletingSchool && (
                <ConfirmationModal
                    title="Delete School"
                    message={`Are you sure you want to delete "${deletingSchool.name}"?`}
                    onConfirm={handleDelete}
                    onCancel={() => setDeletingSchool(null)}
                    loading={deleteLoading}
                />
            )}
        </div>
    );
}
import React, { useState } from "react";
import { updateSchool } from "../../../api/school";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";

export default function EditSchoolModal({ school, onClose, onUpdated }) {
    const { token } = useAuth();
    const { showToast } = useToast();

    const [name, setName] = useState(school.name);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("School name is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await updateSchool(school._id, { name }, token);
            
            showToast("School updated successfully");
            onUpdated();

        } catch (err) {
            console.error("Update failed", err);
            showToast(
                err.response?.data?.message || "Failed to update school"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Edit School</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">
                                    School Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
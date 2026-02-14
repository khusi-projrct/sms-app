import React, { useState } from "react";
import { createSchool } from "../../../api/school";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";

export default function CreateSchoolModal({ onClose, onCreated }) {
    const { token } = useAuth();
    const { showToast } = useToast();

    const [name, setName] = useState("");
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

            await createSchool({ name }, token);

            showToast("School created successfully");
            onCreated();

        } catch (err) {
            console.error("Create school failed", err);
            showToast(
                err.response?.data?.message || "Failed to create school"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Create School</h5>
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
                                {loading ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
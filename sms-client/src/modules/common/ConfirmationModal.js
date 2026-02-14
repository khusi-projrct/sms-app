import React from "react";

export default function ConfirmationModal({
    title,
    message,
    onConfirm,
    onCancel,
    loading = false,
}) {
    return (
        <div className="modal d-block">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <p>{message}</p>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onConfirm}
                            disabled={loading}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
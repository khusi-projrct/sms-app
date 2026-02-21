import React, { useEffect, useState, useCallback } from "react";
import { updateClass } from "../../../api/class";
import { getAllSchools } from "../../../api/school";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";

export default function EditClassModal({
  show,
  onClose,
  onSuccess,
  selectedClass,
}) {
  const { token } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [schools, setSchools] = useState([]);

  const [loading, setLoading] = useState(false);
  const [fetchingSchools, setFetchingSchools] = useState(false);

  //Prefill when selectedClass changes
  useEffect(() => {
    if (selectedClass) {
      setName(selectedClass.name);
      setSchoolId(selectedClass.schoolId?._id || "");
    }
  }, [selectedClass]);

  const fetchSchools = useCallback(async () => {
  try {
    setFetchingSchools(true);
    const res = await getAllSchools(token);
    setSchools(res.data);
  } catch (err) {
    console.error("Failed to fetch schools", err);
  } finally {
    setFetchingSchools(false);
  }
}, [token]);

    //Fetch schools when modal opens
  useEffect(() => {
    if (show) {
      fetchSchools();
    }
  }, [show, fetchSchools]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !schoolId) {
      showToast("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);

      await updateClass(
        selectedClass._id,
        { name, schoolId },
        token
      );

      showToast("Class updated successfully");
      onSuccess(); // refresh list
      onClose();   // close modal

    } catch (err) {
      showToast("Failed to update class", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!show || !selectedClass) return null;

  return (
    <div className="modal fade show d-block">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Edit Class</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">Class Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Select School</label>

                {fetchingSchools ? (
                  <p>Loading schools...</p>
                ) : (
                  <select
                    className="form-select"
                    value={schoolId}
                    onChange={(e) => setSchoolId(e.target.value)}
                  >
                    <option value="">-- Select School --</option>
                    {schools.map((school) => (
                      <option key={school._id} value={school._id}>
                        {school.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
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
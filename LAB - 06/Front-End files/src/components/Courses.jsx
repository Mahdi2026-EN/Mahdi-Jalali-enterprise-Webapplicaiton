import { useEffect, useState } from "react";
import { getCourses, updateCourse, deleteCourse } from "../services/courseApi";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [course, setCourse] = useState({ code: "", title: "", credits: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Initial synchronization logic on mount
  useEffect(() => {
    let active = true;
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        if (active) setCourses(response.data);
      } catch (err) {
        if (active) setError("Failed to load courses.");
        console.error(err);
      }
    };
    fetchCourses();
    return () => { active = false; };
  }, []);

  // Reusable callback to refresh table data after mutations
  const loadCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to reload table: ", err);
    }
  };

  // Pre-populates the input form safely
  const handleEdit = (selectedCourse) => {
    setEditingId(selectedCourse.id);
    setCourse({
      code: String(selectedCourse.code ?? ""),
      title: String(selectedCourse.title ?? ""),
      credits: String(selectedCourse.credits ?? "")
    });
    setMessage("");
    setError("");
  };

  // Universal dynamic keystroke handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCourse(previous => ({ ...previous, [name]: value }));
  };

  // Form submission handler for PUT requests
  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedCourse = {
      code: String(course.code ?? "").trim(),
      title: String(course.title ?? "").trim(),
      credits: Number(course.credits)
    };
    try {
      await updateCourse(editingId, updatedCourse);
      await loadCourses();
      setEditingId(null);
      setCourse({ code: "", title: "", credits: "" });
      setError("");
      setMessage("Course updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update course. Check the API response.");
    }
  };

  // Row removal click event handler
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await deleteCourse(id);
      await loadCourses();
      if (editingId === id) setEditingId(null);
      setError("");
      setMessage("Course deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete course. Check the API response.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Course Management</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Conditional Form Layer */}
      {editingId !== null && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-warning">
            <strong>Edit Course</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Course Code</label>
                  <input type="text" name="code" className="form-control" value={course.code} onChange={handleChange} required />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Course Title</label>
                  <input type="text" name="title" className="form-control" value={course.title} onChange={handleChange} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Credits</label>
                  <input type="number" name="credits" min="1" className="form-control" value={course.credits} onChange={handleChange} required />
                </div>
                <div className="col-md-2 d-flex align-items-end">
                  <button type="submit" className="btn btn-success w-100">Update</button>
                </div>
              </div>
              <button type="button" className="btn btn-secondary mt-3" onClick={() => setEditingId(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Bootstrap Data View Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th><th>Code</th><th>Title</th><th>Credits</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.code}</td>
                <td>{item.title}</td>
                <td>{item.credits}</td>
                <td>
                  <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Edit</button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courses;

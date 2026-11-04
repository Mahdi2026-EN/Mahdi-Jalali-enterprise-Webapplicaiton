import { useEffect, useState } from "react";
import { getCourses, updateCourse, deleteCourse } from "../services/courseApi";

function Courses() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [book, setBook] = useState({ 
    title: "", 
    author: "", 
    isbn: "", 
    publishedYear: "", 
    category: "" 
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Initial synchronization logic on mount
  useEffect(() => {
    let active = true;
    const fetchBooks = async () => {
      try {
        const response = await getCourses();
        if (active) setBooks(response.data);
      } catch (err) {
        if (active) setError("Failed to load books. Please ensure your backend is running.");
        console.error(err);
      }
    };
    fetchBooks();
    return () => { active = false; };
  }, []);

  // Reusable callback to refresh table data after mutations
  const loadBooks = async () => {
    try {
      const response = await getCourses();
      setBooks(response.data);
    } catch (err) {
      console.error("Failed to reload table: ", err);
    }
  };

  // Pre-populates the input form safely
  const handleEdit = (selectedBook) => {
    setEditingId(selectedBook.id);
    setBook({
      title: String(selectedBook.title ?? ""),
      author: String(selectedBook.author ?? ""),
      isbn: String(selectedBook.isbn ?? ""),
      publishedYear: String(selectedBook.publishedYear ?? ""),
      category: String(selectedBook.category ?? "")
    });
    setMessage("");
    setError("");
  };

  // Universal dynamic keystroke handler
  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook(previous => ({ ...previous, [name]: value }));
  };

  // Form submission handler for PUT requests
  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedBook = {
      title: String(book.title ?? "").trim(),
      author: String(book.author ?? "").trim(),
      isbn: String(book.isbn ?? "").trim(),
      publishedYear: Number(book.publishedYear),
      category: String(book.category ?? "").trim()
    };
    try {
      await updateCourse(editingId, updatedBook);
      await loadBooks();
      setEditingId(null);
      setBook({ title: "", author: "", isbn: "", publishedYear: "", category: "" });
      setError("");
      setMessage("Book updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update book. Check the API response.");
    }
  };

  // Row removal click event handler
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteCourse(id);
      await loadBooks();
      if (editingId === id) setEditingId(null);
      setError("");
      setMessage("Book deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete book. Check the API response.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Book Management</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Conditional Form Layer */}
      {editingId !== null && (
        <div className="card mb-4 shadow-sm">
          <div className="card-header bg-warning">
            <strong>Edit Book Details</strong>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdate}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label">Title</label>
                  <input type="text" name="title" className="form-control" value={book.title} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label">Author</label>
                  <input type="text" name="author" className="form-control" value={book.author} onChange={handleChange} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label">ISBN</label>
                  <input type="text" name="isbn" className="form-control" value={book.isbn} onChange={handleChange} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Year</label>
                  <input type="number" name="publishedYear" className="form-control" value={book.publishedYear} onChange={handleChange} required />
                </div>
                <div className="col-md-2">
                  <label className="form-label">Category</label>
                  <input type="text" name="category" className="form-control" value={book.category} onChange={handleChange} required />
                </div>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button type="submit" className="btn btn-success">Update Book</button>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Bootstrap Data View Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Published Year</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.isbn}</td>
                <td>{item.publishedYear}</td>
                <td>{item.category}</td>
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

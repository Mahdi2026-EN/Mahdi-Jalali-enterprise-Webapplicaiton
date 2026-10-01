function Courses() {
    const sampleCourses = [
        { id: 1, code: "CS301", title: "Web Information Systems", credits: 3 },
        { id: 2, code: "CS302", title: "Enterprise Web Applications", credits: 3 }
    ];
    return (
        <div>
            <h2 className="mb-4">Course Management</h2>
            <div className="card shadow-sm mb-4">
                <div className="card-header">
                    <strong>Add New Course</strong>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-3">
                                <label className="form-label">Course Code</label>
                                <input type="text" className="form-control"
                                       placeholder="e.g. CS401" />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">Course Title</label>
                                <input type="text" className="form-control"
                                       placeholder="Course title" />
                            </div>
                            <div className="col-md-2">
                                <label className="form-label">Credits</label>
                                <input type="number" className="form-control" min="1" />
                            </div>
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="button" className="btn btn-primary w-100">
                                    Add Course
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="card shadow-sm">
                <div className="card-header"><strong>Course List</strong></div>
                <div className="card-body">
                    <div className="table-responsive">
   <table className="table table-bordered table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th><th>Code</th><th>Title</th>
                                    <th>Credits</th><th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sampleCourses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.code}</td>
                                        <td>{course.title}</td>
                                        <td>{course.credits}</td>
                                        <td>
                                            <button type="button"
                                                className="btn btn-sm btn-warning me-2">
                                                Edit
                                            </button>
                                            <button type="button"
                                                className="btn btn-sm btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Courses;
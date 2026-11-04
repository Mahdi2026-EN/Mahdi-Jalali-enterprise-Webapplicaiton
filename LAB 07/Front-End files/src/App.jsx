import Courses from "./components/Courses";

function App() {
  return (
    <div>
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">CompusHub Portal</span>
        </div>
      </nav>

      {/* Main Lab 6 Course Component */}
      <Courses />
    </div>
  );
}

export default App;

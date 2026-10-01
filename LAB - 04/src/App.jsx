import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import Students from "./components/Students";
import Sections from "./components/Sections";
import Registrations from "./components/Registrations";
function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/students" element={<Students />} />
                <Route path="/sections" element={<Sections />} />
                <Route path="/registrations" element={<Registrations />} />
            </Routes>
        </Layout>
    );
}
export default App;
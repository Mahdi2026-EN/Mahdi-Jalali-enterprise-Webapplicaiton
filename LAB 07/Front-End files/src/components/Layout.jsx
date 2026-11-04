import Navbar from "./Navbar";
function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main className="container mt-4">
                {children}
            </main>
        </>
    );
}
export default Layout;
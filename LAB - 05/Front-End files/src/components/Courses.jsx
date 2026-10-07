import { useEffect, useState } from "react";
import { getBooks } from "../services/bookApi";

export default function Courses() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function fetchBooks() {
            try {
                setIsLoading(true);
                setError("");
                const response = await getBooks();
                if (!ignore) {
                    setBooks(response.data);
                }
            } catch (err) {
                if (!ignore) {
                    setError("Unable to load books. Check the backend and try again.");
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        fetchBooks();
        return () => { ignore = true; };
    }, []);

    if (isLoading) {
        return <p style={{ textAlign: "center", padding: "20px" }}>Loading books...</p>;
    }

    if (error) {
        return <p style={{ color: "red", textAlign: "center", padding: "20px" }}>{error}</p>;
    }

    return (
        <section style={{ padding: "20px" }}>
            <h2>Book Inventory Management</h2>
            
            <p><strong>Total Books Available:</strong> {books.length}</p>

            {books.length === 0 ? (
                <p>No books available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Published Year</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td><code>{book.isbn}</code></td>
                                <td>{book.publishedYear}</td>
                                <td>{book.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
}

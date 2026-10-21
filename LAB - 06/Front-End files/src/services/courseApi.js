import axios from "axios";

// Points exactly to your Spring Boot Book API endpoint
const API_URL = "http://localhost:8080/api/v1/books";

/**
 * Fetch all books from the backend
 */
export const getCourses = async () => {
  return await axios.get(API_URL);
};

/**
 * Update an existing book's details by ID
 * @param {number|string} id - The ID of the book to update
 * @param {object} updatedBook - The body containing title, author, isbn, publishedYear, category
 */
export const updateCourse = async (id, updatedBook) => {
  return await axios.put(`${API_URL}/${id}`, updatedBook);
};

/**
 * Delete a book from the system by ID
 * @param {number|string} id - The ID of the book to delete
 */
export const deleteCourse = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

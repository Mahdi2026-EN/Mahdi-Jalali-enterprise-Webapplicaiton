import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/courses";

// GET - Retrieves the entire course list
export const getCourses = () => {
  return axios.get(API_URL);
};

// PUT - Updates a course by appending its ID to the URL path
export const updateCourse = (id, course) => {
  return axios.put(`${API_URL}/${id}`, course);
};

// DELETE - Removes a course record by its ID
export const deleteCourse = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/books";

export function getBooks() {
    return axios.get(API_URL);
}

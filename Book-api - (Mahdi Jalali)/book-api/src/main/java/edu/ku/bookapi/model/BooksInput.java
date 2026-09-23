package edu.ku.bookapi.model;

public record BooksInput(
        String title,
        String author,
        String isbn,
        int publishedYear,
        String category
) {
}
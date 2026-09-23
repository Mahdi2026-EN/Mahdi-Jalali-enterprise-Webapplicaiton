package edu.ku.bookapi.controller;

import edu.ku.bookapi.model.Books;
import edu.ku.bookapi.model.BooksInput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

    /*
     * Initial list of books
     */
    private final List<Books> books = new ArrayList<>(List.of(

            new Books(
                    1L,
                    "Clean Code",
                    "Robert C. Martin",
                    "9780132350884",
                    2008,
                    "Software Engineering"
            ),

            new Books(
                    2L,
                    "Effective Java",
                    "Joshua Bloch",
                    "9780134685991",
                    2018,
                    "Java"
            ),

            new Books(
                    3L,
                    "Designing Data-Intensive Applications",
                    "Martin Kleppmann",
                    "9781449373320",
                    2017,
                    "Distributed Systems"
            ),

            new Books(
                    4L,
                    "Spring in Action",
                    "Craig Walls",
                    "9781617297571",
                    2022,
                    "Spring"
            ),

            new Books(
                    5L,
                    "Computer Networks",
                    "Andrew S. Tanenbaum",
                    "9780132126953",
                    2010,
                    "Networking"
            )
    ));


    /*
     * GET
     * Get all books
     *
     * GET /api/v1/books
     */
    @GetMapping
    public List<Books> getAllBooks() {
        return books;
    }


    /*
     * PUT
     * Update an existing book
     *
     * PUT /api/v1/books/{bookId}
     */
    @PutMapping("/{bookId}")
    public ResponseEntity<?> updateBook(
            @PathVariable Long bookId,
            @RequestBody BooksInput input
    ) {

        for (Books book : books) {

            if (book.getId().equals(bookId)) {

                // Keep the original ID
                book.setTitle(input.title());
                book.setAuthor(input.author());
                book.setIsbn(input.isbn());
                book.setPublishedYear(input.publishedYear());
                book.setCategory(input.category());

                return ResponseEntity.ok(book);
            }
        }

        // Book was not found
        return ResponseEntity.notFound().build();
    }


    /*
     * DELETE
     * Delete an existing book
     *
     * DELETE /api/v1/books/{bookId}
     */
    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(
            @PathVariable Long bookId
    ) {

        for (int i = 0; i < books.size(); i++) {

            if (books.get(i).getId().equals(bookId)) {

                books.remove(i);

                return ResponseEntity.noContent().build();
            }
        }

        // Book was not found
        return ResponseEntity.notFound().build();
    }
}
package edu.ku.bookapi.controller;

import edu.ku.bookapi.model.Books;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
public class BookController {

    private final List<Books> books = List.of(
            new Books(1L, "Clean Code", "Robert C. Martin",
                    "9780132350884", 2008, "Software Engineering"),
            new Books(2L, "Effective Java", "Joshua Bloch",
                    "9780134685991", 2018, "Java"),
            new Books(3L, "Designing Data-Intensive Applications", "Martin Kleppmann",
                    "9781449373320", 2017, "Distributed Systems"),
            new Books(4L, "Spring in Action", "Craig Walls",
                    "9781617297571", 2022, "Spring"),
            new Books(5L, "Computer Networks", "Andrew S. Tanenbaum",
                    "9780132126953", 2010, "Networking")
    );

    @GetMapping
    public List<Books> getAllBooks() {
        return books;
    }
}
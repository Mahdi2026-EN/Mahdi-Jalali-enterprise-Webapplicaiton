# Mahdi-Jalali(enterprise-Web-Application)
** This repository made for doing the Enterprise Web Application LAB Assignments **

## 1. Working on Campus Hub Web-Application
** The Campus Hub made of some parts as bellow: **
## Project Structure
Core components of Campus-Hub web-application:

1. **`EduApplication.java`** | Entry Point | The main initialization file that bootstraps and runs the entire Spring Boot/Java web application. 
2. **`CourseController.java`** | Controller Layer | Manages incoming HTTP client requests, handles business workflow coordination, and dispatches JSON responses. 
3. **`Course.java`** | Model / Entity | Defines the schema, fields, and structural data properties representing a Course object. 
4. **`CourseInput.java`** | Data Access Layer | Defines data ingestion formats and handles reading/writing course records directly to a local JSON storage file. 
5. **`application.properties`**| Configuration | Central configuration file specifying server variables like active ports, database setups, and environment profiles. 


## 2. Working with Bookapi Web_application
11. Reflection Questions

1. Why is GET appropriate for /api/v1/books?
GET is appropriate because we are using this endpoint to retrieve or read books from the server. We are not creating, updating, or deleting anything. In REST APIs, GET is normally used when we just want to get information.

2. What is the purpose of @RestController?
@RestController tells Spring Boot that this class will handle HTTP requests and return data as a response. In our case, BookController uses it to receive requests related to books and return the book information, usually as JSON.

3. What does <Books> mean in List<Books>?
<Books> tells Java what type of objects the list will contain. So, List<Books> means that the list can contain multiple Books objects. It also helps Java make sure that we are working with the correct type of data.

4. Why is books plural in the URI, and what does v1 represent?
books is plural because the endpoint represents a collection of books, not just one book.
v1 means version 1 of the API. If we make major changes to the API later, we could create something like /api/v2/books without breaking applications that are still using version 1.

5. How does a Java List<Books> become JSON without manually writing JSON code?
Spring Boot automatically handles this for us. When the controller returns a List<Books>, Spring uses a library called Jackson to convert the Java objects into JSON. This means we don't have to manually write the JSON format ourselves.

6. What would happen if BookController were placed outside the package hierarchy scanned by the Spring Boot application?
Spring Boot might not find the BookController, because it normally scans the package where the main application class is located and its subpackages. If the controller is outside that scanned area, Spring won't register it, and requests to /api/v1/books may result in a 404 Not Found error.


# Books REST API - Spring Boot Lab Assignment 03


## What I did in this assignment:
The purpose of this lab was to practice working with REST APIs using Spring
Boot, especially how to update and delete resources using HTTP PUT and DELETE
methods.

For testing the API, I used Postman.


# About This Project

In this lab, I worked on a simple Books REST API.

The application keeps a list of books and provides REST endpoints that allow
a client to:

- View all books
- Update an existing book
- Delete a book
- Check what happens when a requested book does not exist

The project helped me understand how a Spring Boot controller receives HTTP
requests and sends responses back to a client such as Postman.


# Main Objectives

The main objectives of this lab were:

1. Understand the HTTP PUT method.
2. Understand the HTTP DELETE method.
3. Use `@PutMapping` in Spring Boot.
4. Use `@DeleteMapping` in Spring Boot.
5. Use `@PathVariable` to get a book ID from the URL.
6. Use `@RequestBody` to receive JSON data.
7. Return appropriate HTTP status codes.
8. Test REST API endpoints using Postman.
9. Understand how a REST API works with resources.




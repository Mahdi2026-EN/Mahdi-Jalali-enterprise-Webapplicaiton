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

## A mention:
### Form LAB (1 - 3) I was pushed the projects to the main branch because they were the same project but in different steps
### Form now on I will make a separate folder for each LAB assignment just like LAB - 04

# LAB 04 ( since it is the prerequisites for making front end using React framework):
1. Making a react project file
2. Installing the react project content using the "npm install vite@latest project-name"
3. After installing the react project content we have to download the dependencies for running the project using "npm install" this
4. Running the project using the "npm run dev" 
5. By default the project will be run in "localhost:5173" 


# Kabul University | Faculty of Computer Science
## Enterprise Web App — Course/Book API Integration Lab
**Lab-05**
**Student Name:** [Mahdi Jalali]  
**Father's Name:** [Abdullah]  
**Department:** Computer Science Information System    
**Lab Date:** 7 October 2026
---------------------------------

## Execution & Port Instructions

### Backend (Spring Boot) I made the Backend files in Bookapi folder
* **Port:** `http://localhost:8080`
* **Run Command:** ./mvnw spring-boot:run
* **REST Endpoint:** `GET http://localhost:8080/api/v1/books`

### Frontend (ReactJS + Vite)
* **Port:** `http://localhost:5173`
* **Run Command:** `npm run dev`
* **Target View Route:** `http://localhost:5173/courses`
---

## Lab Assessment Questions & Answers

### 1. Why use `useEffect` here?
We use `useEffect` with an empty dependency array (`[]`) to execute a "side effect"—specifically an asynchronous HTTP 
request to fetch data from our external backend API. By setting the dependency array to empty, we ensure that the network 
request runs exactly once automatically right after the component mounts onto the screen.

### 2. What does `setCourses` (or `setBooks`) do?
It is a state updater function provided by the `useState` hook. When we call it with new data returned from our Axios request, it 
updates our local state variable and tells React that the component data has changed. This automatically triggers a UI re-render, 
safely replacing any loading screens with our filled data table.

### 3. Why can Postman work while a browser request fails?
Postman is a server-to-server desktop utility application that executes requests directly through your operating system's network 
layer, completely ignoring browser-specific application security controls. Browsers, however, strictly enforce a security policy called 
**CORS (Cross-Origin Resource Sharing)**. If a frontend application hosted on port `5173` tries to fetch data from a backend server on 
port `8080`, the browser will immediately block the request unless the backend explicitly sends a permissive `@CrossOrigin` header granting entry.




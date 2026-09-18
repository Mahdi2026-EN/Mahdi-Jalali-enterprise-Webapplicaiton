** 11. Reflection Questions ** 

*1. Why is GET appropriate for /api/v1/books? *
  GET is appropriate because we are using this endpoint to retrieve or read books from the server. We are not creating, updating, or deleting anything. In REST APIs, GET is normally used when we just want to get information.

*2. What is the purpose of @RestController?
   @RestController tells Spring Boot that this class will handle HTTP requests and return data as a response. In our case, BookController uses it to receive requests related to books and return the book information, usually as JSON.

*3. What does <Books> mean in List<Books>?
   <Books> tells Java what type of objects the list will contain. So, List<Books> means that the list can contain multiple Books objects. It also helps Java make sure that we are working with the correct type of data.

*4. Why is books plural in the URI, and what does v1 represent?
   books is plural because the endpoint represents a collection of books, not just one book.
   v1 means version 1 of the API. If we make major changes to the API later, we could create something like /api/v2/books without breaking applications that are still using version 1.

*5. How does a Java List<Books> become JSON without manually writing JSON code?
   Spring Boot automatically handles this for us. When the controller returns a List<Books>, Spring uses a library called Jackson to convert the Java objects into JSON. This means we don't have to manually write the JSON format ourselves.

*6. What would happen if BookController were placed outside the package hierarchy scanned by the Spring Boot application?*
   Spring Boot might not find the BookController, because it normally scans the package where the main application class is located and its subpackages. If the controller is outside that scanned area, Spring won't register it, and requests to /api/v1/books may result in a 404 Not Found error.
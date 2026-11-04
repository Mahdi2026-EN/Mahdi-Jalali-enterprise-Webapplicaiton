package edu.ku.bookapi.controller;

import edu.ku.bookapi.model.Course;
import edu.ku.bookapi.model.CourseInput;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

public class CourseControllerTest {

    private CourseController courseController;

    @BeforeEach
    public void setUp() {
        // Initializes a fresh controller instance before each test case
        this.courseController = new CourseController();
    }

    @Test
    public void test01_FindExistingCourse() {
        ResponseEntity<?> response = courseController.getCourseById(101L);

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());

        Course course = (Course) response.getBody();
        assertEquals(101L, course.getId());
        assertEquals("IS-401", course.getCode());
    }

    @Test
    public void test02_LookUpMissingCourse() {
        ResponseEntity<?> response = courseController.getCourseById(9999L);

        assertEquals(404, response.getStatusCode().value());
        assertNull(response.getBody());
    }

    @Test
    public void test03_CreateValidCourse() {
        CourseInput input = new CourseInput("IS-404", "Software Testing", 3);

        // Handled wildcard type by assigning to ResponseEntity<?>
        ResponseEntity<?> response = courseController.createCourse(input);

        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());

        // Cast the body safely to a Course object to assert values
        Course createdCourse = (Course) response.getBody();
        assertEquals("IS-404", createdCourse.getCode());
        assertEquals(3, createdCourse.getCredits());
    }

    @Test
    public void test04_RejectZeroCredits() {
        CourseInput input = new CourseInput("IS-404", "Software Testing", 0);

        ResponseEntity<?> response = courseController.createCourse(input);

        assertEquals(400, response.getStatusCode().value());
        assertNotNull(response.getBody());

        // Verifies the response text communicates the validation requirement
        String errorMessage = response.getBody().toString().toLowerCase();
        assertTrue(errorMessage.contains("credit") || errorMessage.contains("positive"));
    }

    @Test
    public void test05_DeleteExistingCourse() {
        ResponseEntity<?> deleteResponse = courseController.deleteCourse(103L);
        assertEquals(204, deleteResponse.getStatusCode().value());

        ResponseEntity<?> lookupResponse = courseController.getCourseById(103L);
        assertEquals(404, lookupResponse.getStatusCode().value());
    }
}

package CapusHub.edu.controller;

import CapusHub.edu.model.Course;
import CapusHub.edu.model.CourseInput;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {
    private final List<Course> courses = new CopyOnWriteArrayList<>(
            List.of(
                    new Course(101L, "IS-401", "Enterprise Web Application Development", 3),
                    new Course(102L, "IS-402", "Database Systems", 3),
                    new Course(103L, "IS-403", "Software Project Management", 3)
            )
    );
    private final AtomicLong nextId = new AtomicLong(104);

    @GetMapping
    public List<Course> getAllCourses(
            @RequestParam(required = false) String keyword
    ) {
        if (keyword == null || keyword.isBlank()) {
            return courses;
        }
        String searchText = keyword.toLowerCase();
        return courses.stream()
                .filter(course ->
                        course.code().toLowerCase().contains(searchText)
                                || course.title().toLowerCase().contains(searchText)
                )
                .toList();
    }

    @GetMapping("/{courseId}")
    public ResponseEntity<Course> getCourseById(
            @PathVariable Long courseId
    ) {
        return courses.stream()
                .filter(course -> course.id().equals(courseId))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCourse(
            @RequestBody CourseInput input
    ) {
        if (input.code() == null || input.code().isBlank()
                || input.title() == null || input.title().isBlank()
                || input.credits() <= 0) {
            return ResponseEntity.badRequest().body(
                    "Course code, title, and a positive credit value are required."
            );
        }
        boolean duplicateCode = courses.stream()
                .anyMatch(course -> course.code().equalsIgnoreCase(input.code()));
        if (duplicateCode) {
            return ResponseEntity.status(409).body(
                    "A course with this code already exists."
            );
        }
        Course newCourse = new Course(
                nextId.getAndIncrement(),
                input.code().trim().toUpperCase(),
                input.title().trim(),
                input.credits()
        );
        courses.add(newCourse);
        URI location = URI.create("/api/v1/courses/" + newCourse.id());
        return ResponseEntity.created(location).body(newCourse);
    }

    @PutMapping("/{courseId}")
    public ResponseEntity<?> updateCourse(
            @PathVariable Long courseId,
            @RequestBody CourseInput input
    ) {
        for (int index = 0; index < courses.size(); index++) {
            Course existingCourse = courses.get(index);
            if (existingCourse.id().equals(courseId)) {
                Course updatedCourse = new Course(
                        courseId,
                        input.code().trim().toUpperCase(),
                        input.title().trim(),
                        input.credits()
                );
                courses.set(index, updatedCourse);
                return ResponseEntity.ok(updatedCourse);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{courseId}")
    public ResponseEntity<Void> deleteCourse(
            @PathVariable Long courseId
    ) {
        boolean removed = courses.removeIf(course -> course.id().equals(courseId));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}


package mk.ukim.finki.soa.internshipmanagement.exception.handler

import mk.ukim.finki.soa.internshipmanagement.exception.InternshipNotFoundException
import mk.ukim.finki.soa.internshipmanagement.exception.InternshipStudentCVNotFoundException
import mk.ukim.finki.soa.internshipmanagement.exception.InternshipWeekNotFoundException
import mk.ukim.finki.soa.internshipmanagement.exception.InvalidInternshipStateException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class InternshipExceptionHandler {

    //TODO: Make a base ResourceNotFoundException handler

    @ExceptionHandler(InternshipNotFoundException::class)
    fun handleInternshipNotFound(ex: InternshipNotFoundException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message ?: "Internship not found")
    }

    @ExceptionHandler(InternshipStudentCVNotFoundException::class)
    fun handleInternshipStudentCVNotFoundException(ex: InternshipStudentCVNotFoundException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message ?: "Internship student CV not found")
    }

    @ExceptionHandler(InternshipWeekNotFoundException::class)
    fun handleInternshipWeekNotFound(ex: InternshipWeekNotFoundException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message ?: "Internship week not found")
    }

    @ExceptionHandler(InvalidInternshipStateException::class)
    fun handleInvalidInternshipState(ex: InvalidInternshipStateException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.message ?: "Invalid internship state")
    }
}
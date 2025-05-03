package mk.ukim.finki.soa.internshipmanagement.exception.handler

import mk.ukim.finki.soa.internshipmanagement.exception.InternshipNotFoundException
import org.axonframework.modelling.command.AggregateNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class InternshipExceptionHandler {

    @ExceptionHandler(InternshipNotFoundException::class)
    fun handleInternshipNotFound(ex: InternshipNotFoundException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message ?: "Internship not found")
    }
}
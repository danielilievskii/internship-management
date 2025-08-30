package mk.ukim.finki.soa.internshipmanagement.exception.handler

import mk.ukim.finki.soa.internshipmanagement.exception.AuthException
import mk.ukim.finki.soa.internshipmanagement.exception.UserNotFoundException
import org.axonframework.modelling.command.AggregateNotFoundException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.http.converter.HttpMessageNotReadableException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(HttpMessageNotReadableException::class)
    fun handleHttpMessageNotReadable(ex: HttpMessageNotReadableException): ResponseEntity<String> {
        val causeMessage = ex.mostSpecificCause.message ?: "Invalid request payload"
        return ResponseEntity.badRequest().body(causeMessage)
    }

    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgument(ex: IllegalArgumentException): ResponseEntity<String> {
        return ResponseEntity.badRequest().body(ex.message ?: "Bad request")
    }

    @ExceptionHandler(IllegalStateException::class)
    fun handleIllegalState(ex: IllegalStateException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.message ?: "Conflict with current state")
    }

    @ExceptionHandler(AggregateNotFoundException::class)
    fun handleAggregateNotFound(ex: AggregateNotFoundException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.message ?: "Aggregate not found")
    }

    @ExceptionHandler(UserNotFoundException::class)
    fun handleUserNotFound(ex: UserNotFoundException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.message ?: "User not found")
    }

    @ExceptionHandler(AuthException::class)
    fun handleAuthException(ex: AuthException): ResponseEntity<String> {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.message ?: "Authentication exception")
    }
}
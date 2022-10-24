package com.example.be.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> resourceNotFoundExceptionHandler(ResourceNotFoundException exception) {
        ErrorMessage errorMessage = new ErrorMessage("NOT_FOUND", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UniqueFieldException.class)
    public ResponseEntity<?> uniqueFieldExceptionHandler(UniqueFieldException exception) {
        ErrorMessage errorMessage = new ErrorMessage("UNIQUE", exception.getMessage(), new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }
}

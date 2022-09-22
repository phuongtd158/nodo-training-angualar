package com.example.nodotrainingbe.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handlerResourceNotFoundException(ResourceNotFoundException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage(), "NOT_FOUND", new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExistException.class)
    public ResponseEntity<?> handlerExistException(ExistException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage(), "EXISTED", new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TotalBookLimitException.class)
    public ResponseEntity<?> handlerBookLimitBookException(TotalBookLimitException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage(), "MAX", new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BookTotalException.class)
    public ResponseEntity<?> handlerTotalBookException(BookTotalException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage(), "MAX_TOTAL", new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IsBeforeDateException.class)
    public ResponseEntity<?> handlerIsBeforeDateException(IsBeforeDateException exception) {
        ErrorMessage errorMessage = new ErrorMessage(exception.getMessage(), "DATE_INVALID", new Date());
        return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
    }

}

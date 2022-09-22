package com.example.nodotrainingbe.exception;

public class TotalBookLimitException extends RuntimeException {
    public TotalBookLimitException(String message) {
        super(message);
    }
}

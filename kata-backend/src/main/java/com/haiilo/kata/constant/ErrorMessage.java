package com.haiilo.kata.constant;

public class ErrorMessage {
    public final static String PRODUCT_NOT_FOUND = "No products found!";

    private ErrorMessage() {
        throw new IllegalStateException("Utility class");
    }
}

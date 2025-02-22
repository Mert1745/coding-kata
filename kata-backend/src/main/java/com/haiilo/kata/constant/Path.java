package com.haiilo.kata.constant;

public class Path {
    public final static String PRODUCTS = "/products";
    public final static String CHECKOUT = "/checkout";

    private Path() {
        throw new IllegalStateException("Utility class");
    }
}

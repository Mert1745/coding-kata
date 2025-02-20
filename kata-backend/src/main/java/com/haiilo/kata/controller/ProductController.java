package com.haiilo.kata.controller;

import com.haiilo.kata.constant.Paths;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @GetMapping(Paths.PRODUCTS)
    public ResponseEntity<String> getProducts() {
        return ResponseEntity.ok("Apples, Bananas, Oranges");
    }
}

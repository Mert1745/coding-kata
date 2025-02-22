package com.haiilo.kata.controller;

import com.haiilo.kata.constant.Path;
import com.haiilo.kata.domain.Checkout;
import com.haiilo.kata.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping(Path.CHECKOUT)
    public ResponseEntity<Boolean> checkout(@RequestBody Checkout checkout) {
        return ResponseEntity.ok(cartService.checkout(checkout));
    }
}

package com.haiilo.kata.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
class CartControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void checkout_ShouldReturnTrue_WhenValidRequest() throws Exception {
        String checkoutJson = """
        {
            "price": 120.00,
            "carts": [
                {
                    "quantity": 4,
                    "product": {
                        "id": 1
                    }
                }
            ]
        }
        """;

        mockMvc.perform(post("/checkout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(checkoutJson))
                .andExpect(status().isOk())
                .andExpect(content().string("true"));  // Expecting `true` for a valid checkout
    }

    @Test
    void checkout_ShouldReturnFalse_WhenPriceMismatch() throws Exception {
        String checkoutJson = """
        {
            "price": 100.00,
            "carts": [
                {
                    "quantity": 4,
                    "product": {
                        "id": 1
                    }
                }
            ]
        }
        """;

        mockMvc.perform(post("/checkout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(checkoutJson))
                .andExpect(status().isOk())
                .andExpect(content().string("false"));  // Expecting `false` since price doesn't match
    }

    @Test
    void checkout_ShouldReturn404_WhenProductDoesNotExist() throws Exception {
        String checkoutJson = """
        {
            "price": 50.00,
            "carts": [
                {
                    "quantity": 1,
                    "product": {
                        "id": 999
                    }
                }
            ]
        }
        """;

        mockMvc.perform(post("/checkout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(checkoutJson))
                .andExpect(status().isNotFound());  // Expecting 404 because product doesn't exist
    }
}


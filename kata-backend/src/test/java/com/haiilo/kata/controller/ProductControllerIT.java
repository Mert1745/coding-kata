package com.haiilo.kata.controller;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
class ProductControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    void getProducts_ShouldReturnProductList() throws Exception {
        mockMvc.perform(get("/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())  // HTTP 200 OK
                .andExpect(jsonPath("$.length()").value(3))  // Expecting 3 products
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Apple"))
                .andExpect(jsonPath("$[0].prices.length()").value(2))  // Apple has 2 price entries
                .andExpect(jsonPath("$[0].prices[0].id").value(1))
                .andExpect(jsonPath("$[0].prices[0].amount").value(35.00))
                .andExpect(jsonPath("$[0].prices[0].quantity").value(1))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Banana"))
                .andExpect(jsonPath("$[1].prices.length()").value(2))  // Banana has 2 price entries
                .andExpect(jsonPath("$[2].id").value(3))
                .andExpect(jsonPath("$[2].name").value("Orange"))
                .andExpect(jsonPath("$[2].prices.length()").value(1));  // Orange has 1 price entry
    }

    @Test
    @DirtiesContext
    void getProducts_ShouldReturn404_WhenNoProductsExist() throws Exception {
        // Delete all products from the database
        entityManager.createQuery("DELETE FROM Price").executeUpdate();
        entityManager.createQuery("DELETE FROM Product").executeUpdate();
        entityManager.flush();  // Ensure changes are applied before test

        mockMvc.perform(get("/products")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())  // Expecting 404
                .andExpect(content().string("No products found!"));  // Expected error message
    }
}

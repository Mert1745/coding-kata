package com.haiilo.kata.service;

import com.haiilo.kata.domain.*;
import com.haiilo.kata.exception.ProductNotFoundException;
import com.haiilo.kata.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;

    @BeforeEach
    void setUp() {
        Price price = new Price(1L, BigDecimal.TEN, 1, product);
        product = new Product(1L, "Product A", List.of(price));
    }

    @Test
    void getProducts_ShouldReturnProductList_WhenProductsExist() {
        when(productRepository.findAll()).thenReturn(List.of(product));

        List<ProductDTO> result = productService.getProducts();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(product.getId(), result.get(0).id());
        assertEquals(product.getName(), result.get(0).name());

        verify(productRepository, times(1)).findAll();
    }

    @Test
    void getProducts_ShouldThrowException_WhenNoProductsFound() {
        when(productRepository.findAll()).thenReturn(Collections.emptyList());

        assertThrows(ProductNotFoundException.class, () -> productService.getProducts());

        verify(productRepository, times(1)).findAll();
    }
}

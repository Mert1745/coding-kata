package com.haiilo.kata.service;

import com.haiilo.kata.CalculationUtil;
import com.haiilo.kata.domain.*;
import com.haiilo.kata.exception.ProductNotFoundException;
import com.haiilo.kata.repository.ProductRepository;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private CalculationUtil calculationUtil;

    @InjectMocks
    private CartService cartService;

    private Product product;
    private Checkout checkout;

    @BeforeAll
    static void setUpBeforeClass() {
        mockStatic(CalculationUtil.class);
    }

    @BeforeEach
    void setUp() {
        Price price = new Price(1L, BigDecimal.TEN, 1, product);
        product = new Product(1L, "Product A", List.of(price));
        PriceDTO priceDTO = new PriceDTO(1L, BigDecimal.TEN, 1);
        ProductDTO productDTO = new ProductDTO(1L, "Product A", List.of(priceDTO));
        CartDTO cartDTO = new CartDTO(1, productDTO);
        checkout = new Checkout(new BigDecimal("50.00"), List.of(cartDTO));
    }

    @Test
    void checkout_ShouldReturnTrue_WhenTransactionIsValid() {
        when(productRepository.findById(anyInt())).thenReturn(Optional.of(product));
        mockCalculation(new BigDecimal("50.00")); // Mock price calculation to match checkout price

        Boolean result = cartService.checkout(checkout);

        assertTrue(result);
        verify(productRepository, times(1)).findById(anyInt());
    }


    @Test
    void checkout_ShouldReturnFalse_WhenTransactionIsInvalid() {
        when(productRepository.findById(anyInt())).thenReturn(Optional.of(product));
        mockCalculation(new BigDecimal("40.00")); // Mock a mismatched price

        Boolean result = cartService.checkout(checkout);

        assertFalse(result);
        verify(productRepository, times(1)).findById(anyInt());
    }

    @Test
    void checkout_ShouldThrowException_WhenProductNotFound() {
        when(productRepository.findById(anyInt())).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> cartService.checkout(checkout));
        verify(productRepository, times(1)).findById(anyInt());
    }

    private void mockCalculation(BigDecimal expectedSum) {
        when(CalculationUtil.calculateSum(anyList())).thenReturn(expectedSum);
    }
}

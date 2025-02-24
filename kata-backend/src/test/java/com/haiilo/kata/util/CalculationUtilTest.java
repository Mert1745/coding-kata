package com.haiilo.kata.util;

import com.haiilo.kata.domain.PriceDTO;
import com.haiilo.kata.domain.Sum;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class CalculationUtilTest {

    @Test
    void calculateSum_ShouldReturnCorrectTotal_WhenMultipleProducts() {
        List<Sum> databaseCarts = List.of(
                new Sum(5, new ArrayList<>(List.of(new PriceDTO(1L, new BigDecimal("10.00"), 1)))),
                new Sum(3, new ArrayList<>(List.of(new PriceDTO(2L, new BigDecimal("20.00"), 1))))
        );

        BigDecimal result = CalculationUtil.calculateSum(databaseCarts);

        assertEquals(new BigDecimal("110.00"), result);
    }

    @Test
    void calculateSum_ShouldReturnZero_WhenCartIsEmpty() {
        List<Sum> databaseCarts = List.of();

        BigDecimal result = CalculationUtil.calculateSum(databaseCarts);

        assertEquals(BigDecimal.ZERO, result);
    }

    @Test
    void calculateProductPrice_ShouldApplyDiscount_WhenMultiplePriceTiers() {
        List<PriceDTO> prices = new ArrayList<>(List.of(
                new PriceDTO(1L, new BigDecimal("8.00"), 5), // Special price: 5 for 8
                new PriceDTO(2L, new BigDecimal("2.00"), 1)  // Normal price: 1 for 2
        ));

        Sum sum = new Sum(7, prices); // 5 for 8 + 2 for 4 = 12

        BigDecimal result = CalculationUtil.calculateProductPrice(sum);

        assertEquals(new BigDecimal("12.00"), result);
    }

    @Test
    void calculateProductPrice_ShouldCalculateCorrectly_WhenNoSpecialOffers() {
        List<PriceDTO> prices = new ArrayList<>(List.of(new PriceDTO(1L, new BigDecimal("3.50"), 1)));

        Sum sum = new Sum(4, prices); // 4 * 3.50 = 14.00

        BigDecimal result = CalculationUtil.calculateProductPrice(sum);

        assertEquals(new BigDecimal("14.00"), result);
    }

    @Test
    void calculateProductPrice_ShouldReturnZero_WhenQuantityIsZero() {
        List<PriceDTO> prices = new ArrayList<>(List.of(new PriceDTO(1L, new BigDecimal("5.00"), 1)));

        Sum sum = new Sum(0, prices);

        BigDecimal result = CalculationUtil.calculateProductPrice(sum);

        assertEquals(0, result.compareTo(BigDecimal.ZERO));
    }
}

package com.haiilo.kata;

import com.haiilo.kata.domain.PriceDTO;
import com.haiilo.kata.domain.Sum;

import java.math.BigDecimal;
import java.util.List;

public class CalculationUtil {

    public static BigDecimal calculateSum(List<Sum> databaseCarts) {
        return databaseCarts.stream().map(CalculationUtil::calculateProductPrice).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // recalculating the total value to check if there is any injection
    public static BigDecimal calculateProductPrice(Sum product) {
        // Higher quantity prices should be calculated first as they have special offers.
        List<PriceDTO> prices = product.prices();
        prices.sort((one, two) -> Integer.compare(two.quantity(), one.quantity()));

        int quantity = product.quantity();
        BigDecimal sum = BigDecimal.ZERO;

        for (PriceDTO price : prices) {
            int numberPerQuantity = quantity / price.quantity();
            sum = sum.add(price.amount().multiply(BigDecimal.valueOf(numberPerQuantity)));
            quantity -= price.quantity() * numberPerQuantity;
        }

        return sum;
    }
}

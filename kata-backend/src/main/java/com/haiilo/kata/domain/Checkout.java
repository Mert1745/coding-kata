package com.haiilo.kata.domain;

import java.math.BigDecimal;
import java.util.List;

public record Checkout(BigDecimal price, List<CartDTO> carts) {
}

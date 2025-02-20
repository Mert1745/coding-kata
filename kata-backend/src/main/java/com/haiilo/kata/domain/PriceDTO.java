package com.haiilo.kata.domain;

import java.math.BigDecimal;

public record PriceDTO(Long id, BigDecimal amount, Integer quantity) {
}

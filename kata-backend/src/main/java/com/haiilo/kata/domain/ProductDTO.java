package com.haiilo.kata.domain;

import java.util.List;

public record ProductDTO(Long id, String name, List<PriceDTO> prices) {
}

package com.haiilo.kata.service;

import com.haiilo.kata.constant.ErrorMessage;
import com.haiilo.kata.domain.ProductDTO;
import com.haiilo.kata.exception.ProductNotFoundException;
import com.haiilo.kata.mapper.ProductMapper;
import com.haiilo.kata.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> getProducts() {
        return Optional.of(productRepository.findAll())
                .filter(list -> !list.isEmpty())
                .map(ProductMapper::mapProductDTOFrom)
                .orElseThrow(() -> new ProductNotFoundException(ErrorMessage.PRODUCT_NOT_FOUND));
    }
}

package com.haiilo.kata.service;

import com.haiilo.kata.CalculationUtil;
import com.haiilo.kata.domain.*;
import com.haiilo.kata.mapper.ProductMapper;
import com.haiilo.kata.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final ProductRepository productRepository;

    public CartService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Boolean checkout(Checkout checkout) {
        List<CartDTO> carts = checkout.carts();
        List<Sum> databaseCarts = new ArrayList<>();
        carts.forEach(cart -> {
            Optional<Product> productOptional = productRepository.findById(cart.product().id().intValue());
            productOptional.ifPresent(product -> {
                List<ProductDTO> productDTOs = ProductMapper.mapProductDTOFrom(List.of(product));
                List<PriceDTO> prices = productDTOs.get(0).prices();
                databaseCarts.add(new Sum(cart.quantity(), prices));
            });
        });

        BigDecimal calculate = CalculationUtil.calculateSum(databaseCarts);
        if (calculate.compareTo(checkout.price()) == 0) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }
}

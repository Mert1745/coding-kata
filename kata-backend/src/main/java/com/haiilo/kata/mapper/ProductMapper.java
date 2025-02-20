package com.haiilo.kata.mapper;

import com.haiilo.kata.domain.Price;
import com.haiilo.kata.domain.PriceDTO;
import com.haiilo.kata.domain.Product;
import com.haiilo.kata.domain.ProductDTO;

import java.util.ArrayList;
import java.util.List;

public class ProductMapper {

    public static List<ProductDTO> mapProductDTOFrom(List<Product> productList) {
        List<ProductDTO> productDTOList = new ArrayList<>();
        productList.forEach(product -> {
            List<PriceDTO> priceDTOS = ProductMapper.mapPriceDTOFrom(product.getPrices());
            productDTOList.add(new ProductDTO(product.getId(), product.getName(), priceDTOS));
        });
        return productDTOList;
    }

    private static List<PriceDTO> mapPriceDTOFrom(List<Price> priceList) {
        List<PriceDTO> priceDTOList = new ArrayList<>();
        priceList.forEach(price -> priceDTOList.add(new PriceDTO(price.getId(), price.getAmount(), price.getQuantity())));
        return priceDTOList;
    }
}

package com.paletteDesSaveurs.RestaurantBackend.DTO;

import java.util.List;

public class CartResponse {

    private Object cart;
    private double totalPrice;

    // Constructor for empty cart response
    public CartResponse(String message, double totalPrice) {
        this.cart = message;
        this.totalPrice = totalPrice;
    }

    // Constructor for actual cart items
    public CartResponse(List<String> cart, double totalPrice) {
        this.cart = cart;
        this.totalPrice = totalPrice;
    }

    public Object getCart() {
        return cart;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

}

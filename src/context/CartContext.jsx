import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('7fitz_cart');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('7fitz_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, selectedSize, selectedColor) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.id === product.id &&
                    item.selectedSize === selectedSize &&
                    item.selectedColor === selectedColor
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            }

            return [...prevItems, { ...product, quantity, selectedSize, selectedColor }];
        });
    };

    const removeFromCart = (productId, selectedSize, selectedColor) => {
        setCartItems(prevItems => prevItems.filter(
            item => !(item.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor)
        ));
    };

    const updateQuantity = (productId, selectedSize, selectedColor, quantity) => {
        if (quantity < 1) return;
        setCartItems(prevItems => prevItems.map(item =>
            (item.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor)
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

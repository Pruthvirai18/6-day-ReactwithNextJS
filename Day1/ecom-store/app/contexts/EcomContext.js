"use client";
import { createContext, useState } from "react";

export const EcomContext = createContext(); // ✅ Corrected context name (Capitalized)

export default function EcomContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // ✅ Add product to cart (Avoids duplicates)
  function addProductToCart(product) {
    setCart((prevCart) => {
      const isProductInCart = prevCart.some((item) => item.id === product.id);
      return isProductInCart ? prevCart : [...prevCart, product];
    });
  }

  // ✅ Remove product from cart
  function removeProductFromCart(productToRemove) {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productToRemove.id));
  }

  // ✅ Add product to favourites
  function addToFavourites(product) {
    setFavourites((prevFavourites) => {
      const isFavourite = prevFavourites.some((item) => item.id === product.id);
      return isFavourite ? prevFavourites : [...prevFavourites, product];
    });
  }

  // ✅ Remove product from favourites
  function removeFromFavourites(productToRemove) {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((product) => product.id !== productToRemove.id)
    );
  }

  return (
    <EcomContext.Provider
      value={{
        cart,
        favourites,
        addProductToCart,
        removeProductFromCart,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </EcomContext.Provider>
  );
}

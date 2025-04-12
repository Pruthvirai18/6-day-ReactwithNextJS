"use client";
import React, { useContext } from "react";
import { EcomContext } from "../contexts/EcomContext";
import ProductCard from "../components/ProductCard";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeProductFromCart } = useContext(EcomContext); // ✅ Added removeProductFromCart
  const router = useRouter();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {cart.map((product, index) => (
            <div key={index} className="relative">
              <ProductCard
                id={product.id}
                title={product.title}
                img={product.img}
                desc={product.desc}
              />
              <button
                onClick={() => removeProductFromCart(product)} // ✅ Remove item from cart
                className="mt-2 p-2 bg-red-500 text-white rounded-lg w-full"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        className="mt-4 p-3 bg-blue-500 text-white rounded-lg"
      >
        Continue Shopping
      </button>
    </div>
  );
}

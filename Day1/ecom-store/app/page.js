"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { useRouter } from "next/navigation"; // ✅ Import router

export default function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await fetch("/api/products", { method: "GET" })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-white shadow-lg p-4 rounded-lg">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="images.jpg"
            width="80"
            alt="Logo"
            className="rounded-md shadow-md"
          />
          <div className="relative">
            <input
              className="w-[400px] px-4 py-2 border rounded-lg shadow-md outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search for Products, Brands, and More"
              type="text"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-4 py-2 rounded-lg">
              Search
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button className="bg-green-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
            Home
          </button>
          <button className="bg-yellow-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600">
            Support
          </button>
          <button
            onClick={() => router.push("/cart")} // ✅ Moves to cart
            className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          >
            Cart
          </button>
          <a
            href="/login"
            className="bg-red-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Login
          </a>
        </div>
      </nav>

      {/* Product Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            title={product.title}
            desc={product.desc}
            img={product.image}
          />
        ))}
      </div>
    </div>
  );
}

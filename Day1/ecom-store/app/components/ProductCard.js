import { useContext } from "react";
import { EcomContext } from "../contexts/EcomContext"; // ✅ Fixed import
import { useRouter } from "next/navigation"; // ✅ Added router

export default function ProductCard({ id, title, desc, img }) {
  const { cart, addProductToCart } = useContext(EcomContext);
  const router = useRouter();

  return (
    <div className="w-[200px] h-[400px] bg-gray-100 rounded shadow-lg">
      <img src={img} width={100} height={150} />
      <br />
      <p className="font-bold text-lg">{title}</p>
      <p className="font-medium text-md">{desc}</p>

      <button
        onClick={() => {
          addProductToCart({ id, title, desc, img });
          alert("Product added to cart!");
        }}
        className="m-2 p-3 rounded-full shadow bg-blue-500 text-white font-bold"
      >
        Add to Cart
      </button>

      <button
        onClick={() => router.push("/cart")} // ✅ Redirect to cart page
        className="m-2 p-3 rounded-full shadow bg-green-500 text-white font-bold"
      >
        Go to Cart
      </button>
    </div>
  );
}

import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Checkout = () => {
  const items = useSelector(selectItems);
  const itemsTotal = useSelector(selectTotal);

  console.log(itemsTotal);

  const { data: session } = useSession();

  console.log(session);

  console.log(items);

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* left */}
        <div className="flex-grow m-5 shadow-sm w-4/5">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            alt="checkout-banner"
          ></Image>
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length > 0 ? "Shopping Basket" : "Your Basket is empty"}
            </h1>
            <div>
              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id={item?.id}
                  title={item?.title}
                  rating={item?.rating}
                  price={item?.price}
                  image={item?.image}
                  description={item?.description}
                  category={item?.category}
                  hasPrime={item?.hasPrime}
                  quantity={item?.quantity}
                />
              ))}
            </div>
          </div>
        </div>

        {/* right */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md w-1/5">
            <>
              <h2 className="font-medium whitespace-nowrap">
                Subtotal (
                {items.reduce((acc, item) => {
                  return acc + item.quantity;
                }, 0)}
                ): <span className="font-bold">${itemsTotal.toFixed(2)}</span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2  font-medium  disabled:cursor-not-allowed ${
                  !session
                    ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 active:from-gray-300 active:to-gray-500"
                    : "text-yellow-900 cursor-pointer"
                }`}
              >
                {!session ? "Sign in to checkout" : "proceed to checkout"}
              </button>
            </>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Currency from "react-currency-formatter";

const Product = ({ id, title, price, description, category, image }) => {
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);

  const MAX_RATING = 5;
  const MIN_RAITNG = 1;

  useEffect(() => {
    setRating(
      Math.floor(Math.random() * (MAX_RATING - MIN_RAITNG + 1)) + MIN_RAITNG
    );
    setHasPrime(Math.random() > 0.5);
  }, []);

  console.log(hasPrime);

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        src={image}
        alt={title}
        height={200}
        width={200}
        className="object-contain h-[200px] self-center"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <AiFillStar key={i} className="text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            width={48}
            height={900}
            src="https://links.papareact.com/fdw"
            alt="prime-delivery"
          />
          <p className="text-xs">Free Next-day delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
};

export default Product;

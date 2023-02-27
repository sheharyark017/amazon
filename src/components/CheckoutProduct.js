import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  rating,
  description,
  category,
  quantity,
  image,
  hasPrime,
}) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  const removeItemHandler = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-6 mb-6 shadow-md pb-4">
      <div className="text-center flex align-middle">
        <Image
          className="m-auto"
          src={image}
          height={120}
          width={120}
          alt="prodcut-image"
        />
      </div>
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <AiFillStar key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <p>${price}</p>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt="prime-image"
              className="w-12"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <p className="">
          <span className="font-medium text-slate-600">Quantity:</span>{" "}
          {quantity}
        </p>
      </div>

      {/* add/remove buttons */}

      <div className="flex flex-col space-y-2 my-auto justify-self-center">
        <button className="button" onClick={addItemHandler}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemHandler}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;

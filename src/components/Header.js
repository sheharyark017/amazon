import Image from "next/image";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineMenu,
} from "react-icons/ai";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const items = useSelector(selectItems);

  return (
    <header>
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2 px-6">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Link href="/">
            <Image
              src="https://links.papareact.com//f90"
              alt="logo"
              width={150}
              height={40}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>
        {/* search */}

        <div className="hidden sm:flex bg-yellow-400 h-10 rounded-md ml-6 flex-grow overflow-hidden hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow outline-none"
            placeholder="Search..."
          />
          <div className=" py-2 px-3 cursor-pointer h-10">
            <AiOutlineSearch className="text-2xl" />
          </div>
        </div>

        {/* right */}

        <div className="text-white flex items-center text-xs ml-6 space-x-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>Hello, {session ? `${session.user.name}` : "Sign In"}</p>
            <p className="font-bold md:text-sm">Account & Lists</p>
          </div>
          <div className="link">
            <p>Returns</p>
            <p className="font-bold md:text-sm">& Orders</p>
          </div>
          <Link href="/checkout">
            <div className="relative link flex items-center space-x-2">
              <span className="absolute -top-1 right-0 md:right-11 h-4 w-4 bg-yellow-400 text-center font-bold rounded-full text-black ">
                {items.length}
              </span>
              <AiOutlineShoppingCart className="text-3xl" />
              <p className="hidden md:inline font-bold md:text-sm">Basket</p>
            </div>
          </Link>
        </div>
      </div>

      {/* bottom nav */}
      <div className="flex items-center space-x-4 p-2 px-6 bg-amazon_blue text-white text-sm">
        <p className="link flex items-center gap-1">
          <AiOutlineMenu />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">{"Today's Deals"}</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;

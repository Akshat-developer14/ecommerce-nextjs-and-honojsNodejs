import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t bg-gray-100 dark:bg-zinc-600 dark:border-gray-50 p-4 lg:p-16">
      <div className="flex flex-wrap justify-between items-start w-full">
        {/* Main Logo */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4 p-4">
          <span className="text-2xl sm:text-4xl dark:text-zinc-950 font-extrabold">
            SHOP.CO
          </span>
          <p className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">
            We have clothes that suit your style and which you're proud to wear. From women to men.
          </p>
          <div className="flex gap-4">
            <Image src="/instagram.png" alt="instagram" width={30} height={30} />
            <Image src="/facebook.png" alt="facebook" width={30} height={30} />
            <Image src="/twitter.png" alt="twitter" width={30} height={30} />
          </div>
        </div>
        
        {/* Details */}
        <div className="flex flex-wrap w-full lg:w-3/4 justify-between p-4">
          {/* Company */}
          <div className="flex flex-col gap-4 w-1/2 md:w-1/4 mt-10 lg:mt-0">
            <span className="text-lg sm:text-xl dark:text-zinc-950 font-medium tracking-widest">COMPANY</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">About</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Features</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Works</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Careers</span>
          </div>
          
          {/* Help */}
          <div className="flex flex-col gap-4 w-1/2 md:w-1/4 mt-10 lg:mt-0">
            <span className="text-lg sm:text-xl dark:text-zinc-950 font-medium tracking-widest">HELP</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Customer Support</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Delivery Details</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Terms & Conditions</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Privacy Policy</span>
          </div>
          
          {/* FAQ */}
          <div className="flex flex-col gap-4 w-1/2 md:w-1/4 mt-10 lg:mt-0">
            <span className="text-lg sm:text-xl dark:text-zinc-950 font-medium tracking-widest">FAQ</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Account</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Manage Deliveries</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Orders</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Payments</span>
          </div>
          
          {/* Resources */}
          <div className="flex flex-col gap-4 w-1/2 md:w-1/4 mt-10 lg:mt-0">
            <span className="text-lg sm:text-xl dark:text-zinc-950 font-medium tracking-widest">RESOURCES</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Free eBooks</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">Development Tutorial</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">How to-Blog</span>
            <span className="font-thin text-gray-600 dark:text-zinc-900 tracking-wider">YouTube Playlist</span>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      
      <div className="flex flex-wrap justify-between items-center w-full p-4">
        <span className="font-thin text-gray-500 dark:text-zinc-900 tracking-wider w-full text-center lg:text-left">
          Shop.co &copy; 2022-2026. All rights reserved.
        </span>
        <div className="flex gap-4 w-full justify-center lg:justify-end p-4">
          <Image src="/visa.png" alt="visa" width={50} height={50} />
          <Image src="/mastercard.png" alt="mastercard" width={50} height={50} />
          <Image src="/paypal.png" alt="paypal" width={50} height={50} />
          <Image src="/applepay.png" alt="applepay" width={50} height={50} />
          <Image src="/gpay.png" alt="googlepay" width={50} height={50} />
        </div>
      </div>
    </div>
  );
};

export default Footer;

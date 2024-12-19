import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <nav className="sticky h-18 inset-x-0  top-0 w-full border-b border-gray-950 dark:border-gray-50 transition-all backdrop-blur-md">
      <div className="flex justify-between items-center mx-2 md:mx-10 pt-5 pb-5">
        <span className="text-3xl font-bold">E-Commerce</span>
        <div className="hidden lg:flex justify-center items-center gap-4">
          <Search />
          <Input type="text" placeholder="Search" />
          <Button>Search</Button>
        </div>
        <div className="hidden sm:block">
          <Button variant="link">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="link">Login</Button>
          <Button variant="link">Register</Button>
          <ThemeSwitcher />
        </div>
        <div className="block sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger><Menu /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Login</DropdownMenuItem>
              <DropdownMenuItem>Register</DropdownMenuItem>
              <DropdownMenuItem><ThemeSwitcher/></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Button, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2  ">
      <Link
        to="/"
        className=" self-center whitespace-nowrap text-sm sm:text-xl text-cyan-500"
      >
        Bank
        <span className=" text-black px-2 py-1 font-semibold dark:text-white">
          App
        </span>
      </Link>

      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/transations"} as={"div"}>
          <Link to="/transations">Transations</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

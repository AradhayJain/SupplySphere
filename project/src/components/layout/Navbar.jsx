import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "../BrandLogo";

const NavItem = ({ to, children }) => (
  <a href={to} className="text-light-300 hover:text-light-100 transition px-3 py-2">
    {children}
  </a>
);

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-dark-100/70 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo />
        </Link>

        <nav className="hidden md:flex items-center">
          <NavItem to="#features">Features</NavItem>
          <NavItem to="#pricing">Pricing</NavItem>
          <NavItem to="#team">Team</NavItem>
          <NavItem to="#faq">FAQ</NavItem>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/auth/login" className="btn btn-ghost h-10">Sign In</Link>
          <a href="#demo" className="btn btn-primary h-10">Request a Demo</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

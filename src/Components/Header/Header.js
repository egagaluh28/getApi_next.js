"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
} from "@heroui/react";
import SearchBar from "../../Components/Filter/Search";


const BrandLogo = () => (
  <NavbarBrand>
    <div className="flex items-center space-x-3">
      <div className="w-9 h-9 font-bold bg-gradient-to-br from-[#2616df] to-[#1c193e] rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/30">
        K
      </div>
      <span className="font-bold text-xl text-inherit">Kuantum Games</span>
    </div>
  </NavbarBrand>
);

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-black text-white backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-black/20"
      maxWidth="xl">
      {/* --- Tampilan Mobile --- */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <BrandLogo />
      </NavbarContent>

      {/* --- Tampilan Desktop --- */}
      <NavbarContent className="hidden sm:flex gap-2" justify="start">
        <BrandLogo />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive>
          <Link
            aria-current="page"
            href="/"
            className="text-blue-400 font-semibold">
            Beranda
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="hover:text-blue-400 transition-colors text-white">
            Kategori
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="#"
            className="hover:text-blue-400 transition-colors text-white">
            Tentang
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        <SearchBar />
      </NavbarContent>
    </Navbar>
  );
}

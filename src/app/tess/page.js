"use client";
import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@heroui/react";

export const AcmeLogo = () => {
  return (
    <NavbarBrand>
      <div className="flex items-center space-x-2">
        {" "}
        <div className="w-8 h-8 bg-gradient-to-br from-[#2616df] to-[#1c193e] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">K</span>{" "}
        </div>
        <span className="font-bold text-xl">Kuantum Games</span>{" "}
      </div>
    </NavbarBrand>
  );
};

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}>
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white randed-b-lg bg-gradient-to-b  from-gray-950 to-slate-900 text-white backdrop-blur-sm sticky top-0 z-50 rounded-3xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <div className="w-8 h-8 bg-gradient-to-br from-[#2616df] to-[#1c193e] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">K</span>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <div className="flex items-center space-x-2">
            {" "}
            <div className="w-8 h-8 bg-gradient-to-br from-[#2616df] to-[#1c193e] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>{" "}
            </div>
            <span className="font-bold text-xl">Kuantum Games</span>{" "}
          </div>
        </NavbarBrand>

        <NavbarItem isActive>
          <Link
            aria-current="page"
            href="#"
            className="hover:text-blue-600 transition-colors">
            Beranda
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link
            color="foreground"
            href="#"
            className="hover:text-blue-600 transition-colors text-white">
            Kategori
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href="#"
              size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </NavbarContent>
    </Navbar>
  );
}

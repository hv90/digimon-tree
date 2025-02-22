import Image from "next/image";
import { ReactNode } from "react";
import logo from "@/assets/img/logo.png";

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <header className="w-full row-start-1 my-2 py-2 flex items-center">
      <Image
        style={{ width: "6%", borderRadius: "12%", marginRight: "2%" }}
        src={logo}
        alt="logo"
      />
      {children}
    </header>
  );
};

export default Header;

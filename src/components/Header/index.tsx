import Image from "next/image";
import { ReactNode } from "react";
import logo from "@/assets/img/logo.png";
import Link from "next/link";
import { useDigimonContext } from "@/contexts/DigimonContext";

const Header: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const { isLoading } = useDigimonContext();

  return (
    <header className="my-4 md:mt-0 w-full md:h-full row-start-1 flex items-center">
      {isLoading ? (
        <div className="animate-pulse w-[clamp(70px,6%,100px)] h-[58%] mr-[2%]">
          <div className="bg-gray-100 rounded-[12%] h-full w-full"></div>
        </div>
      ) : (
        <Link
          href={"/"}
          onClick={() => {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }}
          style={{
            width: "clamp(70px,6%,100px)",
            marginRight: "2%",
          }}
        >
          <Image
            style={{
              width: "100%",
              borderRadius: "12%",
            }}
            src={logo}
            alt="logo"
          />
        </Link>
      )}

      {children}
    </header>
  );
};

export default Header;

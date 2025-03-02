import Image from "next/image";
import Link from "next/link";
import loveIcon from "@/assets/img/pixel-art-heart-icon-free.png";

const Footer: React.FC = () => {
  return (
    <footer className="w-full md:h-full row-start-3 flex flex-col gap-4 2xl:text-2xl">
      <div className="flex flex-col justify-evenly">
        <p>
          Special thanks to &nbsp;
          <Link href="https://github.com/heyshadowsmith" target="__blank">
            <b>Shadow Smith</b>
          </Link>
          &nbsp; for &nbsp;
          <Link
            className="text-blue-500"
            href={"https://digimon-api.vercel.app/"}
            target="__blank"
          >
            API v1
          </Link>
          &nbsp; and &nbsp;
          <Link href="https://github.com/Vinicius-Brito-Costa" target="__blank">
            <b>Vinicius Brito Costa</b>
          </Link>
          &nbsp; for &nbsp;
          <Link
            className="text-blue-500"
            href={"https://digimon-api.com/"}
            target="__blank"
          >
            API v2
          </Link>
        </p>
        <em>
          Digimon and other media related to the franchise are registered
          trademarks of Bandai
        </em>
      </div>
      <section className="h-full max-h-[100px] flex md:justify-center text-background bg-green-foreground">
        <div className="w-full flex items-center justify-center flex-wrap">
          <Link href={"https://github.com/hv90/digimon-tree"} target="__blank">
            <b>This project</b>
          </Link>
          &nbsp; was made with &nbsp;
          <div className="w-[clamp(1rem,_1.5rem,_2rem)] h-[clamp(0.5rem,_1rem,_1.5rem)]">
            <Image alt="love" src={loveIcon} />
          </div>
          &nbsp; by &nbsp;
          <Link href={"https://linkedin.com/in/hv90-m182"} target="__blank">
            <b>hv90</b>
          </Link>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="h-screen w-full overflow-hidden relative">
      <Image
        alt="hero"
        className="object-cover w-full h-full"
        fill
        src={"/hero.gif"}
      />

      <div className="absolute font-pixelify-sans w-full h-full flex flex-col items-center mt-24">
        <h2 className="font-bold  text-7xl">Start Your</h2>
        <h2
          className="font-bold text-8xl  text-yellow-400"
          style={{
            textShadow:
              "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000,-2px 2px 0 #000",
          }}
        >
          Coding Adventure
        </h2>
        <h2 className="text-3xl mt-5">
          Beginner Friendly Coding Courses and Projects
        </h2>
        <Link href="/sign-in">
          <Button className="text-3xl p-6 mt-7" variant={"pixel"}>
            GET STARTED
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;

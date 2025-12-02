"use client";
import { useContext } from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { UserContext } from "@/context/UserDetailContext";

const Home = () => {
  const { userDetail } = useContext(UserContext);
  console.log(userDetail);
  return (
    <div className="flex flex-col items-center w-full">
      <Header />
      <Hero />
    </div>
  );
};

export default Home;

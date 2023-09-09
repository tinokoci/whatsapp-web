"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const dummyStories = [
  "https://images.pexels.com/photos/16141305/pexels-photo-16141305/free-photo-of-view-of-a-white-building.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  "https://images.pexels.com/photos/17761483/pexels-photo-17761483/free-photo-of-view-of-a-cable-car.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  "https://images.pexels.com/photos/16356463/pexels-photo-16356463/free-photo-of-blonde-woman-in-green-skirt-walking-along-pier.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  "https://images.pexels.com/photos/17467015/pexels-photo-17467015/free-photo-of-loungers-on-a-rocky-beach.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  "https://images.pexels.com/photos/17893702/pexels-photo-17893702/free-photo-of-boy-riding-bile-on-country-road.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  "https://images.pexels.com/photos/18101834/pexels-photo-18101834.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
];

const StatusViewer = ({ params }: { params: { id: string } }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  const handleNextStory = () => {
    setCurrentStoryIndex((prev) => {
      if (prev >= dummyStories.length - 1) return 0;
      return prev + 1;
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      handleNextStory();
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <div className="flex h-[100vh] items-center justify-center bg-slate-900">
        <div className="relative w-[620px]">
          <img
            src={dummyStories[currentStoryIndex]}
            alt="cool story bro"
            className="my-auto h-[96vh] w-[620px]"
          />
          <div className="absolute top-0 flex w-full">
            {dummyStories.map((item, idx) => (
              <ProgressBar
                key={idx}
                index={idx}
                activeIndex={currentStoryIndex}
              />
            ))}
          </div>
        </div>
        <Link href="/">
          <BsArrowLeft className="absolute left-10 top-5 text-2xl text-white" />
        </Link>
        <Link href="/">
          <AiOutlineClose className="absolute right-10 top-5 text-2xl text-white" />
        </Link>
      </div>
    </div>
  );
};

export default StatusViewer;

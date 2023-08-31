import { NextPage } from "next";
import Link from "next/link";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import StatusUserCard from "@/components/StatusUserCard";
import { AiOutlineClose } from "react-icons/ai";

const Status: NextPage = () => {
  return (
    <ProtectedRoute type="PROTECTED">
      <div className="flex h-4/5 px-[14vw] py-[7vh]">
        {/* LEFT */}
        <div className="h-[85vh] w-[50%] items-center bg-[#1e262c] px-5 lg:w-[30%] ">
          <div className="h-[13%] pt-5">
            <StatusUserCard />
          </div>
          <hr />
          <div className="h-[85%] overflow-y-scroll pt-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
              (_, idx) => (
                <Link href={`/status/drotz`}>
                  {/* TODO */}
                  <StatusUserCard />
                </Link>
              ),
            )}
          </div>
        </div>
        {/* RIGHT */}
        <div className="relative h-[85vh] w-1/2 bg-[#0b141a] py-20 lg:w-[70%]">
          <Link href="/" className="">
            <AiOutlineClose className="absolute right-10 top-5 text-xl text-white" />
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Status;

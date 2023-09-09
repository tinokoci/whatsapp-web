import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const BackHeader = ({ title }: { title: string }) => (
  <Link
    href="/"
    className="flex cursor-pointer items-center gap-10 bg-[#008069] px-10 pb-5 pt-16 text-white"
  >
    <BsArrowLeft className="text-2xl font-bold" />
    <div className="font-semibold"> {title}</div>
  </Link>
);

export default BackHeader;

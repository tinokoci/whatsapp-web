import Image from "next/image";

const StatusUserCard = () => {
  return (
    <div className="flex items-center p-3">
      <Image
        src="/avatar.jpg"
        alt="avatar"
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="ml-2 text-white">drotz</div>
    </div>
  );
};

export default StatusUserCard;

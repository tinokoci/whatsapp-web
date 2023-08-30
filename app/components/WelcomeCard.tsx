import Image from "next/image";

const WelcomeCard = () => (
  <div className="f-full flex w-[70%] flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <Image src={"/home.svg"} alt="background" width={360} height={204} />
      <h1 className="text-4xl text-gray-600">WhatsApp Web</h1>
      <div className="my-9">
        Send and retrieve messages without keeping your phone online. Use
        WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </div>
    </div>
  </div>
);

export default WelcomeCard;

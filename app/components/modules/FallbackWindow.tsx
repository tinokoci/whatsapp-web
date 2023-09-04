import Image from "next/image";

const FallbackWindow = () => (
  <div className="flex h-full  flex-col items-center justify-center">
    <div className="flex flex-col items-center justify-center">
      <Image src={"/home.svg"} alt="background" width={360} height={204} />
      <h1 className="text-4xl text-gray-600">WhatsApp Web</h1>
      <div className="my-9 w-[75%] text-center">
        Send and retrieve messages without keeping your phone online. Use
        WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </div>
    </div>
  </div>
);

export default FallbackWindow;

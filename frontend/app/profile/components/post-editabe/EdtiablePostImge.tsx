import getimagepost from "@/utils/getimagepost";
import Image from "next/image";
import React from "react";

const EdtiablePostImge = ({ image }: { image: string }) => {
  return (
    <div>
      {image && (
        <Image
        src={getimagepost(image)}
        alt="amg"
        width={5000}
        height={5000}
        className=" rounded-xl w-full"
      />
      )}
    </div>
  );
};

export default EdtiablePostImge;

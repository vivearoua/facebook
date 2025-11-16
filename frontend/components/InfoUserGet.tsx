import Image from 'next/image';
import React from 'react'

interface InfoUserGetTypes {
    fullName : string | undefined; 
    email : string | undefined ; 
    mainJob : string | undefined  ;
    avatar : string | undefined;
    skills : string[] | undefined;
}


const InfoUserGet: React.FC<InfoUserGetTypes> = ({fullName , email , mainJob , avatar , skills }) => {
  return (
    <div className="w-full bg-white/10 rounded-2xl overflow-y-auto
    pb-3  backdrop-blur-3xl h-[250px]">

<div className="m-3 p-2 flex items-center">
        <Image
          src={`http://localhost:5000/assets/userAvatars/${avatar}`}
          width={2000}
          height={2000}
          alt={`Ahmed Profile`}
          className="rounded-full object-cover w-[60px] h-[60px] border-2 "
        />
        <div className="text-sm text-white font-semibold ml-3">
          {fullName}
          <div className="text-slate-200 font-normal">{email} </div>
          <h1 className=" text-xs text-white font-semibold">{mainJob}</h1>
        </div>
      </div>

      <div className=" ml-11">
        <h1 className=" text-xl text-slate-200 font-semibold ">
         Skills :{" "}
        </h1>
        <div className=" ml-6 text-white ">
          {skills?.map((skill, index) => (
            <li key={index} className=" font-medium mb-1">
              {skill}
            </li>
          ))}
        </div>
      </div>

    </div>
  )
}

export default InfoUserGet
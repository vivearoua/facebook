import { useCurrentUser } from "@/context/ProfileContexts";
import { Divide, PenLine } from "lucide-react";
import React, { useEffect, useState } from "react";
import handleSaveFullName from "../api/handleSaveFullName";
import handleSaveMainJob from "../api/handleSaveMainJob";

const InfoEditing = ({
  name,
  email,
  job,
}: {
  name: string | undefined;
  email: string | undefined;
  job: string | undefined;
}) => {
  const { user, setUser } = useCurrentUser();
  const [isEditMainJob, setIsEditMainJob] = useState(false);
  const [isEditFullName, setIsEditFullName] = useState(false);
  const [nameEdit, setNameEdit] = useState(name);
  const [jobEdit, setJobEdit] = useState(job);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);
  return (
    <div className="">
      {isEditFullName ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          onBlur={() => {
            handleSaveFullName(setIsEditFullName, user, token);
          }}
          className="w-full  font-medium text-white bg-transparent 
          border-b border-gray-400 outline-none"
          autoFocus
        />
      ) : (
        <div className=" flex justify-between items-center ">
          <div className=" font-medium text-white">{name}</div>
          <div
            className=" p-2 rounded-full text-white duration-300 hover:bg-slate-400"
            onClick={() => {
              setIsEditFullName(true);
            }}
          >
            <PenLine size={15} />
          </div>
        </div>
      )}
      <div className=" text-sm text-slate-300">{email}</div>

      {isEditMainJob ? (
        <input
          type="text"
          value={job}
          onChange={(e) => setUser({ ...user, mainJob: e.target.value })}
          onBlur={() => {
            handleSaveMainJob(setIsEditMainJob, user, token);
          }}
          className="w-full  
          text-sm text-slate-200 font-medium
           bg-transparent border-b
            border-gray-400 outline-none"
          autoFocus
        />
      ) : (
        <div className=" flex justify-between items-center ">
          <div className="text-sm text-slate-200 font-medium">{job}</div>
          <div
            className=" p-2 rounded-full ml-3 text-white duration-300
             hover:text-black hover:bg-slate-200"
            onClick={() => {
              setIsEditMainJob(true);
            }}
          >
            <PenLine size={15} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoEditing;

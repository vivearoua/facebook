"use client";
import Link from "next/link";

export const NavLink = ({
  name,
  path,
  icon: Icon,
  isActive = false,
  onClick,
}: {
  name: string;
  path: string;
  icon: React.ElementType;
  isActive?: boolean;
  onClick?: () => void;
}) => (
  <Link
    href={path}
    className="text-center relative cursor-pointer group transition-all duration-300"
    onClick={onClick}
  >
    <div className="relative mx-auto w-fit">
      <div
        className={`
        p-3 rounded-full transition-all duration-300
        ${
          isActive
            ? "bg-blue-600 text-white shadow-lg transform scale-105"
            : "bg-transparent text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:scale-105"
        }
      `}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div
        className={`
        absolute left-1/2 transform -translate-x-1/2 -top-10 
        bg-slate-800 text-white rounded-full px-3 py-1 text-xs font-medium
        transition-all duration-300 opacity-0 group-hover:opacity-100
        shadow-md whitespace-nowrap
      `}
      >
        {name}
      </div>
    </div>
  </Link>
);

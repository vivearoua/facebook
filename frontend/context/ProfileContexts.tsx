"use client";
import { CommentProps } from "@/components/Comment";
import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";

export interface CurrentUser {
  fullName: string;
  email: string;
  bio: string;
  avatar?: string;
  followers: [
    {
      fullName: string;
      avatar: string;
      _id: string;
      email: string;
      mainJob: string;
    }
  ];
  followings: [
    {
      fullName: string;
      avatar: string;
      _id: string;
      email: string;
      mainJob: string;
    }
  ];
  mainJob: string;
  Skills: string[];
  communities: object[];
  notifications: object[];
  posts: [
    {
      _id: string;
      content?: string;
      userId: string;
      likes: [];
      comments: CommentProps[];
      postImage?: string;
    }
  ];
  numberOfLikes: number;
  numberOfComments: number;
  savedPost: string[];
}

interface CurrentUserContextType {
  user?: Partial<CurrentUser>;
  loading: boolean;
  error: string | null;
  sideBarIsOpen: boolean;
  setSideBarIsOpen: any;
  setUser: React.Dispatch<
    React.SetStateAction<Partial<CurrentUser> | undefined>
  >;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined
);

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<
    Partial<CurrentUser> | undefined
  >();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("Access token is missing");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/user/getProfileCurrentUser",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentUser(res.data.user);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        user: currentUser,
        loading,
        error,
        setUser: setCurrentUser,
        sideBarIsOpen,
        setSideBarIsOpen,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = (): CurrentUserContextType => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

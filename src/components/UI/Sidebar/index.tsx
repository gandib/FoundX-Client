"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import SidebarOptions from "./SidebarOptions";
import { adminLinks, userLinks } from "./constants";
import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";

const Sidebar = () => {
  const { user, isLoading } = useUser();

  return (
    <div>
      <div className="rounded-xl bg-default-100 p-2">
        <div className="h-[330px] w-full rounded-md ">
          <Image
            src={user?.profilePhoto as string}
            alt="Profile"
            height={100}
            width={100}
            className="rounded-xl"
          />
        </div>
        <div className="my-3">
          <h1 className="text-2xl font-semibold">{user?.name}</h1>
          <p className="break-words text-sm">{user?.email}</p>
        </div>
        <Button
          as={Link}
          className="mt-2 w-full rounded-md"
          href="/profile/create-post"
        >
          Create a post
        </Button>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-100 p-2">
        {isLoading && (
          <div className=" bg-black/10 fixed w-1/4 h-14 rounded-md backdrop-blur-md flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <SidebarOptions
          links={user?.role === "USER" ? userLinks : adminLinks}
        />
      </div>
    </div>
  );
};

export default Sidebar;

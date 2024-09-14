"use client";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schemas";
import { registerUser } from "@/src/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { FieldValues } from "react-hook-form";

export default function page() {
  const { mutate: handleUserRagistration, isPending } = useUserRegistration();

  const onSubmit = (data: FieldValues) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };
    console.log("inside", userData);
    handleUserRagistration(userData);
  };

  if (isPending) {
    //handle loading state
  }

  return (
    <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
      <h3 className="my-2 text-2xl font-bold">Register with FoundX</h3>
      <p>Help Lost Items Find Their Way Home</p>
      <div className="w-[35%]">
        <FXForm
          onSubmit={onSubmit}
          resolver={zodResolver(registerValidationSchema)}
        >
          <div className="py-3">
            <FXInput name="name" label="Name" size="sm" />
          </div>
          <div className="py-3">
            <FXInput name="email" type="email" label="Email" size="sm" />
          </div>
          <div className="py-3">
            <FXInput name="mobileNumber" label="Mobile Number" size="sm" />
          </div>
          <div className="py-3">
            <FXInput
              name="password"
              type="password"
              label="Password"
              size="sm"
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </FXForm>
        <div className="text-center">
          Already have an account? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}

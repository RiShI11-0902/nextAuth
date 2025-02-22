"use client";
import { formdata, initialForm, signInForm, signInFormData } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { registerUser, signInUser } from "../actions";
import { useRouter } from "next/navigation";

function signIn() {
  const [newFormData, setNewFormData] = useState(signInForm);
  console.log(newFormData);

  const router = useRouter()

  const saveBtn = () => {
    return Object.keys(newFormData).every(
      (key) => newFormData[key].trim() !== ""
    );
  };

  const handleData = async () => {
    console.log(newFormData);
    const res = await signInUser(newFormData);
    console.log(res);
    if (res?.data) {
        router.push("/profile")
    }
  };

  return (
    <>
      <div className="p-10 font-semibold">
        <p>Sign In</p>
      </div>

      <div className="w-fit mx-auto">
        <form action={handleData} className="grid gap-4 py-4">
          {signInFormData.map((i) => {
            return (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={i.name} className="text-right">
                  {i.name}
                </Label>
                <Input
                  id={i.name}
                  className="col-span-3"
                  placeholder={i.placeholder}
                  type={i.type}
                  value={newFormData[i.name]}
                  onChange={(event) => {
                    setNewFormData({
                      ...newFormData,
                      [i.name]: event.target.value,
                    });
                  }}
                />
              </div>
            );
          })}
          <Button
            className="disabled:opacity-55"
            disabled={!saveBtn()}
            type="submit"
          >
            Save changes
          </Button>
        </form>
      </div>
    </>
  );
}

export default signIn;

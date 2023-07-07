"use client";

import Cookies from "js-cookie";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import baseURL from "@/utils/url";

export default function UserModal() {
  const [name, setName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const router = useRouter();

  const defineNewUser = async () => {
    const res = await fetch(`${baseURL()}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert("Error: " + data.error);
      console.error(data.error);
      setName("");
      setAgreedToTerms(false);
    }
    // TODO: define a user in prisma
    else {
      Cookies.set("username", name);
      router.push("/");
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!agreedToTerms) {
      alert("Please agree to the terms to continue");
      return;
    }

    if (name.length < 2) {
      alert("Please enter your name to continue");
      return;
    }

    await defineNewUser();
  };

  return (
    // TODO: wrap in modal
    <div className="absolute left-0 top-0 z-0 flex h-screen w-screen items-center justify-center bg-gray-800">
      <form
        onSubmit={onSubmit}
        className="z-10 flex h-2/3 w-2/3 flex-col bg-white text-black"
      >
        <div>
          <label htmlFor="agreeToTerms">Agree To Terms</label>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={agreedToTerms}
            onChange={(_) => setAgreedToTerms(!agreedToTerms)}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName((_) => e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

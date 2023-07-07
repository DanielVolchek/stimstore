"use client";
import { fetchWithMessageHandling } from "@/utils/fetch/fetchUtils";
import baseURL from "@/utils/url";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
import LoadingSmile from "../Icons/LoadingSmile";

type Props = {
  type: "register" | "login";
};

export default function AuthenticationForm({ type }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState<JSX.Element | null>(null);

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(() => <LoadingSmile />);

    const data = await fetchWithMessageHandling(
      {
        route: `${baseURL()}/api/user/${type}`,
        withAuth: true,
        noSuccessMessage: true,
      },
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (data.session) {
      cookie.set("session", data.session, {
        expires: 31,
        secure: true,
        sameSite: "Strict",
      });
      router.push("/");
      router.refresh();
    }

    if (data.error) {
      setLoading(null);
      setUsername("");
      setPassword("");
    }
  };

  return (
    loading ?? (
      <form onSubmit={handleSubmit} className="flex w-min flex-col">
        <label htmlFor="username" className="">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          className="rounded-md border-black text-black"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password" className="">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          className="rounded-md border-black text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-red rounded-md px-4 py-2">
          Submit
        </button>
      </form>
    )
  );
}

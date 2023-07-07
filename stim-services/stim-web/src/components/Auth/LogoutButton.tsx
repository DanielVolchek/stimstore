"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AuthButtonWrapper from "./AuthButtonWrapper";

export default function LogoutButton() {
  const router = useRouter();

  const onClick = () => {
    router.push(`/logout`);
  };

  return (
    <div>
      <AuthButtonWrapper onClick={onClick} innerText="Logout" />
    </div>
  );
}

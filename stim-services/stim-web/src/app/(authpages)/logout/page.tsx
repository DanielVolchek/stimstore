"use client";

import LoadingSmile from "@/components/Icons/LoadingSmile";
import { fetchWithMessageHandling } from "@/utils/fetch/fetchUtils";
import baseURL from "@/utils/url";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  searchParams: { session: string };
};

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetchWithMessageHandling({
        route: `${baseURL()}/api/user/logout`,
        withAuth: true,
        noSuccessMessage: true,
      });

      router.push(`${baseURL()}/`);
      router.refresh();
    })();
  }, [router]);

  return <LoadingSmile />;
}

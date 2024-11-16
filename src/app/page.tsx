"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/tasks");
    } else {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  return <div>Redirecting...</div>;
}

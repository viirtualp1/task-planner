"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import styles from "./AppHeader.module.scss";

export default function AppHeader() {
  const { isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token"); // Удаляем токен
    router.push("/auth/login"); // Перенаправляем на страницу логина
  };

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <h1>Task Manager</h1>

        {isAuthenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={() => router.push("/auth/login")}>Login</button>
        )}
      </nav>
    </header>
  );
}

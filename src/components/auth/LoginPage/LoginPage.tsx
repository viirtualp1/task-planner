"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1>Login</h1>

      <LoginForm />
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import api from "@/services/axios";
import { AuthPayload } from "@/types/auth";

export default function Register() {
  const { register, handleSubmit } = useForm<AuthPayload>();
  const router = useRouter();

  const onSubmit = async (data: AuthPayload) => {
    try {
      await api.post("/auth/register", data);
      alert("Registration successful!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" placeholder="Email" {...register("email")} required />
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

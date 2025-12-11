"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px", flexDirection: "column", alignItems: "center" }}>
      <h1>로그인</h1>
      <button
        onClick={() => signIn("google")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4285F4",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Google로 로그인
      </button>
    </div>
  );
}

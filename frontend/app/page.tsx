'use client'; // 데이터를 받아와야 하므로 클라이언트 컴포넌트로 변경


import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { StockChart } from '../components/StockChart'; // 경로 주의
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const goToChart = () => {
    router.push("/chart"); // /about 페이지로 이동
  };


  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div>
      <h1>홈 페이지</h1>
      <button
        onClick={goToChart}
        style={{padding: "8px 16px",marginTop: "20px",
          backgroundColor: "#151e29ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        chart 페이지로 이동
      </button>
    </div>
  );
}
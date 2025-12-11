'use client'; // 데이터를 받아와야 하므로 클라이언트 컴포넌트로 변경


import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { StockChart } from '../components/StockChart'; // 경로 주의
import { useRouter } from "next/navigation";


import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const goToChart = () => {
    router.push("/chart"); // /about 페이지로 이동
  };

  return (
    // 1. 배경: 보라색~파란색 그라데이션 (확 티남)
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      {/* 2. 카드: 흰색 배경, 아주 둥근 모서리, 진한 그림자 */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-2xl rounded-2xl">
        
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">환영합니다! 👋</h1>
          <p className="mt-2 text-sm text-gray-500">계정에 로그인하여 계속하세요</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">이메일</label>
            <input 
              type="email" 
              placeholder="user@example.com" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">비밀번호</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition"
            />
          </div>
          <Link href="/chart" className="block">
            <button 
              type="button" 
              className="w-full py-3 mt-4 text-white font-bold bg-gray-900 rounded-lg hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
            >
              로그인 하기
            </button>
          </Link>
        </form>

        <p className="text-xs text-center text-gray-400">
          계정이 없으신가요? <span className="text-purple-600 cursor-pointer hover:underline">회원가입</span>
        </p>
      </div>
    </div>
  );
}
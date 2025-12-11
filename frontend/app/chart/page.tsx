'use client';
import { useState, useEffect } from 'react';
import { StockChart } from '../../components/StockChart'; // 경로 주의

export default function BollingerBand() {
    const [chartData, setChartData] = useState([]);
    
      useEffect(() => {
        // 1. 파이썬 서버(FastAPI)로 데이터 요청
        // 주의: 파이썬 서버가 8000번 포트에서 켜져 있어야 합니다.
        fetch('http://127.0.0.1:8000/analyze/AAPL') 
          .then((res) => res.json())
          .then((res) => {
            // 2. 받아온 데이터를 차트용 상태에 저장
            // 파이썬에서 보낸 데이터 구조가 { data: [...] } 형태여야 함
            if (res.data) {
               setChartData(res.data);
            }
          })
          .catch((err) => console.error("데이터 가져오기 실패:", err));
      }, []);

      return(
      <main className="flex min-h-screen flex-col items-center p-24">
            <h1 className="text-4xl font-bold mb-10">AI Trading Bot test 📈</h1>
            
            <div className="w-full max-w-4xl border p-4 rounded shadow-lg bg-white">
              <h2 className="text-xl font-bold mb-4">Apple (AAPL) 실시간 분석</h2>
              
              {/* 데이터가 있을 때만 차트를 보여줌 */}
              {chartData.length > 0 ? (
                <StockChart data={chartData} />
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-gray-100">
                  <p className="text-gray-500">Python 서버에서 데이터를 불러오는 중...</p>
                </div>
              )}
            </div>
          </main>

      )
  }
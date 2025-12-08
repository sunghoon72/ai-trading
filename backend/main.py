from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd

app = FastAPI()

# Next.js에서 접근 가능하도록 CORS 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/analyze/{symbol}")
def analyze_stock(symbol: str):
    # 1. 데이터 가져오기 (예: 최근 1년치 일봉)
    ticker = yf.Ticker(symbol)
    df = ticker.history(period="1y")
    
    # 2. 간단한 분석 로직 (여기서 나중에 AI 모델을 돌립니다)
    # 예시: 20일 이동평균선(SMA) 계산
    # 수식: $$ SMA = \frac{P_1 + P_2 + ... + P_n}{n} $$
    df['SMA_20'] = df['Close'].rolling(window=20).mean()
    
    # 3. 데이터 포맷팅 (Next.js 차트 라이브러리에 맞게 변환)
    data = []
    for index, row in df.iterrows():
        data.append({
            "time": index.strftime('%Y-%m-%d'),
            "open": row['Open'],
            "high": row['High'],
            "low": row['Low'],
            "close": row['Close'],
            "sma": row['SMA_20'] if not pd.isna(row['SMA_20']) else None
        })
        
    return {"symbol": symbol, "data": data}

# 실행: uvicorn main:app --reload
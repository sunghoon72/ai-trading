import yfinance as yf
import pandas as pd
import requests
import time
from datetime import datetime

# ==========================================
# 1. 설정값 입력 (이곳을 채워주세요)
# ==========================================
TELEGRAM_TOKEN = "여기에_봇_토큰을_넣으세요"
TELEGRAM_CHAT_ID = "여기에_챗_ID를_넣으세요"
TICKER = "005930.KS"  # 삼성전자 (야후파이낸스 기준)
CHECK_INTERVAL = 60   # 60초마다 확인

# ==========================================
# 2. 텔레그램 메시지 전송 함수
# ==========================================
def send_telegram_msg(message):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    data = {"chat_id": TELEGRAM_CHAT_ID, "text": message}
    try:
        requests.post(url, data=data)
        print(f"[알림 전송] {message}")
    except Exception as e:
        print(f"[전송 실패] {e}")

# ==========================================
# 3. 볼린저 밴드 계산 및 시그널 체크
# ==========================================
def check_market_signal():
    print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 데이터 조회 중...")
    
    # 최근 30일 데이터 가져오기 (일봉 기준)
    # 실시간 단타용이라면 interval="1m", period="1d" 등으로 변경 가능
    df = yf.download(TICKER, period="1mo", interval="1d", progress=False)
    
    if len(df) < 20:
        print("데이터가 부족하여 보조지표를 계산할 수 없습니다.")
        return

    # --- 볼린저 밴드 계산 (20일 이동평균, 승수 2) ---
    df['SMA'] = df['Close'].rolling(window=20).mean()      # 중심선
    df['std'] = df['Close'].rolling(window=20).std()       # 표준편차
    df['Upper'] = df['SMA'] + (df['std'] * 2)              # 상단 밴드
    df['Lower'] = df['SMA'] - (df['std'] * 2)              # 하단 밴드

    # 가장 최근 데이터 (오늘 현재가)
    last_row = df.iloc[-1]
    current_price = float(last_row['Close'])
    upper_band = float(last_row['Upper'])
    lower_band = float(last_row['Lower'])
    
    print(f"현재가: {current_price:,.0f}원 | 상단: {upper_band:,.0f}원 | 하단: {lower_band:,.0f}원")

    # --- 터치 여부 판단 로직 ---
    # 메시지 중복 방지를 위해 최근 알림 시간 체크 로직 등을 추가할 수 있음
    
    if current_price >= upper_band:
        msg = f"🚨 [매도 시그널]\n{TICKER} 가격이 볼린저 밴드 상단을 돌파했습니다!\n현재가: {current_price:,.0f}\n상단: {upper_band:,.0f}"
        send_telegram_msg(msg)
        
    elif current_price <= lower_band:
        msg = f"💎 [매수 시그널]\n{TICKER} 가격이 볼린저 밴드 하단을 터치했습니다!\n현재가: {current_price:,.0f}\n하단: {lower_band:,.0f}"
        send_telegram_msg(msg)
    else:
        print("특이사항 없음 (밴드 내부 운행 중)")

# ==========================================
# 4. 메인 실행 루프
# ==========================================
if __name__ == "__main__":
    send_telegram_msg(f"[{TICKER}] 볼린저 밴드 감시 봇이 시작되었습니다.")
    
    try:
        while True:
            check_market_signal()
            time.sleep(CHECK_INTERVAL) # 설정한 시간만큼 대기
    except KeyboardInterrupt:
        print("프로그램을 종료합니다.")
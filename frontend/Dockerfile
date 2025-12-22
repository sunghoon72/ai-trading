# frontend/Dockerfile

# 1. Node.js 베이스 이미지
FROM node:22-alpine

WORKDIR /app

# 2. 의존성 설치 (캐싱 활용)
COPY package*.json ./
RUN npm install

# 3. 소스 복사 및 빌드
COPY . .
#RUN npm run build

# 4. 실행 (Next.js 프로덕션 모드)
CMD ["npm", "run", "dev"]
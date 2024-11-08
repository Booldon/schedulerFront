# 1. Node 이미지로 빌드 단계 설정
FROM node:18 as build

# 2. 앱 폴더를 생성하고, 작업 디렉터리로 설정
WORKDIR /app

# 3. package.json 및 package-lock.json 복사 후, 의존성 설치
COPY package*.json ./
RUN npm install

# 4. 소스 파일 복사
COPY . .

# 5. 애플리케이션 빌드
RUN npm run build

# 6. Nginx를 서빙 서버로 사용
FROM nginx:alpine

# 7. 빌드된 파일을 Nginx의 기본 정적 파일 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 8. Nginx 설정 복사 (필요 시 설정)
COPY nginx.conf /etc/nginx/conf.d/

# 9. Nginx 80 포트 노출
EXPOSE 80

# 10. Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
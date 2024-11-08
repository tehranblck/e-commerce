# Resmi Node.js imajını kullan
FROM node:22-alpine3.19

# Çalışma dizinini /app olarak ayarla
WORKDIR /app

# package.json ve package-lock.json'ı kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kodunu kopyala
COPY . .

# Üretim için Next.js uygulamanını derle
RUN npm run build

# Port 3000'i dışarıya aç
EXPOSE 3000

# Uygulamayı başlat
CMD [ "npm", "start" ]
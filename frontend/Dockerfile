# Imagem oficial Node.js
FROM node:18

WORKDIR /app

# Instala dependências
COPY package.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 3000

# Comando para iniciar a aplicação React no modo desenvolvimento
CMD ["npm", "run", "dev"]

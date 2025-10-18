# Imagem oficial do Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json para instalar dependências primeiro (melhor cache)
COPY package.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta 4000 para o host
EXPOSE 4000

# Comando para iniciar a API
CMD ["node", "src/server.js"]

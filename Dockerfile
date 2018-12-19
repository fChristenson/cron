FROM alekzonder/puppeteer

COPY . /app

WORKDIR /app

RUN npm i -p

EXPOSE 3000

CMD ["npm", "start"]

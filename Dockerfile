# use the official Bun image
FROM --platform=linux/x86_64 oven/bun:1 
WORKDIR /app

COPY . . 

RUN bun install --frozen-lockfile
RUN apt-get update
RUN apt-get install ca-certificates curl -y
RUN update-ca-certificates

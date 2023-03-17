FROM node:18-alpine as builder
ARG REACT_APP_SOLVER_API_URL
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
ENV NODE_ENV=production
ENV REACT_APP_SOLVER_API_URL=${REACT_APP_SOLVER_API_URL}
RUN yarn build

FROM nginx:1.23
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
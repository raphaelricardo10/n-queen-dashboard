FROM node:18-alpine as builder

ARG REACT_APP_SOLVER_API_URL
ARG REACT_APP_WS_URI
ARG REACT_APP_API_TIMEOUT

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .
ENV NODE_ENV=production
ENV REACT_APP_SOLVER_API_URL=${REACT_APP_SOLVER_API_URL}
ENV REACT_APP_WS_URI=${REACT_APP_WS_URI}
ENV REACT_APP_API_TIMEOUT=${REACT_APP_API_TIMEOUT}
RUN yarn build

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

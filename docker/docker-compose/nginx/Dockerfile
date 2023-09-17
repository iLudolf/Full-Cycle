FROM nginx:stable-alpine

USER root

COPY ./http.d/default.conf /etc/nginx/sites-enabled/default.conf
COPY ./http.d/default.conf /etc/nginx/conf.d/default.conf

RUN apk add tzdata && cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

CMD [ "nginx", "-g", "daemon off;" ]
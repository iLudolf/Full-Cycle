FROM golang:1.20 as builder

WORKDIR /usr/src/app

COPY . .

RUN go build -v -o /usr/local/bin/app ./app.go

FROM scratch

WORKDIR /usr/src/app

COPY --from=builder /usr/local/bin/app .

CMD ["./app"]







# Project-One

## Project Structure

```shell
.
├── README.md
├── back-end
│   ├── be-01-authentication
│   │   ├── README.md
│   │   ├── auth-service-pb
│   │   │   ├── authentication.pb.go
│   │   │   └── authentication_grpc.pb.go
│   │   ├── go.mod
│   │   ├── go.sum
│   │   └── main.go
│   ├── be-02-authorization
│   │   └── go.mod
│   ├── be-03-auditing
│   │   └── go.mod
│   └── be-04-employees
│       └── go.mod
├── front-end
└── proto
    ├── README.md
    └── authentication.proto

```

I design this project structure into 3 main zones:

- `back-end`: to contain all back-end services
- `front-end`: to contain all front-end services
- `proto`: to contain all protobuf which is the middle of back-end and front-end so both back-end and front-end can access it.

## Development Workflow

- Step 1: each service we can start from `proto`
- Step 2: generate back-end `protobuf`
- Step 3: implement back-end service and logic
- Step 4: test back-end service via `grpcurl`
- Step 5: generate `protobuf` for front-end
- Step 6: implement front-end component/service

## Prerequisite

- [Golang](https://go.dev/doc/)
- [Angular](https://angular.io/docs)
- [gRPC](https://grpc.io/docs/)
- [grpcurl](https://github.com/fullstorydev/grpcurl/)
- 

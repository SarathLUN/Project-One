# Proto Files

This folder store all the `*.proto` files for the whole project.

## Authentication Service

- Generate protobuf for back-end:

```shell
protoc --go_out=../back-end/be-01-authentication/auth-service-pb --go_opt=paths=source_relative \
       --go-grpc_out=../back-end/be-01-authentication/auth-service-pb --go-grpc_opt=paths=source_relative \
       ./authentication.proto

```

- Generate protobuf for front-end:

```shell

```

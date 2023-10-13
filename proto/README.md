# Proto Files

This repo store all the `*.proto` files for the whole project.

- Generate protobuf for back-end:

```shell
protoc --go_out=../back-end/be-01-authentication/ --go_opt=paths=source_relative --go-grpc_out=../back-end/be-01-authentication/ --go-grpc_opt=paths=source_relative ./authentication.proto
```

- Generate protobuf for front-end:

```shell

```

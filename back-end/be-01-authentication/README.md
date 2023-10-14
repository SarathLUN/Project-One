# Back-end 01: Authentication Service

1. Start the auth server:

   ```shell
   go run main.go
   ```

2. Test the Login RPC:

    ```shell
    grpcurl -plaintext -d '{"username": "your-username", "password": "your-password"}' localhost:50051 AuthService/Login
    ```
   

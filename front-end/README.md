# Front-end implementation

### Step 1: Install Angular CLI

If you don't have Angular CLI installed globally, you can install it using the following command:

```shell
npm install -g @angular/cli
```

### Step 2: Create Angular Project

Run the following command to create your Angular project:

```shell
ng new fe-01-project-one
```

During the setup process, Angular CLI will ask you some questions. You can choose the defaults or customize based on your preferences.

### Step 3: Navigate to the Project Directory

```shell
cd fe-01-project-one
```

### Step 4: Install Dependencies

Install any additional dependencies you might need. For example, if you plan to make HTTP requests, you might need the Angular HTTP client:

```shell
ng add @angular/common
```

1. Install gRPC-Web for Angular:

    ```shell
    npm install grpc-web protobufjs
    ```

2. Install the @types/google-protobuf package for TypeScript compatibility:

    ```shell
    npm install @types/google-protobuf
    ```

### Step 5: Create Protobuf Definitions with TypeScript Definitions

1. Create a new directory named `proto` in the `src/app` directory.

     ```shell
     mkdir -p src/app/proto
     ```

2. Copy your `authentication.proto` file into the `src/app/proto` directory.

   ```shell
   cp ../proto/authentication.proto fe-01-project-one/src/app/proto
   ```

3. To use the generated TypeScript definitions in your Angular app, you need to convert the gRPC service definitions into TypeScript.
Use the `protoc-gen-ts` tool to generate TypeScript definitions from your gRPC service definitions:

   ```shell
   npm install grpc-tools
   ```

4. Run the following command for each of your gRPC service definitions:

   ```shell
   cd front-end/fe-01-project-one/src/app/proto/
   protoc-gen-ts --ts_out=import_style=commonjs,binary:. authentication.proto
   ```






### Step 6: Create gRPC Service

1. Create a new service to handle gRPC communication. Run the following command:

    ```shell
    ng generate service services/grpc
    ```

2. Replace the contents of `src/app/services/grpc.service.ts` with the following code:

    ```typescript
    import { Injectable } from '@angular/core';
    import { GrpcAuthServiceClient } from '../proto/authentication_pb_service';
    
    @Injectable({
      providedIn: 'root',
    })
    export class GrpcService {
      private client: GrpcAuthServiceClient;
    
      constructor() {
        this.client = new GrpcAuthServiceClient('http://localhost:8080');
      }
    
      login(username: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const request = new LoginRequest();
          request.setUsername(username);
          request.setPassword(password);
    
          this.client.login(request, {}, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response.getToken());
            }
          });
        });
      }
    }
    
    ```

### Step 7: Create Login Component

1. Run the following command to generate a login component:

    ```shell
    ng generate component login
    ```

2. Open `src/app/login/login.component.ts` and replace the contents with the following code:

    ```typescript
    import { Component } from '@angular/core';
    import { GrpcService } from '../services/grpc.service';
    
    @Component({
      selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css'],
    })
    export class LoginComponent {
      username: string = '';
      password: string = '';
    
      constructor(private grpcService: GrpcService) {}
    
      login() {
        this.grpcService.login(this.username, this.password)
          .then(token => {
            console.log('Login successful! Token:', token);
            // Do something with the token, e.g., store it in local storage
          })
          .catch(error => {
            console.error('Login failed:', error);
            // Handle login error
          });
      }
    }
    
    ```

3. Open `src/app/login/login.component.html` and replace the contents with a simple login form:

    ```html
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" [(ngModel)]="username" />
    
      <label for="password">Password:</label>
      <input type="password" id="password" [(ngModel)]="password" />
    
      <button (click)="login()">Login</button>
    </div>
    
    ```

### Step 8: Update App Module

1. Open `src/app/app.module.ts` and update it as follows:

    ```typescript
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';
    import { AppRoutingModule } from './app-routing.module';
    import { AppComponent } from './app.component';
    import { LoginComponent } from './login/login.component';
    
    @NgModule({
      declarations: [
        AppComponent,
        LoginComponent,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [],
      bootstrap: [AppComponent],
    })
    export class AppModule { }
    
    ```

### Step 9: Test the front-end auth client

1. Run your Angular app using:

    ```shell
    ng serve
    ```

2. Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/). You should see the login form.
3. Enter dummy credentials and click the "Login" button to test the communication with your gRPC AuthService.

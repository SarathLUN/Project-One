// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthServiceClient, ServiceError } from '../proto/generated/authentication_pb_service';
import { LoginRequest, LoginResponse } from '../proto/generated/authentication_pb';
import { grpc } from "@improbable-eng/grpc-web";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authService: AuthServiceClient;
  public username: string = '';
  public password: string = '';

  constructor() {
    // Replace 'http://localhost:8080' with your actual backend server URL
    this.authService = new AuthServiceClient('http://localhost:8080', {});
  }

  ngOnInit(): void {
  }

  login(): void {
    const request = new LoginRequest();
    request.setUsername(this.username);
    request.setPassword(this.password);

    const metadata = new grpc.Metadata(); // Create a new instance of grpc.Metadata

    this.authService.login(request, metadata, (err: ServiceError | null, response: LoginResponse | null) => {
      if (err) {
        console.error('Error:', err.message);
      } else if (response) {
        console.log('Response:', response.toObject());
        // Handle successful login response here
      } else {
        console.error('Unexpected null response');
      }
    });
  }
}


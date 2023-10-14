// login.component.ts
import { Component } from '@angular/core';
import { GrpcAuthService } from '../path-to-your-grpc-auth-service'; // Adjust the path

@Component({
  selector: 'app-login',
  template: `
    <div>
      <label>Username:</label>
      <input [(ngModel)]="username" />
      <br />
      <label>Password:</label>
      <input [(ngModel)]="password" type="password" />
      <br />
      <button (click)="login()">Login</button>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private grpcAuthService: GrpcAuthService) {}

  login() {
    this.grpcAuthService.login(this.username, this.password)
      .then(response => {
        console.log('Login successful! Token:', response.getToken());
      })
      .catch(error => {
        console.error('Login failed:', error);
      });
  }
}

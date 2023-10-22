package main

import (
	"context"
	"google.golang.org/grpc/reflection"
	"log"
	"net"

	pb "github.com/SarathLUN/project-one/back-end/be-01-authentication/auth-service-pb"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedAuthServiceServer
}

func (s *server) Login(ctx context.Context, req *pb.LoginRequest) (*pb.LoginResponse, error) {
	// Replace this with your actual authentication logic
	// For simplicity, let's assume all logins are successful, and we return a dummy token
	token := generateDummyToken()

	return &pb.LoginResponse{Token: token}, nil
}

func generateDummyToken() string {
	// Replace this with your actual token generation logic
	return "dummy-token"
}

func main() {
	serverPort := ":50051"
	lis, err := net.Listen("tcp", serverPort)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterAuthServiceServer(s, &server{})

	// Register the reflection service with the gRPC server
	reflection.Register(s)

	log.Printf("Server listening on port %s\n", serverPort)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}

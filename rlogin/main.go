package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

var jwtKey = []byte("your_secret_key")

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// Enable CORS Middleware
func enableCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // Allow React frontend
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	// Handle OPTIONS request (preflight request)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r) // Apply CORS headers

	if r.Method == "OPTIONS" {
		return // Return early for preflight requests
	}

	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Dummy user validation (Replace with database check)
	if creds.Email != "test@example.com" || creds.Password != "password123" {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Email: creds.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	// Respond with JWT
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func main() {
	http.HandleFunc("/api/auth/login", loginHandler)

	// CORS preflight handler
	http.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w, r)
		w.WriteHeader(http.StatusOK)
	})

	fmt.Println("Server running on port 8080...")
	http.ListenAndServe(":8080", nil)
}

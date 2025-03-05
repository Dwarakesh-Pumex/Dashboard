package main

import (
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

// JWT Secret Key
var jwtKey = []byte("your_secret_key")

// Demo User (Stored in Memory)
var demoUser = struct {
	Email    string
	Password string
}{
	Email:    "dwarakeshtbabu13@gmail.com",
	Password: "password123",
}

// SMTP Email Configuration
var smtpHost = "smtp.gmail.com"
var smtpPort = "587"
var smtpEmail = "dwarakeshtbabu13@gmail.com"
var smtpPass = "wmae rvfa ilmo aoqj"

// Struct for JWT Claims
type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

// **Forgot Password API**
func ForgotPassword(c *fiber.Ctx) error {
	type Request struct {
		Email         string `json:"email"`
		StoreFrontURL string `json:"storeFrontURL"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request"})
	}

	// Validate Email
	if req.Email != demoUser.Email {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"message": "User not found"})
	}

	// Generate JWT Token (Valid for 1 Hour)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"email": demoUser.Email,
		"exp":   time.Now().Add(time.Hour).Unix(),
	})
	tokenString, _ := token.SignedString(jwtKey)

	// Reset Password Link
	resetLink := fmt.Sprintf("%s/reset-password?token=%s", req.StoreFrontURL, tokenString)

	// Send Email
	auth := smtp.PlainAuth("", smtpEmail, smtpPass, smtpHost)
	msg := []byte("Subject: Password Reset\n\nClick the link to reset your password: " + resetLink)

	// Debugging SMTP Issues
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpEmail, []string{demoUser.Email}, msg)
	if err != nil {
		fmt.Println("SMTP Error:", err) // Logs the actual error
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to send email", "error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Password reset link sent to your email."})
}

// **Reset Password API**
func ResetPassword(c *fiber.Ctx) error {
	type Request struct {
		Token       string `json:"token"`
		NewPassword string `json:"newPassword"`
	}

	var req Request
	if err := c.BodyParser(&req); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request"})
	}

	// Parse JWT Token
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(req.Token, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid or expired token"})
	}

	// Validate Token Email
	if claims["email"] != demoUser.Email {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized request"})
	}

	// Update In-Memory Password
	demoUser.Password = req.NewPassword

	return c.JSON(fiber.Map{"message": "Password updated successfully"})
}

// **Login API**
func loginHandler(c *fiber.Ctx) error {
	type Credentials struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var creds Credentials
	if err := c.BodyParser(&creds); err != nil {
		return c.Status(http.StatusBadRequest).JSON(fiber.Map{"message": "Invalid request"})
	}

	// Validate Credentials
	if creds.Email != demoUser.Email || creds.Password != demoUser.Password {
		return c.Status(http.StatusUnauthorized).JSON(fiber.Map{"message": "Invalid credentials"})
	}

	// Generate JWT Token
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
		return c.Status(http.StatusInternalServerError).JSON(fiber.Map{"message": "Could not generate token"})
	}

	return c.JSON(fiber.Map{"token": tokenString})
}

// **Logout API**

func Logout(c *fiber.Ctx) error {
	// Clear token from frontend (client should remove it from local storage)
	return c.JSON(fiber.Map{"message": "Logged out successfully"})
}

// **CORS Middleware**
func corsMiddleware(c *fiber.Ctx) error {
	c.Set("Access-Control-Allow-Origin", "http://localhost:3000")
	c.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	c.Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	c.Set("Access-Control-Allow-Credentials", "true")

	if c.Method() == "OPTIONS" {
		return c.SendStatus(http.StatusOK)
	}
	return c.Next()
}

// **Main Function**
func main() {
	app := fiber.New()

	// Enable CORS Middleware
	app.Use(corsMiddleware)

	// API Endpoints
	app.Post("/api/auth/login", loginHandler)
	app.Post("/api/auth/forgot-password", ForgotPassword)
	app.Post("/api/auth/reset-password", ResetPassword)
	app.Post("/api/auth/logout", Logout)

	// Start Server
	fmt.Println("Server running on port 8080...")
	log.Fatal(app.Listen(":8080"))
}

package main

import (
	"net/http"
	"sync"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// User struct to store user credentials
type User struct {
	Username string
	Password string // Hashed password
}

// In-memory user storage
var users = make(map[string]User)
var mu sync.Mutex // Prevents race conditions

// LogoutHandler: Clears the session cookie
func LogoutHandler(c *gin.Context) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "session_id",
		Value:    "",
		MaxAge:   -1,
		HttpOnly: true,
		Path:     "/",
	})
	c.JSON(http.StatusOK, gin.H{"message": "Logout successful"})
}

// Main function
func main() {
	router := gin.Default()

	// Enable CORS for React frontend (localhost:3000)
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	// Define routes
	router.POST("/signup", SignupHandler)
	router.POST("/login", LoginHandler)
	router.POST("/logout", LogoutHandler)
	router.GET("/dashboard", AuthMiddleware(), DashboardHandler)

	// Start server
	router.Run(":8080")
}

// SignupHandler: Registers a new user
func SignupHandler(c *gin.Context) {
	var request struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	// Parse JSON request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	mu.Lock()
	defer mu.Unlock()

	// Check if the user already exists
	if _, exists := users[request.Username]; exists {
		c.JSON(http.StatusConflict, gin.H{"error": "User already exists"})
		return
	}

	// Hash the password before storing
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	// Store user with hashed password
	users[request.Username] = User{Username: request.Username, Password: string(hashedPassword)}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

// LoginHandler: Authenticates user
func LoginHandler(c *gin.Context) {
	var request struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	// Parse request JSON
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	mu.Lock()
	user, exists := users[request.Username]
	mu.Unlock()

	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Set cookie for session management
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "session_id",
		Value:    "authenticated",
		HttpOnly: true,
		Path:     "/", // Ensure the cookie is valid for all paths
	})

	c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
}

// AuthMiddleware checks for authenticated users
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		sessionCookie, err := c.Request.Cookie("session_id")
		if err != nil || sessionCookie.Value != "authenticated" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}
		c.Next()
	}
}

// DashboardHandler: Returns a response for the dashboard
func DashboardHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "Welcome to the dashboard!"})
}

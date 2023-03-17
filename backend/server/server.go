package server

import (
	"net/http"
	"recipient/auth"
	"recipient/config"
	"recipient/controllers"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func Init() {
	auth.Init()
	router := gin.New()
	router.Use(gin.Recovery())

	// CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "DELETE", "PUT", "OPTIONS"},
		AllowHeaders:     append([]string{"content-type"}, supertokens.GetAllCORSHeaders()...),
		MaxAge:           1 * time.Minute,
		AllowCredentials: true,
	}))

	router.Use(func(c *gin.Context) {
		supertokens.Middleware(http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
			c.Next()
		})).ServeHTTP(c.Writer, c.Request)
		c.Abort()
	})

	// Add Routes - supertokens adds routes at apiBasePath/login and apiBasePath/signup
	router.GET("/sessioninfo", auth.VerifySession(nil), auth.SessionInfo)
	router.GET("/recipient", auth.VerifySession(nil), controllers.GetRecipient)
	// rg := router.Group("/recipients")
	// rg.GET("/:")

	err := router.Run(config.Config["apiPort"])
	if err != nil {
		panic(err.Error())
	}
}

package config

import (
	"os"

	"github.com/gin-gonic/gin"
)

var Config map[string]string

func setupConfig() {
	var prefix string
	Config = make(map[string]string)

	Config["urlRoot"] = "http://localhost"
	if gin.Mode() == "release" {
		prefix = "PROD_"
	} else if gin.Mode() == "test" {
		prefix = "TEST_"
	} else {
		prefix = "DEV_"
	}

	Config["dbHost"] = os.Getenv(prefix + "DB_HOST")
	Config["dbDriver"] = os.Getenv(prefix + "DB_DRIVER")
	Config["dbUser"] = os.Getenv(prefix + "DB_USER")
	Config["dbPassword"] = os.Getenv(prefix + "DB_PASSWORD")
	Config["dbName"] = os.Getenv(prefix + "DB_NAME")
	Config["dbPort"] = os.Getenv(prefix + "DB_PORT")

	Config["apiPort"] = os.Getenv("API_PORT")
	Config["websitePort"] = os.Getenv("WEBSITE_PORT")
	Config["supertokensURI"] = os.Getenv("SUPERTOKENS_URI")
	Config["supertokensAPIKey"] = os.Getenv("SUPERTOKENS_API_KEY")
	Config["supertokensDashboardKey"] = os.Getenv("SUPERTOKENS_DASHBOARD_KEY")
}

func Init() {
	setupConfig()
}

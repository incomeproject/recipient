package main

import (
	"recipient/config"
	"recipient/models"
	"recipient/server"
)

func main() {
		config.Init()
	models.ConnectDB()
	server.Init()
}

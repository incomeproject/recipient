package main

import (
	"recipient/config"
	"recipient/server"
)

func main() {
	// supertokens init here
	config.Init()
	// adding of superotkens middleware, cors and APIs
	server.Init()
}

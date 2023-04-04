package models

import (
	"fmt"
	"log"
	"recipient/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s TimeZone=America/New_York",
		config.Config["dbHost"], config.Config["dbUser"], config.Config["dbPassword"],
		config.Config["dbName"], config.Config["dbPort"],
	)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the Database")
	}

	runMigrations()
}

func runMigrations() {
	DB.AutoMigrate(&Recipient{})
}

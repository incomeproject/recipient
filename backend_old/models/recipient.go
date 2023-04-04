package models

import (
	"time"
)

type Recipient struct {
	ID        string `json:"id" gorm:"primary_key"`
	Email     string `json:"email" gorm:"uniqueIndex;not null"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

// func init() {
// 	DB.AutoMigrate(&Recipient{})
// }

package entity

import (
	"time"

	"gorm.io/gorm"
)

type Employee struct {
	gorm.Model
	UserName string
	FirstName string
	LastName string
	PhoneNumber string
	Email string
	Gender string
	National_ID string
	Address string
	Salary int
	Employment_date  time.Time
	Date_of_Birth  time.Time

	// PositionID ทำหน้าที่เป็น FK
	PositionID *uint
	Position   Position `gorm:"foriegnKey:PositionID"`
	
}
package config

import (
	"fmt"
	"time"

	"github.com/sa67-system/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("sa.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	fmt.Println("connected database")
	db = database
}

func SetupDatabase() {

	db.AutoMigrate(
		&entity.Employee{},
		&entity.Position{},
	)

	// Ensure Position "Kitchen" exists
	PositionKitchen := entity.Position{Position_Name: "Kitchen"}
	PositionHousekepper := entity.Position{Position_Name: "Housekepper"}

	db.FirstOrCreate(&PositionKitchen, entity.Position{Position_Name: "Kitchen"})
	db.FirstOrCreate(&PositionHousekepper, entity.Position{Position_Name: "Housekepper"})

	PositionID := uint(1)
	// Create Employee
	employee := &entity.Employee{
		UserName:       "Jo",
		FirstName:      "John",
		LastName:       "Doe",
		PhoneNumber:    "+123456789",
		Email:          "john.doe@example.com",
		Gender:         "Male",
		National_ID:    "1234567890123",
		Address:        "123 Main St, City, Country",
		Salary:         50000,
		Employment_date: time.Date(2021, time.January, 1, 0, 0, 0, 0, time.UTC),
		Date_of_Birth:  time.Date(1990, time.July, 15, 0, 0, 0, 0, time.UTC),
		PositionID:     &PositionID, // Use the pointer to the ID
	}
	db.FirstOrCreate(employee, &entity.Employee{
		Email: "john.doe@example.com",
	})
}

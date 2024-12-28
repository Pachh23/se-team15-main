package entity

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model

	ProductName  string  `gorm:"not null"`
	ProductPrice float32 `gorm:"not null"`

	CategoryID uint
	Category   Category `gorm:"foreignKey:CategoryID"`

	
	OrderItem       []OrderItem       `gorm:"foreignKey:ProductID"`
	ProductLocation []ProductLocation `gorm:"foreignKey:ProductID"`
	
	Trasaction []Trasaction `gorm:"foreignKey:ProductID"`
	EmployeeID *uint
	Employee   Employee `gorm:"foriegnKey:EmployeeID"`
}

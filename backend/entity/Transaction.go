package entity

import (
	"time"

	"gorm.io/gorm"
)

type Trasaction struct {
	gorm.Model

	Quantity int `gorm:"not null"`

	Transaction_date time.Time `gorm:"not null"`

	ProductID  uint
	Product    Product `gorm:"foreignKey:ProductID"`
	EmployeeID *uint
	Employee   Employee `gorm:"foriegnKey:EmployeeID"`
}

package entity

import "gorm.io/gorm"

type InventoryCounts struct {
	gorm.Model
	ProductID uint    `valid:"required~Product is required"`
	Product   Product `gorm:"foreignKey: ProductID" `

	WarehouseID uint       `valid:"required~Warehouse is required"`
	Warehouse   Warehouses `gorm:"foreignKey: WarehouseID" `

	CountedQuantity uint
	remark          string

	TransactionID uint
	Transaction   Trasaction `gorm:"foreignKey:TransactionID"`
}

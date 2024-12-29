package entity

import "gorm.io/gorm"

type InventoryCounts struct {
	gorm.Model
	ProductID       uint       `valid:"required~Product is required"`
	Product         Product    `gorm:"foreignKey:ProductID" valid:"-"` // เพิ่ม valid:"-"
	WarehouseID     uint       `valid:"required~Warehouse is required"`
	Warehouse       Warehouses `gorm:"foreignKey:WarehouseID" valid:"-"` // เพิ่ม valid:"-"
	CountedQuantity uint       `valid:"required~CountedQuantity is required" json:"counted_quantity"`
	Remark          *string    `json:"remark"`
	TransactionID   uint       `valid:"required~Transaction is required"`
	Transaction     Trasaction `gorm:"foreignKey:TransactionID" valid:"-"` // เพิ่ม valid:"-"
}

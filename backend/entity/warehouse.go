package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	WarehouseName string  `valid:"required~WarehouseName is required" gorm:"unique;not null" json:"warehouse_name"`
	Capacity      float64 `valid:"required~Capacity is required, positive~Capacity must be positive" json:"capacity"`
	Address       string  `valid:"required~Address is required" json:"address"`
	Zipcode       string  `valid:"required~Zipcode is required, stringlength(5|5)" json:"zipcode"`

	ProvinceID uint      `valid:"required~Province is required" json:"province_id"`
	Province   Provinces `gorm:"foreignKey: ProvinceID" json:"province"`

	WarehouseTypeID uint           `valid:"required~WarehouseType is required" json:"warehouse_type_id"`
	WarehouseType   WarehouseTypes `gorm:"foreignKey: WarehouseTypeID" json:"warehouse_type"`

	WarehouseStatusID uint              `valid:"required~WarehouseStatus is required" json:"warehouse_status_id"`
	WarehouseStatus   WarehouseStatuses `gorm:"foreignKey: WarehouseStatusID" json:"warehouse_status"`

	Employees []Employee `gorm:"foreignKey:WarehouseID"`
	Location  []Location `gorm:"foreignKey:WarehouseID"`
}

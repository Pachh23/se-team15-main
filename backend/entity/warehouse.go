package entity

import (
	"gorm.io/gorm"
)

type Warehouses struct {
	gorm.Model
	WarehouseName     string             `gorm:"unique;not null" json:"warehouse_name"`
	WarehouseTypeID   uint               `json:"warehouse_type_id"`
	Capacity          float64            `json:"capacity"` // หน่วย: m³ (ลูกบาศก์เมตร)
	WarehouseStatusID uint               `json:"warehouse_status_id"`
	Address           string             `json:"address"`
	Zipcode           string             `json:"zipcode"`
	ProvinceID        uint               `json:"province_id"`
	Province          *Provinces         `gorm:"foreignKey: ProvinceID" json:"province"`
	WarehouseType     *WarehouseTypes    `gorm:"foreignKey: WarehouseTypeID" json:"warehouse_type"`
	WarehouseStatus   *WarehouseStatuses `gorm:"foreignKey: WarehouseStatusID" json:"warehouse_status"`

	Employees []Employee `gorm:"foreignKey:WarehouseID"`
	Location  []Location `gorm:"foreignKey:WarehouseID"`
}

package test

import (
	"fmt"
	"testing"

	"github.com/aprbq/se-team15/entity"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestWarehouse(t *testing.T) {

	govalidator.CustomTypeTagMap.Set("positive", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		switch v := i.(type) {
		case float64:
			return v > 0
		}
		return false
	}))

	g := NewGomegaWithT(t)

	t.Run(`Check all required fields for Warehouse`, func(t *testing.T) {
		warehouse := entity.Warehouses{
			WarehouseName:     "Warehouse A",
			WarehouseTypeID:   3,
			Capacity:          500, // หน่วย: m³ (ลูกบาศก์เมตร)
			WarehouseStatusID: 1,
			Address:           "123/4 Sukhumvit 22, Khlong Tan Nuea, Watthana",
			Zipcode:           "10110",
			ProvinceID:        3,
		}

		ok, err := govalidator.ValidateStruct(warehouse)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())

	})

	t.Run(`WarehouseName is required`, func(t *testing.T) {
		warehouse := entity.Warehouses{
			WarehouseName:     "", // ผิดตรงนี้
			WarehouseTypeID:   3,
			Capacity:          500,
			WarehouseStatusID: 1,
			Address:           "123/4 Sukhumvit 22, Khlong Tan Nuea, Watthana",
			Zipcode:           "10110",
			ProvinceID:        3,
		}

		ok, err := govalidator.ValidateStruct(warehouse)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("WarehouseName is required"))
	})

	t.Run(`Capacity must be positive`, func(t *testing.T) {
		warehouse := entity.Warehouses{
			WarehouseName:     "Warehouse A",
			WarehouseTypeID:   3,
			Capacity:          -500, // ผิดตรงนี้
			WarehouseStatusID: 1,
			Address:           "123/4 Sukhumvit 22, Khlong Tan Nuea, Watthana",
			Zipcode:           "10110",
			ProvinceID:        3,
		}

		ok, err := govalidator.ValidateStruct(warehouse)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(ContainSubstring("positive"))
	})

	t.Run(`Address is required`, func(t *testing.T) {
		warehouse := entity.Warehouses{
			WarehouseName:     "Warehouse A", // ผิดตรงนี้
			WarehouseTypeID:   3,
			Capacity:          500,
			WarehouseStatusID: 1,
			Address:           "",
			Zipcode:           "10110",
			ProvinceID:        3,
		}

		ok, err := govalidator.ValidateStruct(warehouse)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Address is required"))
	})

	t.Run(`Zipcode check 5 digit`, func(t *testing.T) {
		warehouse := entity.Warehouses{
			WarehouseName:     "Warehouse A", // ผิดตรงนี้
			WarehouseTypeID:   3,
			Capacity:          500,
			WarehouseStatusID: 1,
			Address:           "123/4 Sukhumvit 22, Khlong Tan Nuea, Watthana",
			Zipcode:           "101100", // ผิดตรงนี้ มี 6 ตัว
			ProvinceID:        3,
		}

		ok, err := govalidator.ValidateStruct(warehouse)

		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal(fmt.Sprintf("zipcode: %s does not validate as stringlength(5|5)", warehouse.Zipcode)))
	})

}

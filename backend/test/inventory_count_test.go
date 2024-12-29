package test

import (
	"testing"

	"github.com/aprbq/se-team15/entity"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestInventoryCount(t *testing.T) {
	g := NewGomegaWithT(t)

	t.Run(`Check all required fields for InventoryCounts`, func(t *testing.T) {
		count := entity.InventoryCounts{
			ProductID:       1,
			WarehouseID:     1,
			CountedQuantity: 1000,
			TransactionID:   1,
		}

		ok, err := govalidator.ValidateStruct(count)

		g.Expect(ok).To(BeTrue())
		g.Expect(err).To(BeNil())
	})

	t.Run(`Product is required`, func(t *testing.T) {
		count := entity.InventoryCounts{
			ProductID:       0, // invalid
			WarehouseID:     1,
			CountedQuantity: 1000,
			TransactionID:   1,
		}

		ok, err := govalidator.ValidateStruct(count)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Product is required"))
	})

	t.Run(`Warehouse is required`, func(t *testing.T) {
		count := entity.InventoryCounts{
			ProductID:       1,
			WarehouseID:     0, // invalid
			CountedQuantity: 1000,
			TransactionID:   1,
		}

		ok, err := govalidator.ValidateStruct(count)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("Warehouse is required"))
	})

	t.Run(`CountedQuantity is required`, func(t *testing.T) {
		count := entity.InventoryCounts{
			ProductID:       1,
			WarehouseID:     1,
			CountedQuantity: 0, // invalid
			TransactionID:   1,
		}

		ok, err := govalidator.ValidateStruct(count)
		g.Expect(ok).NotTo(BeTrue())
		g.Expect(err).NotTo(BeNil())
		g.Expect(err.Error()).To(Equal("CountedQuantity is required"))
	})
}

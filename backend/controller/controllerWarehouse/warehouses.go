package controllerwarehouse

import (
	"net/http"
	"strings"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/entity"
	"github.com/gin-gonic/gin"
)

func GetAllWarehouses(c *gin.Context) {
	var warehouses []entity.Warehouses
	db := config.DB()
	results := db.Preload("Province").Preload("WarehouseType").Preload("WarehouseStatus").Find(&warehouses)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, warehouses)

}

func GetWarehouse(c *gin.Context) {
	ID := c.Param("id")
	var warehouse entity.Warehouses
	db := config.DB()
	results := db.Preload("Province").Preload("WarehouseType").Preload("WarehouseStatus").First(&warehouse, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if warehouse.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, warehouse)
}

func UpdateWarehouse(c *gin.Context) {
	var warehouse entity.Warehouses
	WarehouseID := c.Param("id")
	db := config.DB()
	result := db.First(&warehouse, WarehouseID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}
	if err := c.ShouldBindJSON(&warehouse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}
	result = db.Save(&warehouse)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

func DeleteWarehouse(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM warehouses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

func CreateWarehouse(c *gin.Context) {
	var warehouse entity.Warehouses

	// Bind the JSON payload to the warehouse struct
	if err := c.ShouldBindJSON(&warehouse); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	// Save the warehouse to the database
	db := config.DB()
	if result := db.Create(&warehouse); result.Error != nil {
		// Check if the error is due to UNIQUE constraint
		if strings.Contains(result.Error.Error(), "UNIQUE constraint failed") {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Warehouse name already exists"})
			return
		}

		// Handle other potential database errors
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Return success response with the created warehouse object
	c.JSON(http.StatusCreated, gin.H{
		"message": "Warehouse created successfully",
		"data":    warehouse,
	})
}

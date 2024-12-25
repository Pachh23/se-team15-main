package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/aprbq/se-team15/config"
	"github.com/aprbq/se-team15/controller"
	 "github.com/aprbq/se-team15/controller/controllerWarehouse"
	"github.com/aprbq/se-team15/middleware"
)

const PORT = "8080"

func main() {

	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/signup", controller.SignUpEmployees)
	r.POST("/signin", controller.SignInEmployees)
	r.POST("/warehouses-create", controllerwarehouse.CreateWarehouse)

	router := r.Group("/")
	{

		router.Use(middleware.Authorizes())
		router.PUT("/user/:id", controller.UpdateEmployees)
		router.GET("/users", controller.GetListEmployees)
		router.GET("/user/:id", controller.GetEmployees)
		router.DELETE("/user/:id", controller.DeleteEmployees)

		router.GET("/location", controller.GetAll)
		router.GET("/location/:id", controller.Get)

		// Warehouse Route
		router.PUT("/warehouse/:id", controllerwarehouse.UpdateWarehouse)
		router.GET("/warehouses", controllerwarehouse.GetAllWarehouses)
		router.GET("/warehouse/:id", controllerwarehouse.GetWarehouse)
		router.DELETE("/warehouse/:id", controllerwarehouse.DeleteWarehouse)

	}

	r.GET("/genders", controller.GetListGenders)
	r.GET("/warehouseTypes", controllerwarehouse.GetAllWarehouseTypes)
	r.GET("/warehouseStatuses", controllerwarehouse.GetAllWarehouseStatuses)
	r.GET("/provinces", controllerwarehouse.GetAllProvinces)
	r.GET("/", func(c *gin.Context) {

		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)

	})
	r.Run("localhost:" + PORT)

}

func CORSMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS" {

			c.AbortWithStatus(204)
			return

		}
		c.Next()
	}
}

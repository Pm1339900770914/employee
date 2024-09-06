package controller

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/sa67-system/config"
	"github.com/sa67-system/entity"
)

// GET /positions
func ListPositions(c *gin.Context) {
	var positions []entity.Position

	db := config.DB()

	db.Find(&positions)

	c.JSON(http.StatusOK, &positions)
}

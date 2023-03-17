package controllers

import (
	"net/http"
	"recipient/models"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/supertokens"
)

// func getRecipientID(c *gin.Context) {

// }

func GetRecipient(c *gin.Context) {
	var recipient models.Recipient

	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	if sessionContainer == nil {
		c.JSON(500, "no session found")
		return
	}
	_, err := sessionContainer.GetSessionData()
	if err != nil {
		err = supertokens.ErrorHandler(err, c.Request, c.Writer)
		if err != nil {
			c.JSON(500, err.Error())
			return
		}
		return
	}
	models.DB.First(&recipient, "id = ?", sessionContainer.GetUserID())

	c.JSON(http.StatusOK, recipient)
}

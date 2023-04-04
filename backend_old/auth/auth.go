package auth

import (
	"net/http"
	"recipient/config"
	"recipient/models"

	"github.com/gin-gonic/gin"
	"github.com/supertokens/supertokens-golang/recipe/dashboard"
	"github.com/supertokens/supertokens-golang/recipe/dashboard/dashboardmodels"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword"
	"github.com/supertokens/supertokens-golang/recipe/emailpassword/epmodels"
	"github.com/supertokens/supertokens-golang/recipe/emailverification"
	"github.com/supertokens/supertokens-golang/recipe/emailverification/evmodels"
	"github.com/supertokens/supertokens-golang/recipe/session"
	"github.com/supertokens/supertokens-golang/recipe/session/sessmodels"
	"github.com/supertokens/supertokens-golang/supertokens"
)

func Init() {
	apiBasePath := "/auth"
	websiteBasePath := "/auth"

	err := supertokens.Init(supertokens.TypeInput{

		// Basic Settings
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: config.Config["supertokensURI"],
			APIKey:        config.Config["supertokensAPIKey"],
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Recipient",
			APIDomain:       config.Config["urlRoot"] + config.Config["apiPort"],
			WebsiteDomain:   config.Config["urlRoot"] + config.Config["websitePort"],
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			emailpassword.Init(&epmodels.TypeInput{}),

			emailverification.Init(evmodels.TypeInput{
				Mode: evmodels.ModeRequired,
				Override: &evmodels.OverrideStruct{

					// Establish custom steps to perform after an email verification
					APIs: func(originalImplementation evmodels.APIInterface) evmodels.APIInterface {
						ogVerifyEmailPOST := *originalImplementation.VerifyEmailPOST
						(*originalImplementation.VerifyEmailPOST) = func(token string, sessionContainer sessmodels.SessionContainer, options evmodels.APIOptions, userContext supertokens.UserContext) (evmodels.VerifyEmailPOSTResponse, error) {
							resp, err := ogVerifyEmailPOST(token, sessionContainer, options, userContext)
							if err != nil {
								return evmodels.VerifyEmailPOSTResponse{}, err
							}

							// Create a new recipient
							if resp.OK != nil {
								id := resp.OK.User.ID
								email := resp.OK.User.Email
								recipient := models.Recipient{ID: id, Email: email}
								models.DB.Create(&recipient)
							}

							return resp, nil
						}
						return originalImplementation
					},
				},
			}),

			dashboard.Init(&dashboardmodels.TypeInput{
				ApiKey: config.Config["supertokensDashboardKey"],
			}),
			session.Init(&sessmodels.TypeInput{}),
		},
	})
	if err != nil {
		panic(err.Error())
	}
}

func VerifySession(options *sessmodels.VerifySessionOptions) gin.HandlerFunc {
	return func(c *gin.Context) {
		session.VerifySession(options, func(rw http.ResponseWriter, r *http.Request) {
			c.Request = c.Request.WithContext(r.Context())
			c.Next()
		})(c.Writer, c.Request)
		c.Abort()
	}
}

func SessionInfo(c *gin.Context) {
	sessionContainer := session.GetSessionFromRequestContext(c.Request.Context())
	if sessionContainer == nil {
		c.JSON(500, "no session found")
		return
	}
	sessionData, err := sessionContainer.GetSessionData()
	if err != nil {
		err = supertokens.ErrorHandler(err, c.Request, c.Writer)
		if err != nil {
			c.JSON(500, err.Error())
			return
		}
		return
	}
	c.JSON(200, map[string]interface{}{
		"sessionHandle":      sessionContainer.GetHandle(),
		"userId":             sessionContainer.GetUserID(),
		"accessTokenPayload": sessionContainer.GetAccessTokenPayload(),
		"sessionData":        sessionData,
	})
}

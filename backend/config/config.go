package config

import (
	"fmt"
	"os"

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

var config map[string]string

func setConfig() {
	var prefix string
	config = make(map[string]string)

	config["urlRoot"] = "http://localhost"
	if gin.Mode() == "release" {
		prefix = "PROD_"
	} else if gin.Mode() == "test" {
		prefix = "TEST_"
	} else {
		prefix = "DEV_"
	}

	config["dbHost"] = os.Getenv(prefix + "DB_HOST")
	config["driver"] = os.Getenv(prefix + "DRIVER")
	config["user"] = os.Getenv(prefix + "USER")
	config["password"] = os.Getenv(prefix + "PASSWORD")
	config["name"] = os.Getenv(prefix + "NAME")
	config["port"] = os.Getenv(prefix + "PORT")

	config["apiPort"] = os.Getenv("API_PORT")
	config["websitePort"] = os.Getenv("WEBSITE_PORT")
	config["supertokensURI"] = os.Getenv("SUPERTOKENS_URI")
	config["supertokensAPIKey"] = os.Getenv("SUPERTOKENS_API_KEY")
	config["supertokensDashboardKey"] = os.Getenv("SUPERTOKENS_DASHBOARD_KEY")
}

func Init() {
	var err error

	setConfig()
	apiBasePath := "/auth"
	websiteBasePath := "/auth"

	err = supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: config["supertokensURI"],
			APIKey:        config["supertokensAPIKey"],
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Recipient",
			APIDomain:       config["urlRoot"] + config["apiPort"],
			WebsiteDomain:   config["urlRoot"] + config["websitePort"],
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			emailpassword.Init(&epmodels.TypeInput{}),

			emailverification.Init(evmodels.TypeInput{
				Mode: evmodels.ModeRequired,
				Override: &evmodels.OverrideStruct{
					APIs: func(originalImplementation evmodels.APIInterface) evmodels.APIInterface {
						ogVerifyEmailPOST := *originalImplementation.VerifyEmailPOST
						(*originalImplementation.VerifyEmailPOST) = func(token string, sessionContainer sessmodels.SessionContainer, options evmodels.APIOptions, userContext supertokens.UserContext) (evmodels.VerifyEmailPOSTResponse, error) {
							resp, err := ogVerifyEmailPOST(token, sessionContainer, options, userContext)
							if err != nil {
								return evmodels.VerifyEmailPOSTResponse{}, err
							}

							if resp.OK != nil {
								id := resp.OK.User.ID
								email := resp.OK.User.Email
								fmt.Println(id)
								fmt.Println(email)
								// TODO: post email verification logic
							}

							return resp, nil
						}
						return originalImplementation
					},
				},
			}),

			dashboard.Init(&dashboardmodels.TypeInput{
				ApiKey: config["supertokensDashboardKey"],
			}),
			session.Init(&sessmodels.TypeInput{}),
		},
	})
	if err != nil {
		panic(err.Error())
	}
}

func GetConfig() map[string]string {
	return config
}

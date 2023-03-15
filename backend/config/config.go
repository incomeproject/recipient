package config

import (
	"log"

	"github.com/spf13/viper"
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

var config *viper.Viper

// Init is an exported method that takes the environment starts the viper
// (external lib) and returns the configuration struct.
func Init() {
	var err error
	config = viper.New()
	config.SetConfigType("yaml")
	config.SetConfigName("dev")
	config.AddConfigPath("../config/")
	config.AddConfigPath("config/")
	err = config.ReadInConfig()
	if err != nil {
		log.Fatal("error on parsing configuration file")
	}
	apiBasePath := "/auth"
	websiteBasePath := "/auth"

	// smtpUsername := "..."
	// smtpSettings := emaildelivery.SMTPSettings{
	// 	Host: "...",
	// 	From: emaildelivery.SMTPFrom{
	// 		Name:  "...",
	// 		Email: "...",
	// 	},
	// 	Port:     456,
	// 	Username: &smtpUsername, // this is optional. In case not given, from.email will be used
	// 	Password: "...",
	// 	Secure:   false,
	// }

	err = supertokens.Init(supertokens.TypeInput{
		Supertokens: &supertokens.ConnectionInfo{
			ConnectionURI: config.GetString("supertokens.connectionURI"),
			APIKey:        config.GetString("supertokens.apiKey"),
		},
		AppInfo: supertokens.AppInfo{
			AppName:         "Recipient",
			APIDomain:       "http://localhost:" + config.GetString("server.apiPort"),
			WebsiteDomain:   "http://localhost:" + config.GetString("server.websitePort"),
			APIBasePath:     &apiBasePath,
			WebsiteBasePath: &websiteBasePath,
		},
		RecipeList: []supertokens.Recipe{
			emailpassword.Init(&epmodels.TypeInput{
				// EmailDelivery: &emaildelivery.TypeInput{
				// 	Service: emailpassword.MakeSMTPService(emaildelivery.SMTPServiceConfig{
				// 		Settings: smtpSettings,
				// 	}),
				// },
			}),

			emailverification.Init(evmodels.TypeInput{
				Mode: evmodels.ModeRequired,
				// EmailDelivery: &emaildelivery.TypeInput{
				// 	Service: emailverification.MakeSMTPService(emaildelivery.SMTPServiceConfig{
				// 		Settings: smtpSettings,
				// 	}),
				// },
			}),

			dashboard.Init(&dashboardmodels.TypeInput{
				ApiKey: config.GetString("supertokens.apiKey"),
			}),
			session.Init(&sessmodels.TypeInput{}),
		},
	})
	if err != nil {
		panic(err.Error())
	}
}

func GetConfig() *viper.Viper {
	return config
}

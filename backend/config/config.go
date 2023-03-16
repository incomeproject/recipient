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
			emailpassword.Init(&epmodels.TypeInput{}),

			emailverification.Init(evmodels.TypeInput{
				Mode: evmodels.ModeRequired,
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

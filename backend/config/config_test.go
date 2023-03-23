package config

import (
	"bytes"
	"os"
	"testing"

	"github.com/sirupsen/logrus"
	"github.com/stretchr/testify/assert"
)

func TestSetupConfig(t *testing.T) {
	// Verify Config values are set
	envKey := "WEBSITE_PORT"
	configKey := "websitePort"
	oldValue := os.Getenv(envKey)
	newValue := "a fake port value"
	os.Setenv(envKey, newValue)

	setupConfig()
	assert.Equal(t, newValue, Config[configKey])

	// Verify Config logs error if a value is left blank
	oldOut := logrus.StandardLogger().Out
	buf := bytes.Buffer{}
	logrus.SetOutput(&buf)
	os.Setenv(envKey, "")

	setupConfig()
	assert.Contains(t, buf.String(), "level=error")
	assert.Contains(t, buf.String(), configKey)

	// Cleanup
	logrus.SetOutput(oldOut)
	os.Setenv(envKey, oldValue)
}

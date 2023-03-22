package config

import (
	"bytes"
	"os"
	"testing"

	log "github.com/sirupsen/logrus"
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
	assert.Equal(t, Config[configKey], newValue)

	// Verify Config logs error if a value is left blank
	oldOut := log.StandardLogger().Out // Save current log target
	buf := bytes.Buffer{}
	log.SetOutput(&buf)
	os.Setenv(envKey, "")

	setupConfig()
	assert.Contains(t, buf.String(), "level=error")
	assert.Contains(t, buf.String(), configKey)

	// Cleanup
	log.SetOutput(oldOut) // Restore log target
	os.Setenv(envKey, oldValue)
}

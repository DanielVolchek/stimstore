package main

import (
	// std

	// internal
	"github.com/danielvolchek/stim-db/pkg/args"
	"github.com/danielvolchek/stim-db/pkg/db"
	"github.com/danielvolchek/stim-db/pkg/router"
	// external
)

// corresponds to everything in .env_example
// make sure when updating .env to update here and in func loadEnvVars

func main() {
	// start by connecting to db inside of env
	envArgs := args.EnvArgs
	cmdArgs := args.CmdArgs

	if cmdArgs.Migrate {
		db.MigrateDB()
		return
	}

	if cmdArgs.Auth {
		db.GenerateServerAuthToken()
		return
	}

	router.StartHttpClient(envArgs.PORT)

}

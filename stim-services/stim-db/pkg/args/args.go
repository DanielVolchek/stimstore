package args

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type EnvArgsType struct {
	DB_URL               string
	SUPABASE_SERVICE_KEY string
	PORT                 string
}

type CmdArgType struct {
	Migrate bool
	Auth    bool
}

func loadEnvVars() EnvArgsType {
	envArgs := EnvArgsType{}

	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Error; unable to load .env file:", err)
		os.Exit(1)
	}

	envArgs.DB_URL = os.Getenv("DB_URL")
	envArgs.SUPABASE_SERVICE_KEY = os.Getenv("SUPABASE_SERVICE_KEY")
	envArgs.PORT = os.Getenv("PORT")

	if envArgs.DB_URL == "" {
		log.Fatal("DB_URL not found in .env")
	}

	if envArgs.SUPABASE_SERVICE_KEY == "" {
		log.Fatal("SUPABASE_SERVICE_KEY not found in .env")
	}

	return envArgs
}

func loadCmdArgs() CmdArgType {

	args := CmdArgType{}

	if len(os.Args) > 1 {
		for _, arg := range os.Args[1:] {

			if arg == "--migrate" {
				args.Migrate = true
			}

			if arg == "--auth" {
				args.Auth = true
			}
		}

	}

	return args
}

var CmdArgs CmdArgType = loadCmdArgs()
var EnvArgs EnvArgsType = loadEnvVars()

package db

import (
	"log"

	"github.com/danielvolchek/stim-db/pkg/args"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB_CONN = ConnectDB(args.EnvArgs)

func ConnectDB(argList args.EnvArgsType) *gorm.DB {
	db, err := gorm.Open(postgres.Open(argList.DB_URL), &gorm.Config{})

	if err != nil {
		log.Print("Failed to instantiate DB: ")
		log.Fatal(err)
	}

	return db
}

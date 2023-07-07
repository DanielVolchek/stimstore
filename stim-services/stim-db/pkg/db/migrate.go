package db

import (
	"log"
)

func MigrateDB() {

	// This will probably error but only because type already exists
	DB_CONN.Exec("CREATE TYPE role_enum AS ENUM ('USER', 'ADMIN')")

	err := DB_CONN.AutoMigrate(
		&User{},
		&Session{},
		&Item{},
		&RentEvent{},
		&Image{},
		&ServerAuthToken{},
	)

	if err != nil {
		log.Fatal(err)
	}

}

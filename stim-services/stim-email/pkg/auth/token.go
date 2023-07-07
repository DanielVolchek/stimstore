package auth

import (
	"fmt"
	"log"
	"net/http"
)

// make a request to db-server to check if my provided token is valid

const Base = "http://localhost:8080"

func ValidateToken(token string) {
	res, err := http.Get(fmt.Sprintf("%s/admin/servertoken?token=%s", Base, token))

	if err != nil {
		log.Fatal(err)
	}

	status := res.StatusCode

	if status != 200 {
		log.Fatal("Server auth token is not valid, please regenerate in admin dashboard and provide to .env")
	}

}

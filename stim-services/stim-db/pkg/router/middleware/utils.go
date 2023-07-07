package middleware

import (
	"errors"
	"log"
	"net/http"

	"github.com/danielvolchek/stim-db/pkg/db"
)

func RespondUnauthorized(w http.ResponseWriter, err AuthError) {
	w.WriteHeader(http.StatusUnauthorized)
	log.Println("Error occurred: ", err.Error())

	response := "Unauthorized to access this resource"
	header := http.StatusUnauthorized
	if err.isAdminError {
		response = "Not an admin"
		header = http.StatusForbidden
	}

	w.WriteHeader(header)
	w.Write([]byte(response))
}

func AuthCore(session *http.Cookie, needsAdmin bool) error {

	err := session.Valid()

	if err != nil {
		// return err
	}

	user, err := db.AuthenticateUserBySession(session.String())

	if err != nil {
		return err
	}

	if needsAdmin && user.Role != "ADMIN" {
		return errors.New("User is unauthorized as an admin")
	}

	return nil
}

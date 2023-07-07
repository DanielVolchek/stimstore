package db

import (
	"fmt"
)

func ValidateServerToken(token string) error {
	var err error

	var result *ServerAuthToken = &ServerAuthToken{}

	fmt.Println(token)
	err = DB_CONN.Where(&ServerAuthToken{Token: token}).First(&result).Error

	return err
}

package db

import (
	"fmt"
	"log"
)

func RevokeServerAuthToken(token any) {

	var err error

	switch t := token.(type) {
	case string:
		err = DB_CONN.Delete(&ServerAuthToken{Token: t}).Error
	case ServerAuthToken:
		err = DB_CONN.Delete(&t).Error
	case *ServerAuthToken:
		err = DB_CONN.Delete(t).Error
	default:
		log.Fatal("typeof token must be string or ServerAuthToken")
	}

	if err != nil {
		log.Fatal(err)
	}

}

func RevokeAllTokens() {
	tokens := []*ServerAuthToken{}

	err := DB_CONN.Find(&tokens).Error

	if err != nil {
		log.Fatal(err)
	}

	for _, value := range tokens {
		fmt.Println("token is ", value.Token)
		RevokeServerAuthToken(value)
	}
}

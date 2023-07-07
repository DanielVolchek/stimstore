package db

import (
	"fmt"
	"log"
)

func GenerateServerAuthToken() {
	token := &ServerAuthToken{}

	err := DB_CONN.Create(&token).Error
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("New token is ")
	fmt.Println(token.Token)
}

func CreateNewUser(user *User) {
	err := DB_CONN.Create(user).Error
	if err != nil {
		log.Fatal(err)
	}
}

func CreateNewSessionOnUser(user *User) error {

	DB_CONN.Where(&User{Username: "daniel"}).First(user)

	fmt.Printf("%+v\n", user)

	return nil
}

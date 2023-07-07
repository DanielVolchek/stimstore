package main

import (
	"fmt"

	"github.com/danielvolchek/stim-core/pkg/server"
	"github.com/joho/godotenv"
)

func main() {

	fmt.Println("Hello, Stim-Core")

	godotenv.Load(".env")

	server.StartHttpServer()
}

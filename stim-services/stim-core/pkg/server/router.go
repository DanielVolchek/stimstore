package server

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"strconv"

	"github.com/danielvolchek/stim-core/pkg/server/routes"
	"github.com/danielvolchek/stim-utils/pkg/router"
)

var routeList []*router.Route = []*router.Route{
	&routes.IndexRoute,
}

func StartHttpServer() {
	PORT := os.Getenv("PORT")

	if PORT == "" {
		PORT = "8080"
	}

	// Make sure you add routes here
	handler := router.GetRouter(routeList)

	portNum, err := strconv.Atoi(PORT)

	if err != nil {
		log.Fatal(fmt.Sprintf("PORT must be a number, got %s instead\n", PORT))
	}

	portError := verifyPort(portNum)
	for portError != nil {
		portNum, err = strconv.Atoi(PORT)
		log.Printf("PORT %d is already listening, trying PORT %d", portNum, portNum+1)
		portNum++
		portError = verifyPort(portNum)
	}

	log.Printf("Starting server on PORT %d\n", portNum)
	err = http.ListenAndServe(fmt.Sprintf(":%d", portNum), handler)

	gracefulShutdown(err)
}

func verifyPort(PORT int) error {
	ln, err := net.Listen("tcp", fmt.Sprintf(":%d", PORT))

	if err == nil {
		defer ln.Close()
	}

	return err
}

func gracefulShutdown(err error) {
	// We may in the future need to do something before shutting down (or not shut down at all) after http server goes down
	// it could be logging the error to a tracker or other things
	// For now all we're going to do is log the error and shut down
	log.Fatal(err)
}

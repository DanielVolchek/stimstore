package router

import (
	"fmt"
	"log"
	"net/http"

	"github.com/danielvolchek/stim-db/pkg/router/routes"
)

type ExtendedResponseWriter struct {
	http.ResponseWriter
}

func (res *ExtendedResponseWriter) writeResponseWithCode(message string, statusCode int) error {

	res.WriteHeader(statusCode)
	res.Write([]byte(message))

	return nil
}

const (
	TokenNotProvided   string = "Token Not Provided"
	TokenNotAuthorized string = "Token Not Authorized"
)

func (res *ExtendedResponseWriter) tokenNotValid(reason string) {
	res.writeResponseWithCode(reason, http.StatusUnauthorized)
}

func handlerFunc(res http.ResponseWriter, req *http.Request) {
	extendedRes := &ExtendedResponseWriter{ResponseWriter: res}

	// check for authorization code passed by client
	auth := req.Header.Get("Bearer")
	if auth == "" {
		extendedRes.tokenNotValid(TokenNotProvided)
		return
	}

	// validate it in db
	///////
	valid := true

	if !valid {
		extendedRes.tokenNotValid("Token not provided")
		return
	}

}

func final(w http.ResponseWriter, r *http.Request) {
	log.Print("Executing finalHandler")
	w.Write([]byte("OK"))
}

func StartHttpClient(port string) {
	handler := http.NewServeMux()

	PORT := port

	if port == "" {
		PORT = "3000"
	}

	routes.Router(handler)
	fmt.Println("listening on ", PORT)
	err := http.ListenAndServe(":"+PORT, handler)

	if err != nil {
		log.Fatal(err)
	}
}

package routes

import (
	"fmt"
	"net/http"

	"github.com/danielvolchek/stim-db/pkg/db"
)

var ServerTokenRoute Route = Route{
	route:        "/admin/servertoken",
	finalHandler: http.HandlerFunc(ServerTokenFinalHandler),
	// middleware:   []Middleware{middleware.AdminMiddleware},
	// TODO
	middleware: nil,
}

func ServerTokenGetHandler(w http.ResponseWriter, r *http.Request) {
	token := r.URL.Query().Get("token")

	if token == "" || db.ValidateServerToken(token) != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Requires server token to be provided, generate on server"))
	}

	w.Write([]byte("Token authorized"))
}

func ServerTokenPostHandler(w http.ResponseWriter, r *http.Request) {
}

func ServerTokenFinalHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("handling request in server token")

	switch r.Method {
	case "GET":
		ServerTokenGetHandler(w, r)
	case "POST":
		ServerTokenPostHandler(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte(fmt.Sprintf("Method %s not allowed", r.Method)))
	}
}

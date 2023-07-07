package routes

import (
	"net/http"

	"github.com/danielvolchek/stim-db/pkg/router/middleware"
)

var userHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

	if r.Method != "GET" {
		w.WriteHeader(405)
		w.Write([]byte("Method " + r.Method + "not allowed"))
		return
	}

	w.Write([]byte("good job my friend it is nice to meet you!"))
})

var UserRoute = Route{"/user", userHandler, []Middleware{
	middleware.AdminMiddleware,
}}

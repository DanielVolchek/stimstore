package routes

import (
	"net/http"

	"github.com/danielvolchek/stim-utils/pkg/router"
)

var IndexRoute router.Route = router.Route{
	Route:        "/",
	FinalHandler: IndexHandler,
	Middleware:   nil,
}

var IndexHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Resource not found on server"))
	}

	w.Write([]byte("Hello, World!"))
})

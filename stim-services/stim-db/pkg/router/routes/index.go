package routes

import (
	"net/http"
)

type Middleware func(http.Handler) http.Handler

type Route struct {
	route        string
	finalHandler http.Handler
	// Middlewares are called in reverse order
	// (index[0](index[1](finalHandler)))
	middleware []Middleware
}

func (route *Route) ConstructRouteHandler(handler *http.ServeMux) {
	if len(route.middleware) > 0 {
		var handleFunc http.Handler = route.finalHandler

		// Apply middlewares in reverse order
		for i := 0; i < len(route.middleware); i++ {
			handleFunc = route.middleware[i](handleFunc)
		}

		handler.Handle(route.route, handleFunc)
	} else {
		handler.Handle(route.route, route.finalHandler)
	}
}

var IndexFinal = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	// all unknown server paths go here
	if r.URL.Path != "/" {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("404 not found"))
		return
	}

	w.Write([]byte("Hello from the index"))
})

var IndexRoute Route = Route{
	"/", IndexFinal, []Middleware{},
}

func Router(handler *http.ServeMux) {

	// routes := []*Route{&IndexRoute, &UserRoute}
	routes := []*Route{&IndexRoute, &ServerTokenRoute}

	// val := middleware.AuthMiddleware(IndexRoute)
	// handler.Handle("/")
	// handler.Handle(UserRoute.route, UserRoute.handler)
	for _, route := range routes {
		route.ConstructRouteHandler(handler)
	}
}

func handlerFunc(res http.ResponseWriter, req *http.Request) {
	// extendedRes := ExtendedResponseWriter{ResponseWriter: res}
}

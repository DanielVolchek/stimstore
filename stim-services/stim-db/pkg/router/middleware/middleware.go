package middleware

import (
	"fmt"
	"net/http"
)

type AuthError struct {
	error
	isAdminError bool
}

// not found wraps everything
func NotFoundMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(r.URL.Path)

		next.ServeHTTP(w, r)

		// if serveHTTP gets nothing this gets hit instead
		// w.WriteHeader(http.StatusNotFound)
		// fmt.Fprintf(w, "404 Page Not Found")
	})
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("requested route is", r.URL.RequestURI())

		session, err := r.Cookie("session")

		err = AuthCore(session, false)

		if err != nil {
			RespondUnauthorized(w, AuthError{err, false})
			return
		}

		next.ServeHTTP(w, r)
	})
}

func AdminMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		session, err := r.Cookie("session")

		err = AuthCore(session, true)

		if err != nil {
			RespondUnauthorized(w, AuthError{err, true})
			return
		}

		next.ServeHTTP(w, r)
	})
}

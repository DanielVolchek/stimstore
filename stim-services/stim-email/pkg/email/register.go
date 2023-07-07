package email

type RegisterData struct {
	Username string
	Link     string
}

var RegisterTemplate HTMLTemplate[RegisterData] = HTMLTemplate[RegisterData]{
	// file: assets/templates/register.html
	Name: "register",
}

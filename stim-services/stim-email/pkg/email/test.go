package email

type TestData struct {
	Name string
	Me   string
}

var TestTemplate HTMLTemplate[TestData] = HTMLTemplate[TestData]{
	// file: assets/templates/test.html
	Name: "test",
}

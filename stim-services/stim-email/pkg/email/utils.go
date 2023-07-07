package email

import (
	"bytes"
	"fmt"
	"html/template"
)

type TemplateWriter interface {
	WriteToTemplate() (*bytes.Buffer, error)
}

type HTMLTemplate[T interface{}] struct {
	Name string
	Data T
}

// template dir should be ROOT/assets/templates
func GetTemplate(name string) (*template.Template, error) {

	template, err := template.ParseFiles(fmt.Sprintf("assets/templates/%s.html", name))

	if err != nil {
		return nil, err
	}

	return template, nil
}

func (t *HTMLTemplate[T]) WriteToTemplate(data T) (*bytes.Buffer, error) {
	template, err := GetTemplate(t.Name)

	if err != nil {
		return nil, err
	}
	result := new(bytes.Buffer)

	template.Execute(result, data)

	return result, nil
}

func CreateTemplateTest() {
}

package com.kamal

class CustomTagLib {

    static namespace = "CustomTagLib"

    //Groovy Closure like Java Lambda Expression
    //http://www.hmtmcse.com/java/grails/tag-lib
    def renderErrorMessage = { attrs, body ->
        def model = attrs.model
        String fieldName = attrs.fieldName
        String errorMessage = attrs.errorMessage? g.message(code: attrs.errorMessage): g.message(code: "invalid.input")
        if (model && model.errors && model.errors.getFieldError(fieldName)){
            out << "<small class='form-text text-danger''><strong>${errorMessage}</strong></small>"
        }
    }

}

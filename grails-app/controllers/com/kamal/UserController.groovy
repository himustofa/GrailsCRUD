package com.kamal

class UserController {

    UserService userService

    def index() {
        def response = userService.getAllData(params)
        [userList: response.list, total: response.count]
    }

    //http://localhost:8080/user/saveData?firstName=Mustofa&lastName=Kamal&email=mk@gmail.com&password=123
    def saveData() {
        def response = userService.saveData(params)
        flash.redirectParams = response.model
        redirect(controller: "user", action: "index")
    }

    def getDataById() {
        def response = userService.getDataById(params.id)
        render response
    }

    def getAllData() {
        def response = userService.getAllData(params)
        def result = [userList: response.list, total: response.count]
        render result
        //redirect(controller: "user", action: "index")
    }

    def updateDataById() {
        def response = userService.updateDataById(params)
        render response
    }

    def deleteDataById() {
        def response = userService.deleteDataById(params)
        render response
    }

    /*def deleteDataById(Integer id) {
        def response = userService.deleteDataById(id)
        render response
    }*/

    def deleteAllData() {
        def response = userService.deleteAllData()
        render response

    }
}

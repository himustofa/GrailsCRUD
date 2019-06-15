package com.kamal

import grails.web.servlet.mvc.GrailsParameterMap
//import grails.gorm.transactions.Transactional

//@Transactional
class UserService {

    def saveData(GrailsParameterMap params) {
        User user = new User(params)
        def response = AppUtil.saveResponse(false, user)
        if (user.validate()) {
            user.save(flush: true)
            if (!user.hasErrors()){
                response.isSuccess = true
            }
        }
        return response
    }

    def getDataById(Serializable id) {
        return User.get(id)
    }

    def getAll(GrailsParameterMap params) {
        params.max = params.max ?: GlobalConfig.itemsPerPage()
        List<User> userList = User.createCriteria().list(params) {
            if (params?.colName && params?.colValue) {
                like(params.colName, "%" + params.colValue + "%")
            }
            if (!params.sort) {
                order("id", "desc")
            }
        }
        //return [list: userList, count: userList.totalCount]
        return [list: userList, count: User.count()]
    }

    //http://docs.grails.org/3.1.1/ref/Domain%20Classes/getAll.html
    def getAllData(GrailsParameterMap params) {
        List<User> userList = User.getAll()
        return [list: userList, count: User.count()]
    }

    def updateDataById(GrailsParameterMap params) {
        def user = User.get(params.id)
        user.properties = params
        def response = AppUtil.saveResponse(false, user)
        if (user.validate()) {
            user.save(flush: true)
            if (!user.hasErrors()){
                response.isSuccess = true
            }
        }
        return response
    }

    def deleteDataById(GrailsParameterMap params) {
        def user = User.get(params.id)
        try {
            user.delete(flush: true)
        } catch (Exception e) {
            println(e.getMessage())
            return false
        }
        return true
    }

    def deleteAllData() {
        try {
            User.findAll().each {
                it.delete(flush:true, failOnError:true)
            }
        } catch (Exception e) {
            println(e.getMessage())
            return false
        }
        return true
    }

    //At first initialized admin user data for logging as admin
    static initialize() {
        initUser()
    }
    private static initUser() {
        if (User.count() == 0) {
            User user = new User()
            user.firstName = "System"
            user.lastName = "Admin"
            user.email = "admin@admin.com"
            user.password = "admin"
            user.userType = GlobalConfig.USER_TYPE.ADMINISTRATOR
            user.save(flash: true)
        }
    }

}

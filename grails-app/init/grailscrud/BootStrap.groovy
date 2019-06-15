package grailscrud

import com.kamal.UserService

class BootStrap {

    //At first initialized admin user data for logging as admin
    def init = { servletContext ->
        UserService.initialize()
    }

    def destroy = {
    }
}

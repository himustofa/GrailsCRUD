<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>
        <g:layoutTitle default="Grails"/>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>

    %{--<!-- Bootstrap | jQuery -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <!-- DataTables -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.css"/>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.js"></script>
    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/1d5678ce2f.js"></script>
    <!-- jQuery iziModal -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/izimodal/1.5.1/css/iziModal.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/izimodal/1.5.1/js/iziModal.min.js"></script>--}%

    <asset:stylesheet src="bootstrap.min.css"/>
    <asset:javascript src="jquery.min.js"/>
    <asset:javascript src="popper.min.js"/>
    <asset:javascript src="bootstrap.min.js"/>
    <asset:stylesheet src="datatables.min.css"/>
    <asset:javascript src="datatables.min.js"/>
    <asset:javascript src="fontawesome.kit.js"/>
    <asset:stylesheet src="iziModal.min.css"/>
    <asset:javascript src="iziModal.min.js"/>
    <asset:javascript src="sweetalert.js"/>
    <asset:stylesheet src="sweetalert.css"/>

    %{--<asset:stylesheet src="application.css"/>
    <asset:javascript src="application.js"/>--}%

    <g:layoutHead/>
</head>

<body>

<!-- ================== Toolbar ================== -->
<nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <a class="navbar-brand" href="https://www.facebook.com/hikamal" data-toggle="tooltip" data-placement="bottom" title="Created by kamal"><asset:image width="" height="30" src="company-logo.png" /></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="nav navbar-nav">
            %{--<li class="nav-item"><a class="nav-link" href="#">Link</a></li>--}%
        </ul>
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a href="#" data-toggle="tooltip" data-placement="bottom" title="Log Out"><i class="fas fa-sign-out-alt"></i></a>
            </li>
        </ul>
    </div>
</nav>


<!-- ================== Body ================== -->
<div class="container">
    <g:layoutBody/>
</div>



<!-- ================== Footer ================== -->
<footer class="container-fluid text-center">
    <p>Courtesy by Mustofa Kamal</p>
    <p>AngularJS | FontAwesome | Bootstrap | jQuery | DataTables | SweetAlert</p>
</footer>




<style type="text/css" media="screen">
/*=========== Toolbar/Navbar | Remove the navbar's default margin-bottom and rounded borders ===========*/
.navbar {
    background-color: #383838;
    margin-bottom: 0;
    border-radius: 0;
    padding: 20px;
    margin: 0px 0px 20px 0px;
}
.navbar-inverse .navbar-toggle {
    border-color: white;
}
/*=========== Footer ===========*/
footer {
    /*position: fixed;
    bottom: 0px;
    width: 100%;*/
    background-color: #383838;
    color: white;
    padding: 20px;
    margin: 50px 0px 0px 0px;
}
footer p{
    font-family: Verdana,sans-serif;
    font-size: 12px;
    color:#9d9d9d;
}
</style>

</body>
</html>

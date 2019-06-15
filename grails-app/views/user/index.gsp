%{--Include Main Layout--}%
<meta name="layout" content="main"/>


<div>

    <div class="page-header">
        <h1>Maintain</h1>
    </div>

    <!-- Add Button -->
    <button type="button" class="btn-user-modal btn btn-default btn-add"><i class="fas fa-plus"></i> Add</button>
    <br/>
    <br/>

    <!-- ==============================================[ User ]============================================== -->
    <div class="row">

        <div class="col-md-12">
            <div class="table-responsive">

                <table data-order='[[ 2, "desc" ]]' class="table table-bordered" id="UserTable">
                    <thead>
                    <tr style="background:#f1f1f1;">
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>E-Mail</th>
                        <th data-orderable="false">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    <g:each in="${userList}" var="data">
                        <tr>
                            <td>${data?.firstName}</td>
                            <td>${data?.lastName}</td>
                            <td>${data?.email}</td>
                            <td>
                                <input name="id" type="hidden" class="id" value="${data?.id}" />
                                <input name="firstName" type="hidden" class="firstName" value="${data?.firstName}" />
                                <input name="lastName" type="hidden" class="lastName" value="${data?.lastName}" />
                                <input name="email" type="hidden" class="email" value="${data?.email}" />
                                <input name="password" type="hidden" class="password" value="${data?.password}" />

                                <button type="button" onclick="editRow(this)" class="btn btn-default btn-sm btn-edit"><i class="far fa-edit"></i></button>
                                <button type="button" onclick="delRow(this)" class="btn btn-default btn-sm btn-del"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </g:each>

                    </tbody>
                </table>
            </div>
        </div>

    </div>

</div>




%{--<g:form controller="member" action="save">
--}%%{--Partial Templating--}%%{--
    <g:render template="form"/>
    <div class="form-action-panel">
        <g:submitButton class="btn btn-primary" name="save" value="${g.message(code: "save")}"/>
        <g:link controller="member" action="index" class="btn btn-primary"><g:message code="cancel"/></g:link>
    </div>
</g:form>--}%

<!-- ================== Modal ================== -->

<div id="modal-user" data-izimodal-group="" data-izimodal-loop="" data-izimodal-title="User" data-izimodal-subtitle="Create a new user">
    <div style="padding:15px;">

        <g:form id="eventForm" name="eventForm">
            <div id="alert_result"></div>
            <g:render template="form"/>
            <button type="button" id="update" name="update" class="btn-update button-modify" style="margin-bottom:15px;">Update</button>
            <button type="button" id="save" name="save" class="btn-save button-modify" style="margin-bottom:15px;">Save</button>
        </g:form>

    </div>
</div>

%{--url: "${g.createLink( controller: 'user', action:'saveData')}"--}%

<script>

    // ==================== jQuery Ajax ====================
    //https://stackoverflow.com/questions/43525751/grails-how-to-use-jquery-ajax-to-send-data-to-controller/43526888
    //https://stackoverflow.com/questions/38848544/grails-post-data-via-jquery-ajax
    function ajaxFunction(action) {
        $.ajax( {
            url: "/user/"+action,
            type: "post",
            data:  $( '#eventForm' ).serialize(), //dataType: 'json',
            success: function(data) {
                //var obj = (data['user'])['model'];
                //console.log(JSON.stringify(obj))
                console.log(JSON.stringify(data))
                $( "#alert_result" ).addClass( 'alert alert-success' ).append( 'Successfully saved event')
                savedFunction()
            },
            error: function(xhr) {
                $( "#alert_result" ).addClass( 'alert alert-danger' ).append( 'Error saving event' )
            }
        } );
    }

    // ==================== Sweet Alert ====================
    function savedFunction() {
        swal({
            title: "Saved",
            text: "Successfully Saved",
            type: "success",
            confirmButtonText: "Ok",
            closeOnConfirm: false
        },function(){
            $('#modal-user').iziModal('close');
            location.reload()
            //swal("Deleted!", "This record is deleted.", "success");
        });
    };

    //Tooltips
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });

    // ==================== DataTable ====================
    $(document).ready(function() {
        $('#UserTable').DataTable({
            "oLanguage" : {
                "sLengthMenu": 'Show <select>'+
                    '<option value="5">5</option>'+
                    '<option value="10">10</option>'+
                    '<option value="20">20</option>'+
                    '<option value="50">50</option>'+
                    '<option value="100">100</option>'+
                    '<option value="-1">All</option>'+
                    '</select> rows',
                "pageLength" : 5,
                "sSearch" : "",
                "sSearchWidth" : "300px",
                "sSearchPlaceholder": "Search records ....",
                "oPaginate" : {
                    "sPrevious" : "<i class='fas fa-chevron-left'></i>",
                    "sNext" : "<i class='fas fa-chevron-right'></i>"
                },
            },
        });
    });

    // ==================== Add Row ====================
    $(document).on('click', '.btn-user-modal', function(event) {
        event.preventDefault();
        $("tr").removeClass("current-row");

        $("#modal-user :input").val("");
        //$("#password").attr('type','password');
        $("#password").show();
        $('#update').hide();
        $('#save').show();

        //Disable enter button
        $('html').bind('keypress', function(e) {
            if (e.keyCode == 13) {
                return false;
            }
        });

        $('#modal-user').iziModal('open');
    });
    //Add iziModal
    $('#modal-user').iziModal({
        headerColor: '#383838', //Header color 00AF66
        width: '50%', //Width
        overlayColor: 'rgba(0, 0, 0, 0.5)', //Modal background color
        fullscreen: true, //full screen
        transitionIn: 'comingIn', //Animation when displayed |  comingIn, bounceInDown, bounceInUp, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX.
        transitionOut: 'flipOutX', //Animation when hidden | comingOut, bounceOutDown, bounceOutUp, fadeOutDown, fadeOutUp, , fadeOutLeft, fadeOutRight, flipOutX.
        //timeout: 10000, //Hidden in 10 seconds
        pauseOnHover: true,　//Countdown stop with mouse over
        timeoutProgressbar: true, //Progress bar display
    });
    $( document ).ready( function() {
        $( "#save" ).click( function ( event ){
            ajaxFunction('saveData');
        });
    });




    // ==================== Edit Row ====================
    function editRow(el) {
        var currentRow = $(el).closest("tr");
        $("tr").removeClass("current-row");
        currentRow.addClass("current-row");

        //$("#modal_degree").addClass("required");
        //$("#password").attr('type','hidden');
        $("#password").hide();
        $('#update').show();
        $('#save').hide();

        $("#id").val(currentRow.find(".id").val());
        $("#firstName").val(currentRow.find(".firstName").val());
        $("#lastName").val(currentRow.find(".lastName").val());
        $("#email").val(currentRow.find(".email").val());
        $("#password").val(currentRow.find(".password").val());

        $("#modal-user .alert").addClass("hidden"); //Hide the modal alert when the edit modal appears
        $('#modal-user').iziModal('open');
    }
    $( document ).ready( function() {
        $( "#update" ).click( function ( event ){
            ajaxFunction('updateDataById');
        });
    });

    // ==================== Delete Button ====================
    var delRow = function(el) {
        swal({
            title: "Are you sure?",
            text: "Are you sure to delete this record?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        },function(){
            $.ajax({
                url: "/user/deleteDataById?id=" + $(el).closest("tr").find(".id").val(),
                success:function(data){}
            });
            //$.get(URL,callback);
            //$.post(URL,data,callback);
            var table = $("#UserTable").DataTable();
            table.row($(el).closest("tr")).remove().draw(); //OR $(el).closest('tr').remove(); //Remove row after deleted
            swal("Deleted!", "This record is deleted.", "success");
        });
    };

</script>

<style type="text/css" media="screen">
/*=========== Modify Button ===========*/
.button-modify {
    display: inline-block;
    margin: 0px 0px 0px 0px;
    padding: 8px 20px;
    background-color:#fff;
    border:1px #333 solid;
    font-size:14px;
    color:#333;
    float: right;
}
.button-modify:hover {
    color: #FFFFFF; /*3c763d*/
    background-color: #808080; /*dff0d8*/
    border-color: #383838; /*00AF66*/
}

/*=========== Edit & Delete Button ===========*/
.btn-add, .btn-edit, .btn-del {
    font-size:14px;
    background-color:#383838;
    color:white;
    border-radius: 0px !important;
}

/*=========== Yes & No Button ===========*/
.btn-yes, .btn-no {
    display: inline-block;
    padding: 8px 20px;
    margin-left:15px;
    background-color:#D43838;
    border:1px #ebccd1 solid;
    font-size:14px;
    color:#ebccd1;
    float: right;
}
.btn-yes:hover, .btn-no:hover {
    color: #D43838; /*3c763d*/
    background-color: #ebccd1; /*dff0d8*/
    border-color: #D43838; /*00AF66*/
}

/*=========== Delete Icon ===========*/
.glyphicon-file {
    font-size:35px;
    color:#D43838
}

/*=========== Input Field ===========*/
.form-control {
    border-radius: 0px !important;
}

.requiredsign {
    border-left: 3px solid #eb270d; /* red */
}
</style>
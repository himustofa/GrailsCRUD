var modalUrl = "";
var mainContentUrl = "";
var mainContentReqTime  = new Date().getTime();
$.mask.definitions["9"] = null;
$.mask.definitions["#"] = "[0-9]";
var isDirty = false;

function ShowModal(url, sizeClass, idClass)
{
	if (!sizeClass) {
		sizeClass = 'modal-md';
	}
	if (!idClass) {
		idClass = 'search-modal';
	}

	$("." + idClass).find('.modal-body').html('Loading...');
	if ($("." + idClass).length == 0 ) {
		var html = '';
		html += '<div class="modal fade ' + idClass + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">';
		html += '	<div class="modal-dialog ' + sizeClass + '">';
		html += '		<div class="modal-content">';
		html += '			<div class="modal-header">';
		html += '				<button type="button" class="close text-red" data-dismiss="modal" aria-label="Close">';
		html += '					<span aria-hidden="true">x</span>';
		html += '				</button>';
		html += '				<h4 class="modal-title"></h4>';
		html += '			</div>';
		html += '			<div class="modal-body"></div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$('body').append(html);
	}
	$("." + idClass).find('.modal-body').load(url, function(){
		var title = $("." + idClass + " .modal-body .mainTitle").text();
		$("." + idClass + " .modal-body #page-title").hide();
		$("." + idClass + " .modal-title").text(title);
		$("." + idClass).modal();
		$(".modal-backdrop.fade.in").off("click");
		$(".modal").off("keydown");
	});
	$('.modal-dialog').draggable({handle: ".modal-header"});
	modalUrl = url;
}

function ModalFromHtml(title, body, sizeClass, idClass)
{
	if (!sizeClass) {
		sizeClass = 'modal-md';
	}
	if (!idClass) {
		idClass = 'search-modal';
	}

	$("." + idClass).find('.modal-body').html('Loading...');
	if ($("." + idClass).length == 0 ) {
		var html = '';
		html += '<div class="modal fade ' + idClass + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">';
		html += '	<div class="modal-dialog ' + sizeClass + '">';
		html += '		<div class="modal-content">';
		html += '			<div class="modal-header">';
		html += '				<button type="button" class="close text-red" data-dismiss="modal" aria-label="Close">';
		html += '					<span aria-hidden="true">x</span>';
		html += '				</button>';
		html += '				<h4 class="modal-title"></h4>';
		html += '			</div>';
		html += '			<div class="modal-body">' + body + '</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$('body').append(html);
	}

	$("." + idClass + " .modal-title").text(title);
	$("." + idClass).modal();
	$(".modal-backdrop.fade.in").off("click");
	$(".modal").off("keydown");
}

function ShowDependency(url, sizeClass, idClass, errorList, objectCode)
{
	if (!sizeClass) {
		sizeClass = 'modal-md';
	}
	if (!idClass) {
		idClass = 'search-modal';
	}
	
	if (!errorList) {
		errorList = [];
	}
	if (!objectCode) {
		objectCode = "";
	}

	$("." + idClass).find('.modal-body').html('Loading...');
	if ($("." + idClass).length == 0 ) {
		var html = '';
		html += '<div class="modal fade ' + idClass + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="padding:35px 50px;">';
		html += '	<div class="modal-dialog ' + sizeClass + '">';
		html += '		<div class="modal-content" style="background-color: #5cb85c">';
		html += '			<div class="modal-header" style="background-color: #efefef">';
		html += '				<button type="button" class="close text-red" data-dismiss="modal" aria-label="Close">';
		html += '					<span aria-hidden="true">x</span>';
		html += '				</button>';
		html += '				<h4 class="modal-title"></h4>';
		html += '			</div>';
		html += '			<div class="modal-body" style="background-color: #fff"></div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$('body').append(html);
	}

	$("." + idClass).find('.modal-body').load(url, function(){
		var title = $("." + idClass + " .modal-body .mainTitle").text()+" : "+objectCode;
		$("." + idClass + " .modal-body #page-title").hide();
		$("." + idClass + " .modal-title").text(title);
		$("." + idClass).modal();
		var liHtml = '<ul>';
		for (var i = 0; i < errorList.length; i++) {
			liHtml +='<li>'+errorList[i]+'</li>';
		}
		liHtml +='</ul>';
		$("." + idClass).find('.modal-body').find(".show-list").append(liHtml);
		$(".modal-backdrop.fade.in").off("click");
		$(".modal").off("keydown");
		$("." + idClass).find('.modal-body').find("h4").closest("li").addClass("active").css({"list-style": "none", "margin-left": "-25px"});
		$("." + idClass).find('.modal-body').find("h4").text($("." + idClass).find('.modal-body').find("h4").text()+" :");
	});

	modalUrl = url;
}

function SyncOptionText(selector){

	if (!selector) {
		selector = ".main-content"
	}

	$(selector).find("select.sync-option-text").each(function(i, item){
	    var target = $(item).next("input[type='hidden']");
	    target.val($(item).find("option:selected").text());
	});
}

function compareWithAlertMessage(el,html){
	var result = false;
	$(".alert li").each(function(i,item){
		if($(item).html().indexOf(el) !== -1){
			result = true;
			return false;
		}
	});
	
	if(result){
		return true;
	}
	else{
		return false;
	}
	
	
}


function selectAlert(selector,result,html){
	if($(selector).closest('.modal').is(':visible')){
		if(!result){
			$(".modal .alert").html(html);
		}
		$(".modal .alert").removeClass("hidden");
	}

	else{
		if(!result){
			$(selector).closest(".main-content").find(".alert").html(html);
		}

		$(".alert").removeClass("hidden");
	}
}

function showErrorMessage(selector){
	var error = "";
	var html = "";
	
	if(Array.isArray(selector)){
		
		for(var i = 0; i < selector.length; i++){
			var result = false;
			html += '<li class=field_'+selector[i].key+'>' +
						selector[i].value +
					' empty is not allowed </li>';	
			//$('.alert').html(html);
			selectAlert('#'+selector[i].key,result,html);
		}

	}
	

	else{
			html = $(".alert").html();
	
			if($(selector).closest(".form-group").find("input").attr("class").indexOf("character") != -1){
				
				var msg = getLableName($(selector).closest(".form-group").find('label').html()) + ' should not contain any special character or number.';
				
				var result = compareWithAlertMessage(msg,html);

				if(!result){
					html += '<li class=field_'+$(selector).closest(".form-group").find("input").attr("id")+'>' + msg + '</li>';
				}
				
				selectAlert(selector,result,html);

			}
			
			if($(selector).closest(".form-group").find("input").attr("class").indexOf("email") != -1){
				
				var msg = getLableName($(selector).closest(".form-group").find('label').html()) + ' like abc@cts.com.';
					
				html += '<li class=field_'+$(selector).closest(".form-group").find("input").attr("id")+'>' + msg +'</li>';
				
				var result = compareWithAlertMessage(msg,html);
				
				selectAlert(selector,result,html);
			}
			
			if($(selector).closest(".form-group").find("input").attr("class").indexOf("number") != -1){
				
				var msg  = getLableName($(selector).closest(".form-group").find('label').html());
				html += '<li class=field_'+$(selector).closest(".form-group").find("input").attr("id")+'>' +
							 msg +
							' must be number.</li>';
			    
				var result = compareWithAlertMessage(msg,html);
				
				selectAlert(selector,result,html);
			}
				
			
			if($(selector).closest(".form-group").find("input").attr("class").indexOf("alpha-numeric") != -1){

				$(selector).closest(".form-group").find("input").removeClass("alpha-numeric-linked");
				$(".alert").addClass("hidden");
				
				var msg = getLableName($(selector).closest(".form-group").find('label').html()) +
							' must be alphalphanumeric.';
		
				html +=	'<li class=field_'+$(selector).closest(".form-group").find("input").attr("id")+'>' + msg +'</li>';
	 
	
				var result = compareWithAlertMessage(msg,html);
								
				selectAlert(selector,result,html);

			}
			
			if($(selector).closest(".form-group").find("input").attr("class").indexOf("alphanumeric-space") != -1){

				$(selector).closest(".form-group").find("input").removeClass("alphanumeric-space-linked");
				$(".alert").addClass("hidden");
				
				var msg = getLableName($(selector).closest(".form-group").find('label').html()) + ' should not contain any special character or number.';
				
				var result = compareWithAlertMessage(msg,html);

				if(!result){
					html += '<li class=field_'+$(selector).closest(".form-group").find("input").attr("id")+'>' + msg + '</li>';
				}
				
				selectAlert(selector,result,html);

			}
					

			//$(selector).addClass("error");	
	}
	
}

function CheckRequired(selector){
	result = true;
	var arr = [], str; 
	var dict = [];
	if (!selector) {
		selector = ".main-content"
	}
	$(selector).find("input.required, textarea.required").each(function(i, item){
		$(this).removeClass("error");
		MarkCross($(this).closest(".form-group").find("label"), false);
		if ($(item).val().trim() == "") {
			result = false;
			dict.push({
			    key:   $(item).attr("id"),
			    value: getLableName($(this).closest(".form-group").find('label').html())
			});
			
			showErrorMessage(dict);
			
			$(this).addClass("error");
			MarkCross($(this).closest(".form-group").find("label"), true);
		}
	});
	
	$(selector).find("select.required").each(function(i, item){
		$(this).removeClass("error");
		MarkCross($(this).closest(".form-group").find("label"), false);
		if ($(item).val().trim() == "" || $(item).val().trim() == "-1") {
			result = false;
			arr.push(getLableName($(this).closest(".form-group").find('label').html()));
			str = arr.join(',');
			
			dict.push({
			    key:   $(item).attr("id"),
			    value: getLableName($(this).closest(".form-group").find('label').html())
			});
			
			showErrorMessage(dict);
			
			$(this).addClass("error");
			MarkCross($(this).closest(".form-group").find("label"), true);
		}
	});
	
	return result;
}


function MarkCross(selector, invalid){
	$(selector).find("span").remove();

	if (invalid) {
		$(selector).append('<span>&nbsp;&nbsp;</span><span class="text-red fa fa-close"></span>');
	}
	else{
		$(selector).append('<span>&nbsp;&nbsp;</span><span class="text-green fa fa-check"></span>');
	}
}



function FocusError(){
	var firstErrorEl = $($(".error")[0]);
	if(firstErrorEl.length > 0){
		firstErrorEl.focus();
		$().animate({
		    scrollTop: (firstErrorEl.offset().top)
		},500);
	}
}

function FocusElement(element){
	$().animate({
	    scrollTop: ($(element).offset().top)
	},100);
	$(element).focus();
}


function InitErrorChange(){
	
	$(".errorcheck,.character,textarea.required,.email,.alpha-numeric,.alphanumeric-space,.number,.required:not(.errorchange-linked)").on("change", function(){
		$(this).closest(".form-group").find("label").find("span").remove();
		if($(this).val()){
			MarkCross($(this).closest(".form-group").find("label"), false);
			$(this).closest(".container-fullw").find("li.field_"+$(this).attr("id")).remove();
			
			var length = $(this).closest(".container-fullw").find(".alert li").size();

			if(length == 0){
				$(this).closest(".form-group").closest(".container-fullw").find(".alert").addClass("hidden");
			}

			$(this).closest(".form-group").closest(".modal-container-fullw").find(".modal-alert").addClass("hidden");
		
			//$(this).closest(".form-group").find("label").append('<span>&nbsp;&nbsp;</span><span class="text-green fa fa-check"></span>');
			//
		}
		else{	
			MarkCross($(this).closest(".form-group").find("label"), true);
			showErrorMessage($(this));			
			$(this).closest(".form-group").closest(".modal-container-fullw").find(".modal-alert").removeClass("hidden");
			//$(this).closest(".container-fullw").find(".alert").removeClass("hidden");
			//$(this).closest(".form-group").find("label").append('<span>&nbsp;&nbsp;</span><span class="text-red fa fa-close"></span>');
		}
	}).addClass("errorchange-linked");
}


function ResetErrorChange(){
	$(".errorchange-linked").off("change").removeClass(".errorchange-linked");
}

function ResetInputs(selector){
	if (!selector) {
		selector = ".main-content"
	}

	$(selector).find("input[type='text']").val("");
	$(selector).find("input[type='hidden']").val("");
	$(selector).find("input[type='number']").val("0");
	$(selector).find("input[type='checkbox']").removeProp("checked");
	$(selector).find("textarea").val("");
	$(selector).find("select").val("");
	$(selector).find(".control-label span").remove();
}

function HideModal(idClass)
{
	$("." + idClass).modal("hide");
	$("." + idClass).find('.modal-body').html("");
}

function GetInput(callback)
{
	if ($(".input-modal").length == 0 ) {
		var html = '';
		html += '<div class="modal fade input-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">';
		html += '	<div class="modal-dialog modal-sm">';
		html += '		<div class="modal-content">';
		html += '			<div class="modal-body">';
		html += '				<input type="text" id="modal_input" />';
		html += '				<button class="btn btn-cancel">Cancel</button>';
		html += '				<button class="btn btn-ok">Ok</button>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</div>';
		$("body").append(html);
		$(".btn-ok").on("click", function(){
			callback($("#modal_input").val());
		});
	}
	$('.input-modal').modal();
}

function ShowSuccessMsg(title, msg)
{
	swal({
		title: title,
		text: msg,
		type: "success",
		confirmButtonColor: "#007AFF"
	});

}

function ShowErrorMsg(title, msg)
{
	swal({
		title: title,
		text: msg,
		type: "error",
		confirmButtonColor: "#007AFF"
	}, function(){
		  swal("Deleted!", "Your imaginary file has been deleted.", "success");
	});

}

function ShowErrorDependency(title, msg, errorList, objectCode)
{
	swal({
		title: title,	//Can't Delete
		type: "info",
		text: msg, 		// This Object is used in some others Entities
		html: true,
		showCancelButton: true,
		confirmButtonColor: "#007AFF",
		confirmButtonText: "Show List",		//Show List
		closeOnConfirm: true,
		allowOutsideClick: false
	}, function(){
		ShowDependency("/showdependency", "modal-md", "list-modal", errorList, objectCode);
	});
}

function LoadMainContent(url){
	mainContentReqTime  = new Date().getTime();
	var navigateAway = function(){
		mainContentUrl = url;
		$.ajax({
	        url: url,
	        success:function( response, status, xhr ) { 
	        	if(response.indexOf("<!DOCTYPE html>") != -1){
	        		window.location = url;
	        	}
	        	else{	        		
	   /*
	 	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	        						AUTO SCROLL STOP ON PAGE LOAD
	   	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	    */	        				        		
	        		$('.main-content').html(response);
//		    		$('.main-content').hide().html(response).fadeIn(500, function(){
//		    			ScrollToTop();
//		    		});
	        	}
	        	
	    	}
	    });
		isDirty = false;
	};
	if(	isDirty ){
		swal({
			title: "Discard changes?",
			text: "Are you sure to navigate away?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#007AFF",
			confirmButtonText: "Yes, discard changes!",
			closeOnConfirm: true
		}, navigateAway);
	}
	else{
		navigateAway();
	}
	
}


function CheckCharacter(){
	$.each($('input.character:not(.character-linked)'), function(i, item){ 
		$(item).on("keydown", function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 12, 16, 20, 27, 32, 13, 110, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        
	        // Ensure that it is a character and stop the keypress
	        if (e.keyCode > 31 && ((e.keyCode < 97 || e.keyCode > 122)) && (e.keyCode < 65 || e.keyCode > 90) && (e.keyCode != 32 && e.keyCode != 0)) {
              	var lableName = getLableName($(item).closest(".form-group").find('label').html());	
		    	showErrorMessage($(item).closest(".form-group").find('label'));
	            e.preventDefault();
	        }

		}).on("focusout", function() {
			setTimeout(function()
				       { 
				          //get the value of the input text
				          var data= $(item).val() ;
				          for(i=0;i<data.length;i++){
				        	 var code = data.charCodeAt(i);
				  	        if ((code < 97 || code > 122) && (code < 65 || code > 90) && (code != 32 && code != 0) && code !=46) {
				  	        	showErrorMessage($(item).closest(".form-group").find('label'));
					        }
				          }
				       });
			}).addClass("character-linked");
	});
}


function CheckAlphanumeric(){
	$.each($('input.alpha-numeric:not(.alpha-numeric-linked)'), function(i, item){ 
		$(item).on("keydown", function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 16, 20, 27, 13, 110, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 97 || e.keyCode > 122)) && (e.keyCode < 65 || e.keyCode > 90) &&
	        		(e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        	showErrorMessage($(item).closest(".form-group").find('label'));
	            e.preventDefault();
	        }
		
		}).on("focusout", function() {
			setTimeout(function()
				       { 
				          //get the value of the input text
				          var data= $(item).val() ;
				          for(i=0;i<data.length;i++){
				        	 var code = data.charCodeAt(i);
				  	        if ((code < 65 || code > 90) && (code < 97 || code > 122) && (code < 48 || code > 57) && (code < 96 || code > 105) && code !=46) {
				  	        	showErrorMessage($(item).closest(".form-group").find('label'));
				  	        	
					        }
				          }
				       });
			});
	}).addClass("alpha-numeric-linked");
	
}


function CheckAlphanumericWithSpace(){
	$.each($('input.alphanumeric-space:not(.alphanumeric-space-linked)'), function(i, item){ 
		$(item).on("keydown", function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 16, 20, 27, 13, 110, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 97 || e.keyCode > 122)) && (e.keyCode < 65 || e.keyCode > 90) && 
	        		(e.keyCode != 32 && e.keyCode != 0) &&
	        		(e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	        	showErrorMessage($(item).closest(".form-group").find('label'));
	            e.preventDefault();
	        }
		
		}).on("focusout", function() {
			setTimeout(function()
				       { 
				          //get the value of the input text
				          var data= $(item).val() ;
				          for(i=0;i<data.length;i++){
				        	 var code = data.charCodeAt(i);
				  	        if ((code < 65 || code > 90) && (code < 97 || code > 122) && (code < 48 || code > 57) && (code < 96 || code > 105) && (code != 32 && code != 46)) {
				  	        	showErrorMessage($(item).closest(".form-group").find('label'));
				  	        	
					        }
				          }
				       });
			});
	}).addClass("alphanumeric-space-linked");
	
}

function CheckEmail(){
	$.each($('input.email:not(.email-linked)'), function(i, item){ 
		$(item).on("focusout", function() {
			var regex    = 	new RegExp("^[A-Za-z][_A-Za-z0-9-]*(\\.[_A-Za-z0-9-]+)*@[A-Za-z][_A-Za-z0-9-]*\\.[A-Za-z0-9]{2,6}$");
			var isValidEmail 	 = regex.test($(item).val());
			
			if($(item).val() !=""){
		        if (!isValidEmail) {
		        	showErrorMessage($(item).closest(".form-group").find('label'));
		        }
			}
		}).addClass("email-linked");
	});
}

function InitHandlers(){
	$(".dirty-check:not(.dirty-check-linked)").on("change", function(){
		isDirty = true;
	}).addClass("dirty-check-linked");
	
	//Remove space from after and before of a text and remove double space from text.
	$('input[type="text"], textarea[type="text"]').on("change", function(){
		var str = $(this).val();
	    var result = str.replace(/  +/g, ' ').trim();
	    $(this).val(result);
	});
	
	$("a[data-ajax=true]:not(.linked), button[data-ajax=true]:not(.linked)").on('click', function (event) {
		event.preventDefault();
		if ($(this).attr('href')) {
			LoadMainContent($(this).attr('href'));
		}
		else{
			LoadMainContent($(this).data('href'));
		}

		$('.search-modal').modal("hide");
		return false;

	}).addClass("linked");

	$(".submenu:not(.linked)").click(function(){
		
		LoadMainContent($(this).attr('href'));

	}).addClass("linked");

	$("a[data-modal=true]:not(.linked), button[data-modal=true]:not(.linked)").on('click', function (event) {
		event.preventDefault();
		if ($(this).attr('href')) {
			ShowModal($(this).attr('href'));
		}
		else{
			ShowModal($(this).data('href'));
		}
		return false;
	}).addClass("linked");

	$("form.ajax:not(.linked)").on('submit', function (event) {
		event.preventDefault();
		var validator = window[$(this).data("validator")];

		if (validator === undefined || validator()) {
			var enctype = $(this).prop("enctype");
			
			if(!enctype || enctype == "application/x-www-form-urlencoded"){
				$.ajax({
		        	type: $(this).prop('method'),           
		            url: $(this).prop('action'),
		            data: $(this).serialize(), 
		            success: window[$(this).data("handler")]
		        });	
			}
			else{
				$.ajax({
		        	type: $(this).prop('method'),
		        	encType: enctype,
		        	contentType: false,
		        	processData: false,
		            url: $(this).prop('action'),
		            data: new FormData( $(this)[0]), 
		            dataType: 'json',
		            success: window[$(this).data("handler")]
		        });
			}

		};
		return false;
	}).addClass("linked");

    $(".btn-refresh:not(.refresh-linked)").on("click", function(){
    	LoadMainContent(mainContentUrl);
    }).addClass("refresh-linked");

	$.each($('input.datepicker:not(.datepicker-linked)'), function(i, item){ 
		$(item).datepicker({
			format: 'dd-M-yyyy',
			autoclose: true,
			todayHighlight: true,
	    	startDate: $(this).data("mindate"),
	    	endDate: $(this).data("maxdate")
		}).addClass("datepicker-linked").prop("readonly", "readonly");
	});

	$.each($('input.timepicker:not(.timepicker-linked)'), function(i, item){ 
		$(item).timepicker().addClass("timepicker-linked").prop("readonly", "readonly");
	});


	$.each($('input.integer:not(.integer-linked)'), function(i, item){ 
		$(item).on("keydown", function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }

		}).on("focusout", function(e){
			var minVal = $(this).data("minval");
	    	var maxVal = $(this).data("maxval");
		    if (minVal && Number($(this).val()) < Number(minVal)) {
		    	$(this).val("");
		    }
		}).addClass("integer-linked");
	});

	$.each($('input.number:not(.number-linked)'), function(i, item){ 
		$(item).on("keydown", function(e) { 
			// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            MarkCross($(item).closest(".form-group").find("label"), true);
	        	showErrorMessage($(item).closest(".form-group").find('label'));
	            e.preventDefault();
	        }else{
	        	removeNumberMessage(item);
	        }

		}).on("focusout", function(e){
			var minVal = $(this).data("minval");
	    	var maxVal = $(this).data("maxval");
		    if (minVal && Number($(this).val()) < Number(minVal)) {
		    	$(this).val("");
		    }
		}).addClass("number-linked");
	});
	
	
	$.each($('input.money:not(.money-linked)'), function(i, item){ 
		$(item).on("keydown", function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
	        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
	             // Allow: Ctrl+A, Command+A
	            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
	             // Allow: home, end, left, right, down, up
	            (e.keyCode >= 35 && e.keyCode <= 40)) {
	                 // let it happen, don't do anything
	                 return;
	        }
	        // Ensure that it is a number and stop the keypress
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
	            e.preventDefault();
	        }
		}).on("focusout", function(e){ 
			var res = FormatMoney($(this).val());
			$(this).val(res);
		}).addClass("money-linked");
	});
	
    CheckCharacter();
	CheckAlphanumeric();
	CheckAlphanumericWithSpace();
	CheckEmail();
	
	$('.view:not([readonly="readonly"])').prop("readonly", "readonly");
	$('.readonly:not([readonly="readonly"])').prop("readonly", "readonly");
	
}

/******************************************
 * 
 * @param selector is means filed number class
 * @param item is means this 
 * @returns no return 
 * @description: this function is used for remove number field error message and show mark check
 */
function removeNumberMessage(item){
    $(".alert").find(".field_"+$(item).closest(".form-group").find("input").attr("id")).remove();
    MarkCross($(item).closest(".form-group").find("label"), false);
    if($(".alert li").size() == 0){
        $(".alert").addClass("hidden");            
    }
   
}

function getLableName(lable){
	var indx =  lable.indexOf("<span>");
	if(indx != -1){
		lable = lable.substring(0,indx) + "";
	}
	return lable;
}

function FormatMoney(val){
	if(val == "" || val == null){
		return "0.00";
	}
	var result = RemoveComma(val).toFixed(2); 
	return result.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function RemoveComma(val){
	var result = Number(String(val).replace(/,/g, ""));
	return result;
}

function ScrollToTop()
{
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}

function InitDataTable(table, sortingColumnNo){
	  var ColumnNo = ( sortingColumnNo == undefined ) ? 0 : sortingColumnNo;
      var oTable = $(table).dataTable({
        "aoColumnDefs" : [{
            "aTargets" : [0],
            "searchable": false,
            stateSave: true
        }],
        "oLanguage" : {
            "sLengthMenu" : "Show _MENU_ Rows",
            "sSearch" : "",
            "sSearchWidth" : "300px",
            "sSearchPlaceholder": "Search records ....",
            "oPaginate" : {
                "sPrevious" : "<span class='fa fa-chevron-left'></span>",
                "sNext" : "<span class='fa fa-chevron-right'></span>"
            }
        },
        "aaSorting" : [[ColumnNo, 'asc']],
        "aLengthMenu" : [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "iDisplayLength" : 20
    });
    
    //alert($(".paginate_button current").val());
}

function InitResizableTable(table){
	$(table).dataTable({
    	"sDom": "Rlfrtip",
    	"bSort" : false, 
    	"bFilter" : false,
    	"paging" : false,
    	"bInfo" : false
  	});
}

function ConcatWithBR(arr){ 
	if(!arr){
		return "";
	}
	var msg = "";
	for (var i = 0; i < arr.length; i++) {
		msg += arr[i] + '<br />';
	};
	return msg;
}

function ConcatWithLI(arr){ 
	if(!arr){
		return "";
	}
	var msg = "";
	for (var i = 0; i < arr.length; i++) {
		msg += '<li>'+arr[i] + '</li>';
	};
	return msg;
}

function GetParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function CheckDuplicate(selector){
	var values = Array();
	var isFound = false; 
	$(selector).each(function(i, item){
		value = $(item).val();
		if ( values.indexOf(value) != -1) {	
			isFound = true;
		}
		values.push(value);
	});
	return isFound;
}



function PadZero(comp) {
    return ((parseInt(comp) < 10) ? ('0' + comp) : comp);
}

function PadZeros(src, num) {
	dest = "0000000000000000000000000000000000000000000000000000" + src;
	if (src.length < num) {
		return dest.substring(dest.length  -num);
	}
    return src;
}


function CommaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}


/*convert 10-nov-2016 into yyyy-mm-dd format*/
function formatDate(inputDate,format){
	var m_names = new Array("Jan", "Feb", "Mar", 
			"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
			"Oct", "Nov", "Dec");

	var d = new Date(inputDate);
	var curr_date = PadZero(d.getDate());
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear();
	if(format == "dd-mm-yyyy"){
		return(curr_date + "-" + PadZero(curr_month + 1) + "-" + curr_year);
	}
	else if(format == "dd-mmm-yyyy"){
		return(curr_date + "-" + m_names[curr_month] + "-" + curr_year);
	}
	else if(format == "yyyy-mm-dd"){
		return(curr_year + "-" + PadZero(curr_month + 1) + "-" + curr_date);
	}
	else if(format == "yyyy-mmm-dd"){
		return(curr_year + "-" + m_names[curr_month] + "-" + curr_date);
	}
	else{
		alert("Invalid Data Format");
	}

}


function getWeekDay(date){
	var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	return dayNames[date.getDay()];
}

function GetToday(){
	var d = new Date();
	return formatDate(d, "dd-mmm-yyyy");
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function trimStrtoUpperCase(data){
	return data.replace(/\s/g, '').toUpperCase();
}

/*-----------------------------number to words convert-------e.g : 5 to Five-----------------*/
var th = ['', 'thousand', 'million', 'billion', 'trillion'];

var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function toWords(num) {
	num = num.toString();
	num = num.replace(/[\, ]/g, '');
    if (num != parseFloat(num)) return 'not a number';
    var x = num.indexOf('.');
    if (x == -1) x = num.length;
    if (x > 15) return 'too big';
    var n = num.split('');
    var str = '';
    var sk = 0;
    for (var i = 0; i < x; i++) {
        if ((x - i) % 3 == 2) {
            if (n[i] == '1') {
                str += tn[Number(n[i + 1])] + ' ';
                i++;
                sk = 1;
            } else if (n[i] != 0) {
                str += tw[n[i] - 2] + ' ';
                sk = 1;
            }
        } else if (n[i] != 0) {
            str += dg[n[i]] + ' ';
            if ((x - i) % 3 == 0) str += 'hundred ';
            sk = 1;
        }
        if ((x - i) % 3 == 1) {
            if (sk) str += th[(x - i - 1) / 3] + ' ';
            sk = 0;
        }
    }
    if (x != num.length) {
        var y = num.length;
        str += 'point ';
        for (var i = x + 1; i < y; i++) str += dg[n[i]] + ' ';
    }
    return str.replace(/\num+/g, ' ');

}


/******************************************************
	* This function use for delete dataTable row.
	* First parameter(tableIdName) is dataTable id.
	* Second parameter(classNameId) is id class name
	* Third parameter(el) is current row
*******************************************************/
function deleteDataTableRow(tableIdId, currRowClassName , el, deleteTableId, deleteArrayName, deleteArrayClass){
	if(!deleteTableId){
		deleteTableId = "deleteDataList";
	}
	
	if(!deleteArrayName){
		deleteArrayName = "deleted_data";
	}
	
	if(!deleteArrayClass){
		deleteArrayClass = "deleted_data";
	}
	swal({
		title : 'Are you sure?',
		text : 'Are you sure to delete this records?',
		type : 'warning',
		showCancelButton : true,
		confirmButtonColor : "#007AFF",
		confirmButtonText : 'Yes, delete it!',
		closeOnConfirm : true
	}, function() {
		$("#change_status").val("Y");
		var table = $('#'+tableIdId).dataTable().api();
		var curr_item = $(el).closest("tr").find("."+currRowClassName).val();
		table
        .row( $(el).parents('tr') )
        .remove()
        .draw();
		if(curr_item != ''){
			$("#"+deleteTableId+" tr").append( 
					'<td align="center">' + 
						'<input type="hidden" name="'+deleteArrayName+'[]" class="'+deleteArrayClass+'" value="' + curr_item + '" />' +
					'</td>' 
			);
		}
	});
}
/***************End deleteDataTableRow**********************/
function addDataTableRow(tableIdName, arr){
	var table = $('#'+tableIdName).dataTable().api();
	var rowNode = table.row.add(arr).draw( false ).node();
    table.column( 0 ).visible( false );
    $(rowNode).css({"text-align": "center"});
}


/***************** Start - Function for Passing Credit values  ******************/
function passCredits(po, designer, developer, tester){
	var valPo = po;
	var valDesigner = designer;
	var valDeveloper = developer;
	var valTester = tester;
	
	showCredits(valPo, valDesigner, valDeveloper, valTester);
}
/***************** End - Function for Passing Credit values ******************/


/***************** Start: table column unique check  *****************
 * @param tableId = give table id ex: taxTable
 * @param columnNo = give column index ex: 1
 * @param value = compare value ex: goods & sales
 * @param isEdit = when add ex: false and edit ex: true 
 * @returns == true or false
 * @author Farid Ahmed
 */
function uniqueColumnValue(tableId, columnNo, value, isEdit){
	var table = $('#'+tableId).dataTable().api();
	var arr =  table.column(columnNo).data().unique();
	if(isEdit){
		/*//var index = $(".current-row").closest("tr").index();
		arr = jQuery.grep(arr, function(v) {
			  return v != value;
			});*/
	}
	var result = $.inArray(value, arr);
	return (result == -1)? !0: !1;
}

/***************** Start - Function for Passing Feedback values  ******************/
function passFeedbacks(privCode, privName, objType, actType){
	var valPrivCode = privCode;
	var valPrivName = privName;
	var valObjectType = objType;
	var valActionType = actType;
	//showFeedback(valPrivCode, valPrivName, valObjectType, valActionType);
}
/***************** End - Function for Passing Feedback values ******************/

function GetPrivilegeInformation(privilegeInfo){ 
	showFeedback(privilegeInfo);
	
}


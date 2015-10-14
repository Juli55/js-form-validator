function formValidation() {

	var validationFunction;
	var changes;
	var input;
	var route;
	var validationObject = {};

	this.init = function(pInput, pRoute, pValidateFunction) {
		//init attributes
		input = pInput;
		changes = {};
		route = pRoute;
		validationFunction = pValidateFunction;
	}

	function exec(data) {
		//call changes
		changes = getChange(data);
		//call validationFunction
		validationFunction(changes, input, data);
	}

	this.validate = function() {
		//take an ajax request
		$.ajax({
    		method: "POST",
		  	url: route,
		  	data: input.serialize(),
			dataType: 'json',
		})
		.done(function(data){
			exec(data);
		});
	}

	function getChange(data) {
		//determine changes
		change = {};
		if(jQuery.isEmptyObject(validationObject)) {
			$.each(data, function(name, value){
				if(name === 'access') {
					validationObject[name] = {};
					validationObject[name].valid = value.valid;
				} else {
					validationObject[name] = {};
					validationObject[name].valid = value.valid;
					validationObject[name].errorMsg = value.errorMsg;
				}
			});
			change = validationObject;
		} else {
			$.each(data, function(name, value) {
				if(name in validationObject){
					if('valid' in validationObject[name]) {
						if(value.valid !== validationObject[name].valid){
							if(jQuery.isEmptyObject(change[name])){
								change[name] = {};
							}
							change[name].valid = value.valid;
							validationObject[name].valid = value.valid;
						}
					}
					if(value.valid === false){
						if(value.errorMsg !== validationObject[name].errorMsg){
							if(jQuery.isEmptyObject(change[name])){
								change[name] = {}
							}
							change[name].errorMsg = value.errorMsg;
							validationObject[name].errorMsg = value.errorMsg;
						}
					}
				} else {
					validationObject[name] = {};
				    validationObject[name].valid = value.valid;
				    validationObject[name].errorMsg = value.errorMsg;
				    change.valid = validationObject[name];
				}
			});
		}
		return change;
	}
}
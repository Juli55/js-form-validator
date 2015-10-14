# js-form-validator
A js script to get json from backend and get validation changes, so you can handle errorMsgs

You have to return from Backend an JSON-Object with the name fields and in there the variables valid with true or false, and optional the errorMsg-Parameter for the error-messages

An json example:
                    '{ field1 : {valid : true}, field2: {valid: false, errorMsg: 'This field1 field is requiered'}, access:{valid: false, errorMsg: 'You have to be logged in'} }'

In this example you can see how you have to formate your JSON-Response. You see, there is an 'access' proberty it is not for an field, it is for the full form, there you get the information, if the request through the form is successfull.

          var formValidation = new formValidation();
            $(document).ready(function(){
                $(document).on('submit', 'form#testForm', function(){
                    formValidation.init($(this), 'example.com/ajaxForm', validate);
                    formValidation.validate();
                    return false;
                });
            });
            
Here you can see how to use the formValidator, the parameters are $(this) from jquery, so you can access elements in there to modify the form with the validation, then the route where to take the ajax-request, and then a validationObject, like this:
          
          
          var validate = function(change, input, validationObject){
                if(validationObject.access.valid){
                    console.log('access successfully');
                } else {
                    console.log('access denied');
                }
            }

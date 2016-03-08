//Create a container for validation rule names.
var ruleNames = [];


//Fills array with rule names.
//Looks for all elements with 'vmsg' class
// and the adds the first class (rule name) to the array.
$("[data-rule]").each(function(i, element){

	var ruleName = element.getAttribute('data-rule');
	console.log(i, element);
	if($.inArray(ruleName, ruleNames) < 0){
		
		ruleNames.push(ruleName);
	}
});


var validate  = function(){
	debugger;
	$(".validation-messages span").addClass('hide');
	validateAgainstCustomRules();
	document.getElementById('change-email-form')
		.checkValidity();
},

validationFail = function(e){
	var element = e.srcElement,
		validity = element.validity;

	if(!validity.valid){
		ruleNames.forEach(function(ruleName){
			checkRule(validity, ruleName, element);
		});
		e.preventDefault();
	}
},

checkRule = function(state, ruleName, ele){
	if(state[ruleName]){
		$(ele).next()
			.find('[data-rule="'
			+ruleName + '"]')
			.remoteClass('hide');
	}
},

validateIsAol = function(){
	var element =
			document.getElementById('email');
	if(element.value.length > 0) {
		if(element
				.value
				.toLowerCase()
				.indexOf("@aol.com") != -1){
			element.setCustomValidity('invalid');

			$('#email').next()
				.find('[data-rule="isAol"]')
				.removeClass('hide');
		}
		else{
			element.setCustomValidity('');
		}
	}
},

validateAgainstCustomRules = function() {
	validateIsAol();
}
//Attaches validation event handlers to all input elements that are NOT buttons.
$(':input:not(:button)').each(function(){
	this.oninvalid = validationFail;
	this.onblur = validate;
});

$('#checkValidation').click(validate);
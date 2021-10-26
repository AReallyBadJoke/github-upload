
function onDOMContentLoaded(event) {
	const formElement = document.getElementById('createNewLift');
	getLiftIndex();
	formElement.addEventListener('submit', onFormSubmit);
}

function getLiftIndex(){
	/*This function is to pull the last lifting index.  We are going to be keeping lots of data with the same
	  lift name.  We need a way to keep track of them aside from trying to parse dates.
	*/
	let hiddenNode = document.getElementById("hiddenIndex");
	
	let xhr = new XMLHttpRequest();
	xhr.open("GET", '/liftIndex', true);
	xhr.addEventListener('readystatechange', () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			if(xhr.status === 200){
				let jData = xhr.responseText;
				console.log(parseFloat(jData)+1);
				hiddenNode.value = parseFloat(jData) +1;
			}
			else{
				console.log('error: '+xhr.status);
			}
		}
	});
	xhr.send();
}

function onFormSubmit(event){
	event.preventDefault();
	const formElement = document.getElementById('createNewLift');
	const formDataJsonObj = getFormDataAsJsonObj(formElement);
	const formDataJsonStr = JSON.stringify(formDataJsonObj);
	
	//Ajax call here.
	const xhr = new XMLHttpRequest();
	xhr.open("POST",'/createData', true);
	xhr.addEventListener('readystatechange', (event) => {
		if(xhr.readyState === XMLHttpRequest.DONE){
			if(xhr.status === 200){

			}
			else {
				console.log('Post failed:'+ xhr.status);
			}
		}
	});
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(formDataJsonStr);

}

function getFormDataAsJsonObj(formEle){
	const formData = new FormData(formEle);
	const jsonObj = {};
	
	for(const [name, value] of formData ){
		jsonObj[name] = value ;
	}
	return jsonObj;
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
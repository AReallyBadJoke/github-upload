let sOutput = "";
let outputArray = [];
let jsonArray = [];

function displayOutput(onloadData){
	
	//Clear my array and html table for refresh.
	
	let element = document.getElementById("output");
		sOutput = onloadData;		
		jsonArray = JSON.parse(sOutput);
		addTableData();
}

function onDOMContentLoaded(event){
	getAjaxPageLoad();
}

function addTableData(){		
	let parent = document.getElementById("displayTable");
	let tableBody = parent.getElementsByTagName("tbody");
	for(let i =0; i<jsonArray.length; i++){
		let localDate = new Date(jsonArray[i].Date);
		let tableRow = document.createElement("tr");
		let tableDepth = [];
		let uri = 'details.html?ind='+jsonArray[i].Lifting_ID;
		let res = '<a href="'+encodeURI(uri)+'">'+jsonArray[i].Lift_Name+'</a>';
		
		for(let j = 0; j < 5; j++){
			tableDepth.push(document.createElement("td"))
		}
		
		
		tableDepth[0].innerHTML = res;
		tableDepth[1].textContent = localDate.toLocaleString();
		tableDepth[2].textContent = jsonArray[i].One_Rep;
		tableDepth[3].textContent = jsonArray[i].Weight_Type;
		tableDepth[4].textContent = jsonArray[i].Location;
		
		for(let x = 0; x < 5; x++){
			tableRow.appendChild(tableDepth[x]);
		}
		
		tableBody[0].appendChild(tableRow);
	}
}

function removeTableData(){
	let parent = document.getElementById("displayTable");
	let tableBody;
	let c = parent.childNodes;
	let i;
  
	for (i = 0; i < c.length; i++) {
		if(c[i].nodeName == 'TBODY'){
		tableBody = c[i];
		}
	}
	
	tableBody.innerHTML = '';
}

function getAjaxPageLoad(){
	//Clearing data
	jsonArray.length = 0;
	outputArray.length = 0;
	removeTableData();
	
	//inital page load call.
	let xhr = new XMLHttpRequest();
	xhr.open("GET", '/fileData', true);
	xhr.addEventListener('readystatechange', () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			if(xhr.status === 200){
				let jData = xhr.responseText;
				displayOutput(jData);
			}
			else{
				displayOutput('error: '+xhr.status);
			}
		}
	});
	xhr.send();
}

//updating every 15 seconds
setInterval(getAjaxPageLoad, 15000);

//running the event listener on load.
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
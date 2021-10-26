function onDOMContentLoaded(event){
	let qs = window.location.search;
	let varLoc = qs.search('=');
	let dataIndex = qs.substr(varLoc+1,varLoc+1);
	
	getAjaxPageLoad(dataIndex);
}

function getAjaxPageLoad(index){
	
	//inital page load call.
	let xhr = new XMLHttpRequest();
	xhr.open("GET", '/fileData', true);
	xhr.addEventListener('readystatechange', () => {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			if(xhr.status === 200){
				let jData = xhr.responseText;
				displayOutput(jData, index);
			}
			else{
				displayOutput('error: '+xhr.status);
			}
		}
	});
	xhr.send();
}

function displayOutput(onloadData, index){
	
	//Clear my array and html table for refresh.
	
	let element = document.getElementById("output");
		sOutput = onloadData;		
		jsonArray = JSON.parse(sOutput);
		addTableData(index);
		calculatePercentages(index);
}

function addTableData(index){		
	let parent = document.getElementById("displayTable");
	let tableBody = parent.getElementsByTagName("tbody");
	for(let i =0; i<jsonArray.length; i++){
		if(jsonArray[i].Lifting_ID == index){
		let localDate = new Date(jsonArray[i].Date);
		let tableRow = document.createElement("tr");
		let tableDepth = [];
		let uri = 'details.html?ind='+jsonArray[i].Lifting_ID;
		let res = jsonArray[i].Lift_Name;
		
		for(let j = 0; j < 9; j++){
			tableDepth.push(document.createElement("td"))
		}
		
		
		tableDepth[0].textContent = res;
		tableDepth[1].textContent = localDate.toLocaleString();
		tableDepth[2].textContent = jsonArray[i].One_Rep;
		tableDepth[3].textContent = jsonArray[i].Weight_Type;
		tableDepth[4].textContent = jsonArray[i].Location;
		tableDepth[5].textContent = jsonArray[i].Previous_One_Rep;
		tableDepth[6].textContent = jsonArray[i].Previous_Weight_Type;
		tableDepth[8].textContent = jsonArray[i].Lifting_ID;
		
		for(let x = 0; x < 9; x++){
			tableRow.appendChild(tableDepth[x]);
		}
		
		tableBody[0].appendChild(tableRow);
		}
	}
}

function calculatePercentages(index){
	let oneRM;
	let weightType;
	for(let i=0; i<jsonArray.length; ++i){
		if(jsonArray[i].Lifting_ID == index){
			oneRM = parseFloat(jsonArray[i].One_Rep);
			weightType = jsonArray[i].Weight_Type;
		}
	}
	
	let parent = document.getElementById("percentageChart");
	let tableBody = parent.getElementsByTagName("tbody");
		for(let i=9; i>=0; --i){
			let tableRow = document.createElement("tr");
			tableRow.classList.add("ptr");
			let tableDepth = [];
			for(let j = 0; j < 2; j++){
			tableDepth.push(document.createElement("td"))
			}
			let per = i+1;
			tableDepth[0].textContent = (per) +"0%";
			
			tableDepth[1].textContent = oneRM*(per/10)+weightType;
			tableDepth[0].classList.add("ptd");
			tableDepth[1].classList.add("ptd");
		
			for(let x = 0; x < 2; x++){
				tableRow.appendChild(tableDepth[x]);
			}
		
			tableBody[0].appendChild(tableRow);
		}

}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
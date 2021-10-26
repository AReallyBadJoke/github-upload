const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'));
app.use(express.json());
let rData = "";

app.get('/fileData', (req, res) => {
 //readData();
 	fs = require('fs')
	fs.readFile('LiftingData.txt', 'utf8', function (err,data) {
		if (err) {
		return console.log(err);
		}
	rData = data.toString();
	 res.send(rData);
	});
 //console.log("R Data: "+rData + "AAAA");
 //res.send(rData);
})

app.get('/liftIndex', (req, res) =>{
	//This will only return the last indexed number in the list of lifts.
	let rArray = [];
	let jSonArray = [];
	let jNumber;
	
	fs = require('fs')
	fs.readFile('LiftingData.txt', 'utf8', function (err,data) {
		if (err) {
		return console.log(err);
		}
	rData = data.toString();
	jSonArray = JSON.parse(rData);

	//Sorting array by index
	jSonArray.sort(function(a,b){
		return parseFloat(a.Lifting_ID) - parseFloat(b.Lifting_ID);
	});
	
	//Getting last indexed number

	jNumber = jSonArray[jSonArray.length-1].Lifting_ID;
	console.log(jNumber);
	
	res.send(jNumber);	
	})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/createData', (request,response) =>{
	const submittedJson = request.body;
	let rArray = [];
	let jSonArray = [];
	
	if(!submittedJson || !submittedJson.match(/^[A-Za-z0-9. ]+$/)){
		response.sendStatus(400);
	}
	
	//have to read and append the file to add to exisisting otherwise it will just overwrite.
	fs = require('fs')
	fs.readFile('LiftingData.txt', 'utf8', function (err,data) {
		if (err) {
		return console.log(err);
		}
	rData = data.toString();
		});
		
	rArray = rData.split('\n');
	jSonArray = JSON.parse(rData);

	jSonArray.push(submittedJson);
	
	fs = require('fs');
	fs.writeFile('LiftingData.txt', JSON.stringify(jSonArray), function (err,data) {
		if (err) {
		return console.log(err);
		}
	});
	
	response.sendStatus(200);
});
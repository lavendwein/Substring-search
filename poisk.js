let fs = require('fs');
let arg = process.argv;
let result = new Array();

//node poisk.js подстрока файл
function Hash(str){
	let sum = 0;
	for (let i = 0; i < str.length; i++){
		sum += (str.charCodeAt(i) * Math.pow(2, str.length - i - 1));
	}
	return sum;
}

fs.readFile(arg[3], (err, data) => {
	if (err){
		console.error(err);
		return;
	}
	let inputData = data.toString();
	let subString = arg[2].toString();
	const subStringHash = Hash(subString);
	let segmentHash = Hash(inputData.substring(0, subString.length));
	
	let j;
	for (let i = 0; i < inputData.length - subString.length + 1; i++){
		if (subStringHash == segmentHash){	
			j = 0;
			while (inputData[i + j] == subString[j] && j < subString.length){
				j++;
			}
			if (j == subString.length){
				result.push(i);
			}
		}	
		segmentHash = (segmentHash - inputData.charCodeAt(i) * Math.pow(2, subString.length - 1)) * 2 + inputData.charCodeAt(i + subString.length);
	}
	
	if (result.length != 0){
		console.log(result);
	}else{
		console.log("Подстрока не найдена!");
	}
});	
const fs = require('fs');
const interval = 3000; 

function loadJSON(file) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return; 
    }

    console.log("Entire JSON File Content:");
    console.log(JSON.stringify(data, null, 2)); 
  });
}

var filename = "electionResults.json";

const timerId = setInterval(() => {
  loadJSON(filename);
}, interval);

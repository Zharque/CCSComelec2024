const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
const app = express();
const rootPath = path.join(__dirname);

async function readAndLogData() {
  try {
    console.log("start read");
    const rows = await readXlsxFile("2023results.xlsx");
    let governorCount = rows[5][15];
    let viceGovernorCount = rows[6][15];
    let secretaryCount = rows[7][15];
    let treasurerCount = rows[8][15];
    let auditorCount = rows[9][15]; 
    let PROCount = rows[10][15];
    const data = { governorCount, viceGovernorCount, secretaryCount, treasurerCount, auditorCount, PROCount}; 
    const jsonData = JSON.stringify(data, null, 2); 
    await fs.promises.writeFile('electionResults.json', jsonData); 
    console.log("end read");
  } catch (error) {
    console.error("Error reading excel file:", error);
  }
}

function loadJSON(file) {
  return new Promise((resolve, reject) => {
    readAndLogData(); 
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    });
  });
}

readAndLogData();
async function updateData() {
  try {
    const jsonData = await loadJSON(filename);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

var filename = "electionResults.json";

app.get('/', async (req, res) => {
  let jsonData;
  try {
    jsonData = await loadJSON(filename);
  } catch (error) {
    console.error("Error loading data:", error);
  }

  res.render('index.ejs', { jsonData });
});

app.get('/data', async (req, res) => {
  try {
    updateData();
    const jsonData = await loadJSON(filename);
    res.json(jsonData); 
  } catch (error) {
    console.error("Error loading data:", error);
    res.status(500).send("Error retrieving data"); 
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

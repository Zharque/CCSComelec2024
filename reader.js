const readXlsxFile = require('read-excel-file/node');
const fs = require('fs');

async function readAndLogData() {
  try {
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
    console.log("Cell value saved to JSON file successfully!");
  } catch (error) {
    console.error("Error reading excel file:", error);
  }
}

module.exports = readAndLogData;
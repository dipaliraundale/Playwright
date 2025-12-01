const Exceljs = require('exceljs');


// const workbook = new Exceljs.Workbook();  // ← this is an object  "workbook is an object created from the Workbook class in ExcelJS."
// console.log(typeof workbook);  // prints: object



//*********Handle promise by using .then() method ********//
  const workbook = new Exceljs.Workbook();
  workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx').then(()=>{ //////// reading excel file and .then() method to handle promise

 const worksheet = workbook.getWorksheet('Sheet1');
 worksheet.eachRow((row,rowNumber)=>{
    console.log(`Row ${rowNumber} = ${row.values}`);
    row.eachCell((cell, colNumber)=>{
        console.log(`Cell ${colNumber} = ${cell.value}`);
    });
 });

  });
 

//********Handle promise by using async await********//
 async function readExcel() {   ///// async function to read excel file
  const workbook = new Exceljs.Workbook();
  await workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');/// reading excel file with await keyword

  const sheet = workbook.getWorksheet('Sheet1');// getting the worksheet

  sheet.eachRow(function(row, rowNumber) { /// iterating through each row
    console.log("Row " + rowNumber + ":");
    row.eachCell(function(cell, colNumber) {/// iterating through each cell in the row
      console.log("  Cell " + colNumber + ": " + cell.value);/// logging cell value
    });
  });
}

readExcel();            ///// calling the async function to read excel file


const ExcelJS = require('exceljs');

async function updateExcel() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');

  const sheet = workbook.getWorksheet('Sheet1');

  // Update one specific cell, for example A2
  sheet.getCell('B2').value = 'bananvvvvvvva';

  // Save the file after modification
  await workbook.xlsx.writeFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');

  console.log("Cell B2 updated with banana");
}

updateExcel();






////***update cell value with specifc row and column no  *************** */

async function updateCellValue(rowNumber, colNumber, newValue) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');

  const sheet = workbook.getWorksheet('Sheet1');
  sheet.getCell(rowNumber, colNumber).value = newValue;  // updating cell value based on row and column number

  await workbook.xlsx.writeFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');
  console.log(`Cell ${colNumber}${rowNumber} updated with ${newValue}`); ///// logging the update
}

updateCellValue(2, 2, 'banana'); /// updating cell at row 2, column 2 with 'banana'



////*****Check value is present in a specific cell if yes get the corresponding row and column number*************** */


async function findValueInExcel(targetValue) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');

  const sheet = workbook.getWorksheet('Sheet1');
  let found = false;

  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === targetValue) {
        console.log(`Found ${targetValue} at Row: ${rowNumber}, Column: ${colNumber}`);
       // console.log("Found " + targetValue + " at Row: " + rowNumber + ", Column: " + colNumber);//////simple concatenation
        found = true;
      }
    });
  });

  if (found) {
    console.log(`${targetValue} found in the sheet.`);
  }
}

findValueInExcel('banana');




/////**** Simplfied find the valaue code in sheet ******** *


async function findValueInExcel(targetValue) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');

  const sheet = workbook.getWorksheet('Sheet1');
  let found = false;

  sheet.eachRow(function(row, rowNumber) {
    row.eachCell(function(cell, colNumber) {
      if (cell.value === targetValue) {
        console.log(rowNumber);
        console.log(colNumber);
        found = true;
      }
    });
  });

  if (found) {
    console.log(targetValue + " found in the sheet.");  /////concatenation
  }
}

findValueInExcel('banana');



/////*****find valuse and update with new value *************** */
async function findAndUpdateValueInExcel(targetValue, newValue) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');   
  const sheet = workbook.getWorksheet('Sheet1');
  let found = false;

  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === targetValue) { ///// checking for target value
        cell.value = newValue;  ///// updating cell value         
      }
    });
  });

  await workbook.xlsx.writeFile('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');
  console.log(`Updated ${targetValue} to ${newValue} in the sheet.`);
}

findAndUpdateValueInExcel('banana', 'banana_updated');




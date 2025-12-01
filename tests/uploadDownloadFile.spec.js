const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

// -----------  functions -----------
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');

  const output = await readExcel(worksheet, searchText);

  if (output.row === -1) { //// The -1 is used as a flag value to indicate “not found.”
    console.log(searchText + " not found in Excel sheet");
    return;
  }

  // update cell value
  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;

  await workbook.xlsx.writeFile(filePath);
  console.log("Updated " + searchText + " to " + replaceText);
}

async function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow(function (row, rowNumber) {
    row.eachCell(function (cell, colNumber) {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

// ----------- playwright test -----------
test('Upload and validate Excel update', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '35550';
  const filePath = 'C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx';

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

  // Download Excel file
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download = await downloadPromise;

  //Save downloaded file
  await download.saveAs('C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');
  console.log("File saved to:", 'C:/Users/Pratiti_User/Documents/playwriteAutomationFramework/testdata/TestDataExcel.xlsx');


  // Update Excel file
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);   ///// Call function to update Excel value colChange: 2 means we are changing value in 3rd column (0 based index) 

  //  Upload updated file
  await page.locator('#fileinput').setInputFiles(filePath); ////setInputFiles is used to upload file if the component is of type file

  // Validate updated value in table
  const textlocator = page.getByText(textSearch);
  const updatedRow = await page.getByRole('row').filter({ has: textlocator });
  await updatedRow.locator('#cell-4-undefined').textContent(updateValue); //// waiting for the cell to be visible

});

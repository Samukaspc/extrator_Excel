import * as XLSX from 'xlsx';
import React, { useState } from 'react';

export default function DataExtractor() {
  const [excelDataText, setExcelDataText] = useState('');

  const handleExcelUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          const data = new Uint8Array(arrayBuffer);
          console.log(data)
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          console.log('Excel Data:', excelData);

          const excelDataString = JSON.stringify(excelData, null, 2);
          setExcelDataText(excelDataString); 
        }
      };

      reader.readAsArrayBuffer(file);
      console.log('File:', file);
    }
  }
 
  return (
    <>
      <div>
        <h2>Extrator de Dados</h2>
        <input type="file" onChange={handleExcelUpload} accept=".xlsx" />
      </div>
      <div>

      </div>
      <div>
        <h3>Dados Extraídos do Excel:</h3>
        <textarea
          rows={10}
          cols={50}
          value={excelDataText}
          readOnly 
        />
      </div>
        <button  onClick={() => setExcelDataText('')} >Resetar</button>
    </>
  );
}

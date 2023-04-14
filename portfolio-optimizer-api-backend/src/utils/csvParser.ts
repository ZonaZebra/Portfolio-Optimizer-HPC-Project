export function parseCSV(csvData: string): any[] {
    const rows = csvData.split("\n");
    const header = rows.shift()?.split(",") || [];
  
    return rows.map((row) => {
      const rowData = row.split(",");
      const result: any = {};
  
      header.forEach((key, index) => {
        result[key.trim()] = rowData[index].trim();
      });
  
      return result;
    });
  }
  
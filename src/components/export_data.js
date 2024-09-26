import React from 'react';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportButtons = ({ data }) => {
  const handleExcelExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "customers.xlsx");
  };

  const handlePDFExport = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Name", "Surname", "Email"];
    const tableRows = data.map(customer => [
      customer.customer_id,
      customer.customer_fname,
      customer.customer_lname,
      customer.customer_email
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save("customers.pdf");
  };

  return (
    <div className='mt-2'>
      <CSVLink
        data={data}
        filename={"customers.csv"}
        className="btn btn-sm btn-outline-primary me-2"
        target="_blank"
      >
        Export CSV
      </CSVLink>
      <button onClick={handleExcelExport} className="btn btn-sm btn-outline-primary me-2">
        Export Excel
      </button>
      <button onClick={handlePDFExport} className="btn btn-sm btn-outline-primary">
        Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;

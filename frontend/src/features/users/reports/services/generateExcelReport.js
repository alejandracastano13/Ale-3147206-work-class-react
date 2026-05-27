// Libreria para manipulacion y generacion de archivos excel
import * as XLSX from "xlsx";

// funcion utilitaria para generar un archivo excel
export function generateExcelReport({
    headers,
    rows,
    fileName = "user-report.xlsx"
}) {

    const currentDate = new Date().toLocaleDateString();

    const reportTitle =
        `====== Reporte de Usuarios - ${currentDate} =====`;

    // estructura de la hoja
    const worksheetData = [
        [reportTitle],
        [],
        headers,
        ...rows
    ];

    // crea hoja excel
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // rango de la hoja
    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    // merge del titulo
    worksheet["!merges"] = [
        {
            s: { r: 0, c: 0 },
            e: { r: 0, c: range.e.c }
        }
    ];

    // ancho columnas
    worksheet["!cols"] =
        headers.map(() => ({ wch: 25 }));

    // altura fila titulo
    worksheet["!rows"] = [
        { hpt: 25 }
    ];

    // crear workbook
    const workbook = XLSX.utils.book_new();

    // agregar hoja
    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "usuarios"
    );

    // descargar archivo
    XLSX.writeFile(workbook, fileName);
}
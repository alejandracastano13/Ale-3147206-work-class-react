// Fuente de datos de usuarios (mock o fuentes centralizada)
import { users } from "../../data/users";

// utilidad para transformar datos en datasat de reporte
import { buildReportDataset } from "../utils/buildReportDataset";

// servicios de exportacion
import { generateExcelReport } from "./generateExcelReport";
import { generatePfdReport } from "./generatePdfReport";

// caso de uso: orquestador de generacion de reportes de usuarios
// patron : application service (coordina utilidades y servicios)
export function generateUserReport({
    format,
    selectedFields,
    scope,
    documentNumber
}) {

    // construccion del dataset (desacoplado de la UI) 
    const { headers, rows } = buildReportDataset({
        users,
        selectedFields,
        scope,
        documentNumber
    });

    // validacion : evita 
    if (!rows.length) {
        alert("No hay datos para geerar el reporte.");
        return; // corte de ejecucuion

    }

    // generacion de timestamp nombres unicos de archivos (YYYY-MM-DD)
    const timestamp = new Date().toISOString().slice(0,10);

    // Seleccion de estrategia de exportacion segun formato
    if ( format === "excel") {
        generateExcelReport({
            headers,
            rows,
            fileName: `users-report-${timestamp}.xlsx`
        });
    }

    if (format === "pdf") {
        generatePfdReport({
            headers,
            rows,
            fileName: `users-report-${timestamp}.pdf`
        });
    }
}

// Libreria para generacion de pdfs en el cliente 
import jsPDF from "jspdf";

// Plugin para creacion de tablas dentro del PDF
import autoTable from "jspdf-autotable";

// funcion utilitaria para generar un reporte en pdf
// patron: exportacion de datos (dataset -> docuemto estructurado)
export function generatePfdReport({
    headers,
    rows,
    fileName ="user-report.pdf",
}) {
    // Inicilizamos el documento pdf
    const doc = new jsPDF();

    // configuracion del titulo
    doc.text("reporte de usuarios", 14,20); //posicion (x,y)

    // geracion de tabla automatica
    autoTable(doc, {
        startY: 30, //posicion inicial debajo del titulo

        head: [headers],
        body: rows,

        theme: "grid",

        // estilos del encabezado
        headStyles: {
            fillColor: [33, 150, 243],
            textColor: 255,
            fontSize: 11,
        },

        // Estilos globales de las celdas
        styles: {
            fontSize: 10,
        },

        // margenes del documento
        margin: {
            left: 14,
            right: 14,
        },
    });

    // genera y descarga el archivo PDF
    doc.save(fileName);
}
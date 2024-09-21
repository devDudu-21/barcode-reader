import * as fs from "fs";
import { PDFDocument } from "pdf-lib";
import { extractPageFromPDF } from "./extractPage";
import { readBarcode } from "./readBarcode";

export async function processBoleto(pdfPath: string): Promise<void> {
  try {
    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const totalPages = pdfDoc.getPageCount();

    console.log(`Número total de páginas no PDF: ${totalPages}`);

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      console.log(`Processando página ${pageNum}`);

      const imagePath = await extractPageFromPDF(pdfPath, pageNum);

      try {
        const barcodeResult = await readBarcode(imagePath);

        if (barcodeResult) {
          console.log("Código de barras lido com sucesso:", barcodeResult);
          return;
        }
      } catch (error) {
        console.log(
          `Nenhum código de barras válido encontrado na página ${pageNum}.`
        );
      }
    }

    console.error("Nenhum código de barras válido encontrado no PDF.");
  } catch (error) {
    console.error("Erro no processamento do boleto:", error);
  }
}

// Chamando a função principal (você pode chamar isso de outro módulo também)
processBoleto("./boleto.pdf");

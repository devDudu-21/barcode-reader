import { Poppler } from "node-poppler";
import * as fs from "fs";
import * as path from "path";

const poppler = new Poppler();

export async function extractPageFromPDF(
  pdfPath: string,
  pageNum: number
): Promise<string> {
  const outputFileName = `output-page-${pageNum}`;
  const outputImagePath = path.resolve(outputFileName);

  const options = {
    pngFile: true,
    firstPageToConvert: pageNum,
    lastPageToConvert: pageNum,
    resolutionXAxis: 300,
    resolutionYAxis: 300,
  };

  console.log(
    `Convertendo página ${pageNum} do PDF em imagem: ${outputImagePath}.png`
  );

  try {
    await poppler.pdfToCairo(pdfPath, outputImagePath, options);
    console.log("Conversão do PDF para imagem bem-sucedida.");

    const finalImagePath = `${outputImagePath}-${pageNum}.png`;
    console.log(`Caminho absoluto da imagem gerada: ${finalImagePath}`);

    if (!fs.existsSync(finalImagePath)) {
      throw new Error("Arquivo de imagem não encontrado.");
    }

    return finalImagePath;
  } catch (error) {
    console.error("Erro durante a conversão do PDF para imagem:", error);
    throw new Error("Falha ao processar o PDF e gerar a imagem.");
  }
}

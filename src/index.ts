import { processBoleto } from "./utils/processBoleto";

const pdfPath = "./boleto.pdf";

processBoleto(pdfPath).catch((error) => {
  console.error("Erro ao processar o boleto:", error);
});

import Quagga from "@ericblade/quagga2";

export async function readBarcode(imagePath: string): Promise<string> {
  console.log(`Tentando ler o código de barras da imagem: ${imagePath}`);

  return new Promise((resolve, reject) => {
    Quagga.decodeSingle(
      {
        src: imagePath,
        numOfWorkers: 0,
        inputStream: {
          size: 1600,
        },
        decoder: {
          readers: ["i2of5_reader"],
        },
        locate: true,
      },
      (result) => {
        if (result && result.codeResult && result.codeResult.code) {
          const code = result.codeResult.code;
          console.log("Código de barras encontrado:", code);

          if (code.length === 44 && /^\d+$/.test(code)) {
            resolve(code);
          } else {
            console.error("Código de barras com formato inválido:", code);
            reject("Formato de código de barras inválido.");
          }
        } else {
          console.error("Falha ao encontrar o código de barras.");
          reject("Código de barras não encontrado ou inválido.");
        }
      }
    );
  });
}

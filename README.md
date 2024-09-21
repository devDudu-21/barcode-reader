# Leitor de Boletos Bancários com Código de Barras

Este projeto é um leitor de boletos bancários que extrai o código de barras de arquivos PDF e decodifica seus dados, como banco, valor e data de vencimento. Ele utiliza bibliotecas como Poppler, Quagga2 e PDF-lib para manipulação de PDFs e leitura de códigos de barras.

## Funcionalidades

### Extrair páginas de PDFs: Converte cada página de um arquivo PDF em uma imagem

### Detectar código de barras: Localiza e decodifica códigos de barras no formato i2of5

### Processamento modular: O projeto é dividido em módulos, facilitando a manutenção e expansão

## Estrutura do Projeto

O projeto está modularizado da seguinte forma:

```go
/
|-- src/
| |-- index.ts
| |-- extractPage.ts
| |-- readBarcode.ts
| |-- processBoleto.ts
|
|-- dist/
|-- tsconfig.json
|-- package.json
```

## Descrição dos Módulos

### extractPage.ts: Extrai uma página do PDF e converte-a em uma imagem PNG

### readBarcode.ts: Lê o código de barras de uma imagem e o decodifica usando a biblioteca Quagga2

### processBoleto.ts: Processa o arquivo PDF, extraindo todas as páginas e procurando pelo código de barras em cada uma delas

### index.ts: O ponto de entrada principal, que chama o processamento de um arquivo PDF fornecido

### Requisitos

- Node.js (>= 14.x)
- npm (ou yarn)
- Poppler instalado no sistema (Para conversão de PDFs para imagem). Siga as instruções de instalação abaixo.

### Instalação do Poppler

- Ubuntu/Debian

```bash
sudo apt-get install poppler-utils
```

- macOS (via Homebrew)

```bash
brew install poppler
```

- Windows

[Baixe o Poppler para Windows aqui.](https://github.com/oschwartz10612/poppler-windows/releases)

Extraia os arquivos e adicione o caminho para o executável poppler/bin ao seu PATH do sistema.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/devDudu-21/barcode-reader.git
cd barcode-reader
```

Instale as dependências do projeto:

```bash
npm install
```

Compile o código TypeScript para JavaScript:

```bash
npx tsc
```

### Como Usar

Após instalar todas as dependências e configurar o projeto, você pode rodar o projeto passando o caminho do arquivo PDF do boleto como argumento.

#### Exemplo de Uso

Coloque seu arquivo PDF na pasta raiz do projeto (ou em outro diretório).

Execute o projeto:

```bash
node dist/index.js ./boleto.pdf
```

#### Saída Esperada

O script irá processar todas as páginas do PDF, procurando pelo código de barras. Se o código for encontrado, ele será decodificado e exibido no terminal. Exemplo de saída:

```bash
Número total de páginas no PDF: 6
Processando página 1
Processando página 2
...
Código de barras lido com sucesso: 01234500000000000000000123456789012345678901
```

### Estrutura do Código

#### index.ts

O arquivo index.ts é o ponto de entrada do projeto. Ele chama o módulo processBoleto passando o caminho do arquivo PDF.

```typescript
import { processBoleto } from "./processBoleto";

const pdfPath = "./boleto.pdf"; // Altere para o caminho do seu arquivo PDF
processBoleto(pdfPath).catch((error) => {
  console.error("Erro ao processar o boleto:", error);
});
```

#### processBoleto.ts

Responsável por coordenar todo o processo de leitura e decodificação do boleto, processando todas as páginas do PDF até encontrar um código de barras válido.

```typescript
export async function processBoleto(pdfPath: string): Promise<void> {
  // Leitura do PDF e extração de páginas
}
```

#### extractPage.ts

Extrai cada página do PDF e a converte em uma imagem utilizando o Poppler.

```typescript
export async function extractPageFromPDF(
  pdfPath: string,
  pageNum: number
): Promise<string> {
  // Conversão de PDF para PNG
}
```

#### readBarcode.ts

Lê e decodifica o código de barras de uma imagem utilizando a biblioteca Quagga2.

```typescript
export async function readBarcode(imagePath: string): Promise<string> {
  // Decodificação do código de barras
}
```

### Tecnologias Utilizadas

- Node.js: Ambiente de execução JavaScript.
- TypeScript: Superset de JavaScript com tipagem estática.
- Poppler: Utilizado para conversão de PDFs para imagens.
- Quagga2: Biblioteca de código de barras para ler códigos no formato i2of5.
- PDF-lib: Manipulação de arquivos PDF no Node.js.

#### Possíveis Melhorias

- Suporte a mais formatos de códigos de barras.
  -Interface gráfica para facilitar o upload de arquivos PDF.
  -Integração com APIs de banco para validação de boletos.

### Contribuições

Sinta-se à vontade para abrir issues e pull requests no repositório. Qualquer ajuda é bem-vinda!

### Licença

MIT License

> > > > > > > master

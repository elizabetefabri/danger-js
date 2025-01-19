import * as hcl from 'hcl2-parser';

export const parseTerraformFile = (fileContent: string): { resource?: Record<string, unknown> } => {
    const parsedArray = hcl.parseToObject(fileContent); // Usa o parser HCL
    return parsedArray[0] || {}; // Retorna o primeiro elemento (ou um objeto vazio)
  };
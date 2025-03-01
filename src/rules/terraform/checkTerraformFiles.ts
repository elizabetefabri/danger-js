import { message, warn } from "danger";

export function checkTerraformFiles(danger) {
    const modifiedFiles = danger.git.modified_files;
  
    // Verifica se arquivos Terraform foram alterados
    const terraformFiles = modifiedFiles.filter(file => file.endsWith('.tf'));
  
    if (terraformFiles.length === 0) {
      warn('Nenhum arquivo Terraform foi modificado.');
    } else {
      message(`Os seguintes arquivos Terraform foram modificados: ${terraformFiles.join(', ')}`);
    }
  }  
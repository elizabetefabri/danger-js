const { message, warn } = require("danger");

function checkTerraformFiles(danger) {
    const modifiedFiles = danger.git.modified_files;

    // ✅ Verifica se arquivos Terraform foram alterados
    const terraformFiles = modifiedFiles.filter(file => file.endsWith(".tf"));

    if (terraformFiles.length === 0) {
        warn("Nenhum arquivo Terraform foi modificado.");
    } else {
        message(`Os seguintes arquivos Terraform foram modificados: ${terraformFiles.join(", ")}`);
    }
}

// ✅ Exporta a função para que o `dangerfile.js` possa utilizá-la
module.exports = { checkTerraformFiles };

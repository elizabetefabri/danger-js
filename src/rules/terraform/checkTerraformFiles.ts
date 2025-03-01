const { message, warn } = require("danger");

function checkTerraformFiles(danger) {
    console.log("✅ checkTerraformFiles.js foi chamado!");

    const modifiedFiles = danger.git.modified_files;

    // ✅ Verifica se arquivos Terraform foram alterados
    const terraformFiles = modifiedFiles.filter(file => file.endsWith(".tf"));

    if (terraformFiles.length === 0) {
        warn("⚠️ Nenhum arquivo Terraform foi modificado.");
        console.log("⚠️ Nenhum arquivo Terraform foi encontrado.");
    } else {
        message(`📂 Os seguintes arquivos Terraform foram modificados: ${terraformFiles.join(", ")}`);
        console.log(`📂 Arquivos Terraform modificados: ${terraformFiles.join(", ")}`);
    }
}

// ✅ Exporta a função para que o `dangerfile.js` possa utilizá-la
module.exports = { checkTerraformFiles };

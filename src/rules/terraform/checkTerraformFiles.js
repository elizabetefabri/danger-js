function validate(danger) {
    console.log("✅ checkTerraformFiles.js foi chamado!");

    const modifiedFiles = danger.git.modified_files;
    const terraformFiles = modifiedFiles.filter(file => file.endsWith(".tf"));

    if (terraformFiles.length === 0) {
        warn("⚠️ Nenhum arquivo Terraform foi modificado.");
    } else {
        message(`📂 Arquivos Terraform modificados: ${terraformFiles.join(", ")}`);
    }
}

module.exports = { validate };

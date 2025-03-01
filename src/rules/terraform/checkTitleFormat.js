const fs = require("node:fs");

function validate(danger) {
    const terraformFile = "src/main.tf"; // Caminho do arquivo a validar

    if (!fs.existsSync(terraformFile)) {
        warn("⚠️ O arquivo `main.tf` não foi encontrado no PR.");
        return;
    }

    const content = fs.readFileSync(terraformFile, "utf-8");

    // ✅ Checa se o arquivo contém a tag 'Name' no bloco 'tags'
    if (!content.match(/tags\s*=\s*{[^}]*Name\s*=/)) {
        fail("🚨 O arquivo `main.tf` deve conter um título no campo `tags = { Name = \"...\" }`.");
    } else {
        message("✅ O arquivo `main.tf` contém um título adequado.");
    }
}

module.exports = { validate };

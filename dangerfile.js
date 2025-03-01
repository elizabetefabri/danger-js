const { fail, warn, message, danger } = require("danger");
const fs = require("node:fs");
const path = require("node:path");

// ✅ Caminho absoluto para garantir que o Node.js encontre os arquivos corretamente
const rulesPath = path.join(__dirname, "src", "rules", "terraform");

console.log(`🔍 Buscando arquivos de regras em: ${rulesPath}`);

try {
  const ruleFiles = fs.readdirSync(rulesPath, { encoding: "utf-8" });

  if (ruleFiles.length === 0) {
    console.log("⚠️ Nenhum arquivo de regra encontrado!");
  }

  for (const file of ruleFiles) {
    if (file.endsWith(".js")) {
      const rulePath = path.join(rulesPath, file);
      console.log(`📌 Encontrado arquivo de regra: ${rulePath}`);

      // ✅ Use require com caminho absoluto
      const ruleModule = require(rulePath);

      if (typeof ruleModule.checkTerraformFiles === "function") {
        console.log(`🚀 Executando ${file}`);
        ruleModule.checkTerraformFiles(danger);
      } else {
        console.log(`⚠️ ${file} não contém uma função checkTerraformFiles válida.`);
      }
    }
  }
} catch (error) {
  console.error("❌ Erro ao carregar regras de Terraform:", error);
}

message("📖 Iniciando a validação do Pull Request...");
message("📖 Todas as validações foram concluídas com sucesso!");

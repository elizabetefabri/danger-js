const { fail, warn, message, danger } = require("danger");
const fs = require("node:fs");
const path = require("node:path");

// Verificação de branch
const branchName = danger.github.pr.head.ref;
const validBranchPatterns = [/^feature\//, /^hotfix\//];

const isValidBranch = validBranchPatterns.some((pattern) => pattern.test(branchName));

if (!isValidBranch) {
  fail(`🚫 A branch \`${branchName}\` não segue os padrões esperados. Use os prefixos \`feature/\` ou \`hotfix/\`.`);
} else {
  message(`📖 A branch \`${branchName}\` segue o padrão esperado. 👍`);
}

// Caminho da pasta onde estão as regras
const rulesPath = path.join(__dirname, "src", "rules", "terraform");

try {
  console.log("🔍 Buscando arquivos de regras em:", rulesPath);

  const ruleFiles = fs.readdirSync(rulesPath, { encoding: "utf-8" });

  for (const file of ruleFiles) {
    if (file.endsWith(".js")) {
      console.log(`📌 Encontrado arquivo de regra: ${file}`);
      const ruleModule = require(path.join(rulesPath, file));

      // Executa a função de validação se ela existir
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

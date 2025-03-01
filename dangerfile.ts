const { danger, fail, warn, message } = require("danger");
const fs = require("node:fs");
const path = require("node:path");

// Verifica se a branch segue os padrões esperados
const branchName = danger.github.pr.head.ref;
const validBranchPatterns = [/^feature\//, /^hotfix\//];

const isValidBranch = validBranchPatterns.some((pattern) =>
  pattern.test(branchName)
);

if (!isValidBranch) {
  fail(
    `A branch \`${branchName}\` não segue os padrões esperados. Use os prefixos \`feature/\` ou \`hotfix/\`.`
  );
} else {
  message(`A branch \`${branchName}\` segue o padrão esperado. 👍`);
}

// Verifica se a descrição do PR tem pelo menos 10 caracteres
if (danger.github.pr.body.length < 10) {
  warn("Por favor, adicione uma descrição ao PR com pelo menos 10 caracteres.");
}

// Caminho da pasta onde estão as regras
const rulesPath = path.join(__dirname, "src", "rules", "terraform");

try {
  const ruleFiles = fs.readdirSync(rulesPath, { encoding: "utf-8" });

  for (const file of ruleFiles) {
    if (file.endsWith(".ts")) {
      require(path.join(rulesPath, file)).validate(danger);
    }
  }
} catch (error) {
  console.error("Erro ao ler a pasta de regras:", error);
}

message("Iniciando a validação do Pull Request...");
message("Todas as validações foram concluídas com sucesso!");

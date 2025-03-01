import dangerDefault from "danger";
const { danger, fail, warn, message } = dangerDefault;

import * as fs from "node:fs";
import * as path from "node:path";

// Verifica se a branch segue os padrões esperados
const branchName: string = danger.github.pr.head.ref;
const validBranchPatterns: RegExp[] = [/^feature\//, /^hotfix\//];

const isValidBranch: boolean = validBranchPatterns.some((pattern) =>
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
  const ruleFiles: string[] = fs.readdirSync(rulesPath, { encoding: "utf-8" });

  for (const file of ruleFiles) {
    if (file.endsWith(".ts")) {
      import(path.join(rulesPath, file))
        .then((ruleModule) => {
          if (typeof ruleModule.validate === "function") {
            ruleModule.validate(danger);
          }
        })
        .catch((err) => console.error(`Erro ao carregar regra: ${file}`, err));
    }
  }
} catch (error) {
  console.error("Erro ao ler a pasta de regras:", error);
}

message("Iniciando a validação do Pull Request...");
message("Todas as validações foram concluídas com sucesso!");

import { fileURLToPath } from "node:url";
import * as path from "node:path";
import * as fs from "node:fs";
import { fail, danger, warn } from "danger";

// Ajuste para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exportamos a função principal para o Danger.js
export default async () => {
    if (!danger.github) return;

    // ✅ Verifica se o PR é grande demais
    const bigPRThreshold = 300;
    if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
        warn(":exclamation: O Pull Request parece ser grande. Considere dividi-lo em PRs menores para facilitar a revisão.");
    }

    // ✅ Garante que o PR tem um responsável
    if (!danger.github.pr.assignee) {
        fail("Atribua alguém para revisar e mesclar este PR.");
    }

    // ✅ Verifica se houve alterações no CHANGELOG.md
    const hasChangelog = danger.git.modified_files.includes("CHANGELOG.md");
    const isTrivial = (danger.github.pr.body + danger.github.pr.title).includes("#trivial");

    if (!hasChangelog && !isTrivial) {
        warn("Por favor, adicione uma entrada no CHANGELOG.md para as suas alterações.");
    }

    // ✅ Evita mudanças indevidas na versão do package.json
    const packageDiff = await danger.git.JSONDiffForFile("package.json");

    if (packageDiff.version && danger.github.pr.user.login !== "orta") {
        fail("Por favor, não altere a versão do pacote manualmente.");
    }

    // ✅ Caminho da pasta onde estão as regras personalizadas
    const rulesPath = path.join(__dirname, "src", "rules", "terraform");

    try {
        const ruleFiles = fs.readdirSync(rulesPath, { encoding: "utf-8" });

        for (const file of ruleFiles) {
            if (file.endsWith(".ts")) {
                const ruleModule = await import(path.join(rulesPath, file));
                if (typeof ruleModule.validate === "function") {
                    ruleModule.validate(danger);
                }
            }
        }
    } catch (error) {
        console.error("Erro ao ler a pasta de regras:", error);
    }

    // ✅ Resumo no PR
    danger.github.setSummaryMarkdown("✅ Tudo parece correto!");
};

const fs = require("node:fs");
const path = require("node:path");

// ✅ Verifica se 'danger' foi definido corretamente
if (typeof danger === "undefined") {
    console.error("❌ O Danger.js não está sendo executado no ambiente correto.");
    console.error("🔹 Use: npx danger ci --dangerfile=dangerfile.js");
    process.exit(1);
}

console.log("🚀 Iniciando Danger.js");

// ✅ Caminho da pasta onde estão todas as regras
const rulesPath = path.join(__dirname, "src", "rules", "terraform");

console.log(`🔍 Buscando arquivos de regras em: ${rulesPath}`);

try {
    const ruleFiles = fs.readdirSync(rulesPath, { encoding: "utf-8" });

    if (ruleFiles.length === 0) {
        console.log("⚠️ Nenhum arquivo de regra encontrado!");
    }

    for (const file of ruleFiles) {
        if (file.endsWith(".js")) {
            const rulePath = path.resolve(rulesPath, file);
            console.log(`📌 Encontrado arquivo de regra: ${rulePath}`);

            // ✅ Carregar o módulo dinamicamente
            const ruleModule = require(rulePath);

            // ✅ Executa a função 'validate' se existir
            if (typeof ruleModule.validate === "function") {
                console.log(`🚀 Executando ${file}`);
                ruleModule.validate(danger);
            } else {
                console.log(`⚠️ ${file} não contém uma função 'validate' válida.`);
            }
        }
    }
} catch (error) {
    console.error("❌ Erro ao carregar regras de Terraform:", error);
}

console.log("✅ Validações concluídas!");

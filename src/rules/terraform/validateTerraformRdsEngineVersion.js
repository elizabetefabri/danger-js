const fs = require("node:fs");
const { RDSClient, DescribeDBEngineVersionsCommand } = require("@aws-sdk/client-rds");

// ✅ Função para buscar versões disponíveis na AWS
async function fetchEngineVersions(engine) {
    try {
        const client = new RDSClient({}); // Assume a Role automaticamente
        const command = new DescribeDBEngineVersionsCommand({ Engine: engine });
        const response = await client.send(command);

        return response.DBEngineVersions.map(v => v.EngineVersion);
    } catch (error) {
        console.error(`❌ Erro ao buscar versões do ${engine}:`, error);
        return [];
    }
}

// ✅ Validação do Terraform no Danger.js
async function validate(danger) {
    const terraformFile = "src/main.tf"; // Caminho do Terraform

    if (!fs.existsSync(terraformFile)) {
        warn("⚠️ O arquivo `main.tf` não foi encontrado no PR.");
        return;
    }

    const content = fs.readFileSync(terraformFile, "utf-8");

    // 🔍 Captura a engine e a versão usada no Terraform
    const engineMatch = content.match(/engine\s*=\s*"([^"]+)"/);
    const versionMatch = content.match(/engine_version\s*=\s*"([^"]+)"/);

    if (!engineMatch || !versionMatch) {
        fail("🚨 O `main.tf` não define corretamente `engine` ou `engine_version`.");
        return;
    }

    const engine = engineMatch[1];
    const version = versionMatch[1];

    console.log(`🔍 Verificando engine: ${engine}, versão: ${version}`);

    const availableVersions = await fetchEngineVersions(engine);

    if (availableVersions.length === 0) {
        warn(`⚠️ Não foi possível validar as versões do banco ${engine}.`);
        return;
    }

    if (!availableVersions.includes(version)) {
        fail(`🚨 A versão \`${version}\` para \`${engine}\` está obsoleta ou não disponível! 🚫`);
    } else {
        message(`✅ A versão \`${version}\` para \`${engine}\` é válida! 🎉`);
    }
}

module.exports = { validate };

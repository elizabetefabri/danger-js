function validate(danger) {
    if (!danger || !danger.github || !danger.github.issue) {
        console.error("❌ Erro: O objeto 'danger' não está definido corretamente.");
        return;
    }

    const prLabels = danger.github.issue.labels.map(label => label.name);
    console.log(`🏷️ Verificando tags do PR: ${prLabels.join(", ")}`);

    if (!prLabels.includes("terraform")) {
        warn("⚠️ Este PR parece ser relacionado ao Terraform, mas não possui a tag `terraform`.");
    }
}

module.exports = { validate };

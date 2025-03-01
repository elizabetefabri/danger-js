function validate(danger) {
    const prTitle = danger.github.pr.title;
    console.log(`🔍 Validando título do PR: "${prTitle}"`);

    const titleRegex = /^(feature|bugfix|hotfix)\/[A-Z]+-\d+ .+$/;

    if (!titleRegex.test(prTitle)) {
        fail("🚨 O título do PR deve seguir o formato correto: `feature/ABC-123 Descrição do PR`.");
    }
}

module.exports = { validate };

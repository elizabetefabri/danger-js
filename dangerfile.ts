import {danger, warn, fail} from 'danger';

const reviewLargePR = () => {
    const bigPRThreshold = 300;
    if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
        warn(`"Teste".`);
    }
}
const ensurePRHasAssignee = () => {
    // Always ensure we assign someone, so that our Slackbot can do its work correctly
    if (danger.github.pr.assignee === null) {
    fail("Please assign someone to merge this PR, and optionally include people who should review.")
  }
}
reviewLargePR();
ensurePRHasAssignee();
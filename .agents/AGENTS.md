# Project-Scoped Rules: Git Workflow

- **Direct Main Branch Commits:** Do NOT create feature branches or pull requests. Work directly on the `main` branch.
- **Commit & Push:** After code changes are verified, stage, commit, and push directly to `main`:
  ```bash
  git add .
  git commit -m "<message>"
  git push origin main
  ```
- **No PRs / No Waiting:** Do not run `gh pr create` or open pull requests. Push directly once changes are committed and approved by the user.

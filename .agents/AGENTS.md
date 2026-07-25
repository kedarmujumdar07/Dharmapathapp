# Project-Scoped Rules: Git Workflow for Collaborators

- **No Direct Commits to Main:** Do NOT push directly to the `main` branch.
- **Task Workflow:**
  1. Always switch to `main` and pull the latest changes before starting a new task:
     ```bash
     git checkout main
     git pull origin main
     ```
  2. Create a new task branch off `main`:
     ```bash
     git checkout -b feature/<short-task-name>
     ```
  3. Implement changes, verify them, and commit with clear, descriptive messages.
  4. Push the task branch to remote:
     ```bash
     git push -u origin <branch-name>
     ```
  5. Create a Pull Request into `main` using:
     ```bash
     gh pr create --fill
     ```
     *(If the `gh` CLI tool is not configured/installed, instruct the user to open a Pull Request manually).*
- **No Auto-Merging:** Wait for teammate review/approval, and only merge after the user explicitly confirms it is approved.

# Contributing Guide

## Branching Strategy

- Keep `main` always deployable.
- Use short-lived branches from `main`:
  - `feature/<scope>` for product work
  - `fix/<scope>` for bug fixes
  - `docs/<scope>` for documentation-only updates
- Open a pull request for every branch.

## Commit Style

Use conventional commit prefixes:

- `feat:` new behavior
- `fix:` bug fix
- `chore:` tooling or maintenance
- `docs:` documentation updates
- `ci:` workflow updates

Keep commits focused to one concern.

## Local Validation Before PR

```bash
npm run lint
npm run build
```

## Pull Request Checklist

- [ ] Scope is small and focused
- [ ] Build passes locally
- [ ] Screenshots included for UI changes
- [ ] Environment variables documented

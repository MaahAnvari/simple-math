# simple-math

Minimal JavaScript project whose only purpose is to produce **JUnit XML unit test
reports** for the P4SaMD Verification demo — the GitHub Actions counterpart of the
GitLab `test-automatic-tests` (pytest) repo.

## Local run

```bash
npm ci
npm test              # watch-free run, human output
npm run test:junit    # same run, writes ./report.xml
```

`report.xml` is git-ignored: it is a build output, fetched from CI.

## CI

[`.github/workflows/tests.yml`](.github/workflows/tests.yml) runs on every push to
`main`, every pull request, and on demand (**Actions → tests → Run workflow**). It:

1. runs the suite and writes `report.xml`,
2. uploads it as the `junit-report` artifact — with `if: always()`, so the report is
   kept even when tests fail,
3. renders the results into the run summary and the PR checks.

## Getting the report into P4SaMD

**Actions → the run → Artifacts → `junit-report`** downloads a zip. Unzip it and
upload the `report.xml` inside on the project's Verification page — the zip itself is
rejected by the upload validation. There is no connector or webhook; ingestion is a
manual upload (automatic pull is SRS-UV-035, not implemented).

## Producing the demo fixtures

| Fixture | How |
|---|---|
| `report-v1-all-pass.xml` | a run of `main` as-is |
| `report-v1-all-pass-rerun.xml` | **Re-run all jobs** on the same commit — identical results, fresh timestamps |
| `report-v1-one-failure.xml` | flip one assertion (e.g. `multiply(2, 3)` to `7`), push to a branch |
| `report-v2-added-test.xml` | add a fourth `it(...)`, push to a branch |

Keep the test file paths and titles stable between runs: Vitest writes the file path
into `classname`, and P4SaMD's reconciliation and status inheritance match on test
identity. For the same reason, do not add `--shard` — sharded runs write one XML per
shard and the merged identity set will not line up with the baseline.

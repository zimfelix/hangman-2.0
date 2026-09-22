import { readdirSync, readFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const specsDirectory = resolve(webRoot, '../specs/web')
const testDirectories = [join(webRoot, 'src'), join(webRoot, 'tests')]
const storyIdPattern = /^(S\d+)[-_ ]/i
const statePattern = /^- \*\*State:\*\* (Modified|Implemented)\s*$/m
const acceptanceCriterionPattern = /^- \*\*(AK\d+):\*\*/gim
const evidencePattern =
  /^- \*\*(AK\d+) \[(Statisch|Manuell)\]:\*\*\s+(.+?)\s*$/gim
const passedEvidencePattern = /^`?PASS`?\s*(?:—|-|:)\s+.+$/i

function findFiles(directory, extension) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) return findFiles(path, extension)
    return extname(entry.name) === extension ? [path] : []
  })
}

function findExceptionEvidence(specification) {
  return new Map(
    [...specification.matchAll(evidencePattern)].map((match) => [
      match[1].toUpperCase(),
      match[3].trim(),
    ]),
  )
}

function checkSpecCoverage() {
  console.log('\n== Spec coverage ==')
  const specifications = findFiles(specsDirectory, '.md').filter((path) =>
    storyIdPattern.test(path.split('/').at(-1)),
  )

  if (specifications.length === 0) {
    console.log('[PASS] Spec coverage — no web story specs yet')
    return true
  }

  const testContent = testDirectories
    .flatMap((directory) => findFiles(directory, '.ts'))
    .map((path) => readFileSync(path, 'utf8').toLowerCase())
    .join('\n')
  const errors = []

  for (const specificationPath of specifications) {
    const fileName = specificationPath.split('/').at(-1)
    const storyMatch = fileName.match(storyIdPattern)
    if (storyMatch === null) continue

    const storyId = storyMatch[1].toUpperCase()
    const specification = readFileSync(specificationPath, 'utf8')
    if (!statePattern.test(specification)) {
      errors.push(`${fileName}: valid State is missing`)
    }

    const criteria = new Set(
      [...specification.matchAll(acceptanceCriterionPattern)].map((match) =>
        match[1].toUpperCase(),
      ),
    )
    if (criteria.size === 0) {
      errors.push(`${fileName}: no acceptance criteria found`)
      continue
    }

    const evidence = findExceptionEvidence(specification)
    for (const criterion of evidence.keys()) {
      if (!criteria.has(criterion)) {
        errors.push(`${fileName}: evidence references unknown ${criterion}`)
      }
    }

    for (const criterion of criteria) {
      const markers = [
        `${storyId}-${criterion}`,
        `${storyId}_${criterion}`,
      ].map((marker) => marker.toLowerCase())
      if (markers.some((marker) => testContent.includes(marker))) continue

      const exceptionEvidence = evidence.get(criterion)
      if (exceptionEvidence === undefined) {
        errors.push(
          `${fileName}: no test marker or static/manual evidence for ${storyId}-${criterion}`,
        )
      } else if (!passedEvidencePattern.test(exceptionEvidence)) {
        errors.push(`${fileName}: evidence for ${criterion} is not marked PASS`)
      }
    }
  }

  for (const error of errors) console.log(`  - ${error}`)
  console.log(`[${errors.length === 0 ? 'PASS' : 'FAIL'}] Spec coverage`)
  return errors.length === 0
}

process.exitCode = checkSpecCoverage() ? 0 : 1

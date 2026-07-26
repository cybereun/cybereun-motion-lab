import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cliPath = path.join(projectRoot, 'cli', 'cybereun-motion.js');

function runCli(args: string[], cwd = projectRoot) {
  return execFileSync(process.execPath, [cliPath, ...args], {
    cwd,
    encoding: 'utf8',
  });
}

test('CLI help exposes the independent Cybereun commands and attribution', () => {
  const output = runCli(['--help']);

  assert.match(output, /Cybereun Motion CLI/);
  assert.match(output, /cybereun-motion init/);
  assert.match(output, /cybereun-motion add <컴포넌트>/);
  assert.match(output, /Syed Subhan Uddin/);
  assert.match(output, /MIT License/);
});

test('CLI initializes a project and adds a registry component', () => {
  const temporaryProject = mkdtempSync(path.join(tmpdir(), 'cybereun-motion-cli-'));
  writeFileSync(
    path.join(temporaryProject, 'package.json'),
    JSON.stringify({ name: 'cli-fixture', private: true }, null, 2),
  );

  runCli(['init'], temporaryProject);
  runCli(['add', 'fade-in', '--skip-install'], temporaryProject);

  const config = JSON.parse(
    readFileSync(path.join(temporaryProject, 'motion-lab.json'), 'utf8'),
  );
  const component = readFileSync(
    path.join(temporaryProject, 'src', 'components', 'motion-lab', 'fade-in.tsx'),
    'utf8',
  );

  assert.equal(config.componentsDir, 'src/components/motion-lab');
  assert.match(component, /export function FadeIn/);
  assert.match(component, /framer-motion/);
});

test('CLI list can filter the bundled registry', () => {
  const output = runCli(['list', 'terminal']);

  assert.match(output, /terminal-loader/);
});

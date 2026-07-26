#!/usr/bin/env node

import {
  access,
  mkdir,
  readFile,
  readdir,
  writeFile,
} from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const cliDirectory = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(cliDirectory, '..');
const registryDirectory = path.join(packageRoot, 'registry', 'ui');
const configFileName = 'motion-lab.json';
const defaultComponentsDir = 'src/components/motion-lab';

const colors = {
  cyan: (value) => (process.stdout.isTTY ? `\u001b[36m${value}\u001b[0m` : value),
  green: (value) => (process.stdout.isTTY ? `\u001b[32m${value}\u001b[0m` : value),
  yellow: (value) => (process.stdout.isTTY ? `\u001b[33m${value}\u001b[0m` : value),
  dim: (value) => (process.stdout.isTTY ? `\u001b[2m${value}\u001b[0m` : value),
};

function printHelp() {
  console.log(`
${colors.cyan('Cybereun Motion CLI')}
React 모션 컴포넌트를 프로젝트에 직접 추가하는 독립 실행형 도구

사용법
  cybereun-motion init [--dir <경로>]
  cybereun-motion list [검색어]
  cybereun-motion add <컴포넌트> [--dir <경로>] [--overwrite] [--skip-install]
  cybereun-motion doctor [--dir <경로>]
  cybereun-motion --version

예시
  cybereun-motion init
  cybereun-motion list loader
  cybereun-motion add fade-in
  cybereun-motion add terminal-loader --overwrite

저작권
  Cybereun Motion Lab은 Syed Subhan Uddin의 Amicro를 기반으로 합니다.
  원작자 저작권 및 MIT License 고지는 배포본에 포함됩니다.
`);
}

function parseArguments(rawArgs) {
  const positionals = [];
  const options = {
    dir: process.cwd(),
    overwrite: false,
    skipInstall: false,
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const argument = rawArgs[index];
    if (argument === '--dir' || argument === '-d') {
      const value = rawArgs[index + 1];
      if (!value) throw new Error('--dir 다음에 경로를 입력해 주세요.');
      options.dir = path.resolve(value);
      index += 1;
    } else if (argument === '--overwrite' || argument === '-o') {
      options.overwrite = true;
    } else if (argument === '--skip-install') {
      options.skipInstall = true;
    } else if (argument === '--help' || argument === '-h') {
      options.help = true;
    } else if (argument === '--version' || argument === '-v') {
      options.version = true;
    } else if (argument.startsWith('-')) {
      throw new Error(`알 수 없는 옵션입니다: ${argument}`);
    } else {
      positionals.push(argument);
    }
  }

  return { positionals, options };
}

async function pathExists(targetPath) {
  try {
    await access(targetPath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

async function readPackageVersion() {
  const packageJson = await readJson(path.join(packageRoot, 'package.json'));
  return packageJson.version;
}

async function findProjectRoot(startDirectory) {
  let currentDirectory = path.resolve(startDirectory);
  while (true) {
    if (await pathExists(path.join(currentDirectory, 'package.json'))) {
      return currentDirectory;
    }
    const parentDirectory = path.dirname(currentDirectory);
    if (parentDirectory === currentDirectory) return path.resolve(startDirectory);
    currentDirectory = parentDirectory;
  }
}

async function readConfig(projectRoot) {
  const configPath = path.join(projectRoot, configFileName);
  if (!(await pathExists(configPath))) {
    return {
      $schema: 'https://raw.githubusercontent.com/cybereun/cybereun-motion-lab/main/cli/schema.json',
      componentsDir: defaultComponentsDir,
    };
  }
  return readJson(configPath);
}

async function getRegistryItems() {
  const entries = await readdir(registryDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json') && entry.name !== 'registry.json')
    .map((entry) => entry.name.slice(0, -5))
    .sort((first, second) => first.localeCompare(second));
}

async function runPackageInstall(projectRoot, dependencies) {
  if (dependencies.length === 0) return;

  let command = 'npm';
  let args = ['install', ...dependencies];
  if (await pathExists(path.join(projectRoot, 'pnpm-lock.yaml'))) {
    command = 'pnpm';
    args = ['add', ...dependencies];
  } else if (await pathExists(path.join(projectRoot, 'yarn.lock'))) {
    command = 'yarn';
    args = ['add', ...dependencies];
  } else if (await pathExists(path.join(projectRoot, 'bun.lockb'))) {
    command = 'bun';
    args = ['add', ...dependencies];
  }

  console.log(colors.dim(`의존성 설치: ${command} ${args.join(' ')}`));
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`패키지 설치가 종료 코드 ${code}로 실패했습니다.`));
    });
  });
}

async function initializeProject(directory) {
  const projectRoot = await findProjectRoot(directory);
  const packageJsonPath = path.join(projectRoot, 'package.json');
  if (!(await pathExists(packageJsonPath))) {
    throw new Error('package.json을 찾지 못했습니다. React 프로젝트 폴더에서 다시 실행해 주세요.');
  }

  const configPath = path.join(projectRoot, configFileName);
  if (await pathExists(configPath)) {
    console.log(colors.yellow(`${configFileName}이 이미 있습니다.`));
    return;
  }

  const config = {
    $schema: 'https://raw.githubusercontent.com/cybereun/cybereun-motion-lab/main/cli/schema.json',
    componentsDir: defaultComponentsDir,
  };
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  await mkdir(path.join(projectRoot, defaultComponentsDir), { recursive: true });

  console.log(colors.green('Cybereun Motion Lab 설정을 만들었습니다.'));
  console.log(colors.dim(`설정: ${configPath}`));
  console.log(colors.dim(`컴포넌트: ${path.join(projectRoot, defaultComponentsDir)}`));
}

async function listComponents(query = '') {
  const normalizedQuery = query.toLowerCase();
  const items = (await getRegistryItems()).filter((item) =>
    item.toLowerCase().includes(normalizedQuery),
  );

  if (items.length === 0) {
    console.log('일치하는 컴포넌트가 없습니다.');
    return;
  }

  console.log(colors.cyan(`Cybereun Motion components (${items.length})`));
  const columns = process.stdout.columns && process.stdout.columns >= 80 ? 3 : 1;
  for (let index = 0; index < items.length; index += columns) {
    console.log(
      items
        .slice(index, index + columns)
        .map((item) => item.padEnd(30))
        .join(''),
    );
  }
}

async function addComponent(name, options) {
  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    throw new Error('컴포넌트 이름은 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다.');
  }

  const registryPath = path.join(registryDirectory, `${name}.json`);
  if (!(await pathExists(registryPath))) {
    throw new Error(`"${name}" 컴포넌트를 찾지 못했습니다. "cybereun-motion list ${name}"으로 검색해 보세요.`);
  }

  const projectRoot = await findProjectRoot(options.dir);
  if (!(await pathExists(path.join(projectRoot, 'package.json')))) {
    throw new Error('package.json을 찾지 못했습니다. React 프로젝트 폴더에서 실행해 주세요.');
  }

  const config = await readConfig(projectRoot);
  const outputDirectory = path.resolve(projectRoot, config.componentsDir || defaultComponentsDir);
  const relativeOutput = path.relative(projectRoot, outputDirectory);
  if (relativeOutput.startsWith('..') || path.isAbsolute(relativeOutput)) {
    throw new Error('componentsDir은 프로젝트 폴더 내부 경로여야 합니다.');
  }

  const registryItem = await readJson(registryPath);
  const sourceFile = registryItem.files?.[0];
  if (!sourceFile?.content) {
    throw new Error(`"${name}" 레지스트리에 복사할 소스가 없습니다.`);
  }

  await mkdir(outputDirectory, { recursive: true });
  const outputPath = path.join(outputDirectory, `${name}.tsx`);
  if ((await pathExists(outputPath)) && !options.overwrite) {
    throw new Error(`${path.relative(projectRoot, outputPath)}이 이미 있습니다. --overwrite로 교체할 수 있습니다.`);
  }

  await writeFile(outputPath, sourceFile.content, 'utf8');

  const packageJson = await readJson(path.join(projectRoot, 'package.json'));
  const installedDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  const missingDependencies = (registryItem.dependencies || []).filter(
    (dependency) => !installedDependencies[dependency],
  );

  if (!options.skipInstall) {
    await runPackageInstall(projectRoot, missingDependencies);
  } else if (missingDependencies.length > 0) {
    console.log(colors.yellow(`설치가 필요한 패키지: ${missingDependencies.join(', ')}`));
  }

  console.log(colors.green(`추가 완료: ${path.relative(projectRoot, outputPath)}`));
}

async function runDoctor(directory) {
  const projectRoot = await findProjectRoot(directory);
  const checks = [
    ['Node.js 18 이상', Number(process.versions.node.split('.')[0]) >= 18],
    ['package.json', await pathExists(path.join(projectRoot, 'package.json'))],
    [configFileName, await pathExists(path.join(projectRoot, configFileName))],
    ['컴포넌트 레지스트리', await pathExists(registryDirectory)],
  ];

  console.log(colors.cyan('Cybereun Motion CLI 진단'));
  for (const [label, passed] of checks) {
    console.log(`${passed ? colors.green('✓') : colors.yellow('!')} ${label}`);
  }
}

async function main() {
  const { positionals, options } = parseArguments(process.argv.slice(2));
  const [command, value] = positionals;

  if (options.version) {
    console.log(await readPackageVersion());
    return;
  }
  if (options.help || !command || command === 'help') {
    printHelp();
    return;
  }

  switch (command) {
    case 'init':
      await initializeProject(options.dir);
      break;
    case 'list':
      await listComponents(value || '');
      break;
    case 'add':
      await addComponent(value, options);
      break;
    case 'doctor':
      await runDoctor(options.dir);
      break;
    default:
      throw new Error(`알 수 없는 명령입니다: ${command}\n도움말: cybereun-motion --help`);
  }
}

main().catch((error) => {
  console.error(`\n${colors.yellow('오류:')} ${error.message}`);
  process.exitCode = 1;
});

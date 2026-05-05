import { spawn } from 'node:child_process';

const isWindows = process.platform === 'win32';

const children = [];

const runScript = (scriptName) => {
  const child = isWindows
    ? spawn('cmd.exe', ['/c', 'npm', 'run', scriptName], {
        stdio: 'inherit',
        shell: false
      })
    : spawn('npm', ['run', scriptName], {
        stdio: 'inherit',
        shell: false
      });

  child.on('exit', (code) => {
    if (code !== 0) {
      process.exitCode = code ?? 1;
      shutdown();
    }
  });

  children.push(child);
};

const shutdown = () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }
};

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

runScript('dev:client');
runScript('dev:server');

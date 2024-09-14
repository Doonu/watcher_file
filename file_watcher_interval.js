const chokidar = require('chokidar');
const { exec } = require('child_process');

const WORK_DIRECTORY = process.argv[2];
const SCRIPT_PATH = './auto_git_commit_push.bat';

if (!WORK_DIRECTORY) {
    console.error('Пожалуйста, укажите путь к файловой структуре.');
    process.exit(1);
}

const delay = 300000;

let timer = null;
let changesDetected = false;

const watcher = chokidar.watch(WORK_DIRECTORY, {
    ignored: /(^|[\/\\])\..|.*\.git.*/,
    persistent: true,
    ignoreInitial: true,
});

watcher.on('all', (event, path) => {
    console.log(`Изменение обнаружено: ${event} на ${path}`);
    changesDetected = true;

    if (!timer) {
        timer = setTimeout(() => {
            if (changesDetected) {
                console.log(`Выполняем скрипт в ${new Date().toLocaleString()}...`);
                exec(`"${SCRIPT_PATH}"`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Ошибка при выполнении скрипта: ${error}`);
                        return;
                    }
                    console.log(`Результат: ${stdout}`);
                    changesDetected = false;
                    timer = null;
                });
            }
        }, delay);
    }
});

console.log('Наблюдатель запущен...');

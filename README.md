# Файловый наблюдатель с автоматической отправкой изменений в GitHub

Этот проект отслеживает изменения в указанной директории и автоматически коммитит и пушит изменения в удаленный репозиторий GitHub через заданный интервал времени (например, каждые 5 минут).

# **Как использовать**

## **1. Установка зависимостей**

Перед началом работы установите необходимые зависимости (например, `chokidar`):

```bash
npm install
```
## **2. Запуск файлового наблюдателя**

```bash
node file_watcher_interval.js "Директория"
```

## **3. Как это работает**

### **Коммит и пуш изменений:**

- Когда в отслеживаемой директории обнаруживается изменение, программа запускает таймер (по умолчанию 3 секунды). Если в течение этого времени происходит ещё одно изменение, таймер не сбрасывается.
- После истечения времени таймера программа автоматически выполняет следующие действия:
    - Добавляет изменения в локальный Git (`git add .`).
    - Выполняет коммит с сообщением, содержащим текущие дату и время.
    - Выполняет `git push` для отправки изменений в удалённый репозиторий.

### **Периодическая проверка на наличие изменений в удалённом репозитории:**

- Программа каждые 30 минут (по умолчанию) выполняет проверку изменений в удалённом репозитории с помощью команды `git fetch`.
- Если локальный репозиторий отстаёт от удалённого, программа автоматически выполняет `git pull`, чтобы подтянуть изменения.

### **Конфигурация**

- **Задержка перед выполнением коммитов и пуша:** Задержка на выполнение коммитов и пуша составляет  5 минут по умолчанию. Этот параметр можно изменить в коде, изменив значение переменной `delayPush`.
- **Интервал проверки удалённых изменений:** Программа проверяет удалённый репозиторий каждые 30 минут (по умолчанию). Этот интервал можно изменить, изменив значение переменной `delayPull` или передав другой интервал в функцию `startRemoteCheckInterval`.

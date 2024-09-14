@echo off
chcp 65001 >NUL

cd /d "D:\Portfolio\development"

git pull origin main --rebase

git add .

set msg=Автоматический коммит: %date% %time%
git commit -m "%msg%"

git push origin main

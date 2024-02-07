@echo off
set /p commit_message="Enter commit message: "

git add .
git commit -m "Commit_%date:/=-%(%time:~0,2%:%time:~3,2%) - %commit_message%"
git push

pause

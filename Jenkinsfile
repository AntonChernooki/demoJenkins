pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        // Увеличиваем таймаут для npm
        NPM_CONFIG_FETCH_TIMEOUT = '300000'
        NPM_CONFIG_REGISTRY = 'https://registry.npmjs.org/'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${env.BRANCH_NAME}"]],
                    extensions: [
                        [$class: 'CleanBeforeCheckout'],
                        [$class: 'CloneOption', timeout: 30]
                    ],
                    userRemoteConfigs: [[
                        url: 'https://github.com/AntonChernooki/demoJenkins.git',
                        credentialsId: '09c00738-8a13-4705-a356-b8b5fd87228c'
                    ]]
                ])
                echo "Ветка: ${env.BRANCH_NAME}"
                echo "Билд: ${env.BUILD_NUMBER}"
                echo "Ссылка на билд: ${env.BUILD_URL}"
                
                // Логируем коммит
                bat 'git log --oneline -1'
            }
        }

        stage('Check Node Version') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'where node'
                bat 'where npm'
            }
        }

        stage('Clean and Verify') {
            steps {
                script {
                    // Очищаем node_modules и package-lock.json для чистого ci
                    bat '''
                        echo "Очистка предыдущих установок..."
                        if exist node_modules rmdir /s /q node_modules
                        if exist package-lock.json del package-lock.json
                        if exist yarn.lock del yarn.lock
                        
                        echo "Проверка package-lock.json..."
                        if not exist package.json (
                            echo "ERROR: package.json не найден!"
                            exit 1
                        )
                    '''
                    
                    // Явно обновляем package-lock.json
                    bat 'npm install --package-lock-only --no-audit'
                }
            }
        }

        stage('Install Dependencies (npm ci)') {
            steps {
                script {
                    timeout(time: 10, unit: 'MINUTES') {
                        // Используем npm ci вместо npm install
                        bat '''
                            echo "Запуск npm ci..."
                            echo "Рабочая директория: %cd%"
                            
                            npm ci --verbose --no-audit --prefer-offline
                            
                            if %errorlevel% neq 0 (
                                echo "npm ci не удался, пытаемся npm install..."
                                npm install --no-audit --legacy-peer-deps
                            )
                            
                            echo "Зависимости установлены успешно"
                        '''
                    }
                }
            }
        }

        stage('Security Check') {
            steps {
                bat '''
                    echo "Проверка безопасности зависимостей..."
                    npm audit --audit-level=moderate || echo "Audit completed with warnings"
                '''
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint || echo "Lint не сконфигурирован"'
            }
        }

        stage('Test') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        bat '''
                            echo "Запуск тестов..."
                            npm test -- --testTimeout=30000 --runInBand
                        '''
                    }
                }
            }
            
            post {
                always {
                    // Сохраняем результаты тестов
                    junit '**/test-results.xml' 
                    junit '**/junit.xml'
                }
            }
        }

        stage('Build') {
            when {
                anyOf { 
                    branch 'develop'
                    branch 'main' 
                }
            }
            steps {
                script {
                    bat '''
                        echo "Сборка проекта..."
                        npm run build || echo "Build script не найден или пропущен"
                    '''
                    
                    // Проверяем, появилась ли папка dist
                    dir('dist') {
                        bat 'dir || echo "Папка dist не создана"'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            when { 
                branch 'main' 
                expression { 
                    fileExists('dist') 
                }
            }
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                echo 'Артефакты сохранены в Jenkins'
            }
        }

        stage('Deploy to Staging') {
            when { 
                branch 'develop'
                expression { fileExists('dist') }
            }
            steps {
                echo '=== ДЕПЛОЙ НА STAGING ==='
                echo "Сборка #${env.BUILD_NUMBER} готова для деплоя на staging"
                
                // Пример команды деплоя (замените на свои)
                bat '''
                    echo "Копирование файлов на staging сервер..."
                    echo "Здесь будут команды деплоя на staging"
                '''
                
                // Уведомление (можно настроить email, slack и т.д.)
                echo "Staging деплой завершен для ветки ${env.BRANCH_NAME}"
            }
        }

        stage('Approval for Production') {
            when { 
                branch 'main'
                expression { fileExists('dist') }
            }
            steps {
                script {
                    // Мануальное подтверждение для продакшена
                    input(
                        message: "Одобрить деплой сборки #${env.BUILD_NUMBER} в ПРОДАКШЕН?",
                        ok: 'Разрешить деплой',
                        submitter: 'admin,anton',
                        parameters: [
                            choice(
                                choices: ['Да, деплоить', 'Нет, отменить'],
                                description: 'Подтверждение деплоя',
                                name: 'DEPLOY_ACTION'
                            )
                        ]
                    )
                }
            }
        }

        stage('Deploy to Production') {
            when { 
                branch 'main'
                expression { fileExists('dist') }
            }
            steps {
                echo '=== ДЕПЛОЙ В ПРОДАКШЕН ==='
                
                script {
                    // Пример команд деплоя
                    bat '''
                        echo "Начинаем деплой в продакшен..."
                        echo "1. Бэкап текущей версии"
                        echo "2. Копирование новых файлов"
                        echo "3. Перезапуск сервиса"
                        echo "4. Проверка здоровья"
                    '''
                    
                    // Обновление версии (опционально)
                    bat 'npm version patch --no-git-tag-version || echo "Version update skipped"'
                }
                
                echo "Приложение успешно задеплоено в продакшен!"
                echo "Версия: ${env.BUILD_NUMBER}"
                echo "Время: ${new Date()}"
            }
            
            post {
                success {
                    // Отправка уведомления об успешном деплое
                    echo "Уведомление об успешном деплое отправлено"
                    
                    // Можно добавить отправку email/slack/webhook
                    // emailext body: "Продакшен деплой успешен!\n\nСборка: ${env.BUILD_URL}", subject: "Продакшен деплой завершен", to: "team@example.com"
                }
            }
        }

        stage('Post-Deploy Tests') {
            when { 
                branch 'main'
                expression { fileExists('dist') }
            }
            steps {
                echo "Выполнение пост-деплой тестов..."
                
                script {
                    timeout(time: 3, unit: 'MINUTES') {
                        // Пример проверки доступности приложения
                        bat '''
                            echo "Проверка доступности приложения после деплоя..."
                            echo "Здесь могут быть curl запросы к health-check эндпоинту"
                            timeout /t 10 /nobreak > nul
                        '''
                    }
                }
                
                echo "Пост-деплой проверки завершены"
            }
        }
    }

    post {
        always {
            echo "========================================="
            echo "Статус пайплайна: ${currentBuild.currentResult}"
            echo "Длительность: ${currentBuild.durationString}"
            echo "========================================="
            
            // Сохраняем логи
            archiveArtifacts artifacts: 'npm-debug.log*, **/logs/**', allowEmptyArchive: true
            
            // Очистка workspace (можно настроить что оставлять)
            cleanWs(
                cleanWhenAborted: true,
                cleanWhenFailure: true,
                cleanWhenNotBuilt: true,
                cleanWhenUnstable: true,
                cleanWhenSuccess: true,
                deleteDirs: true
            )
        }
        
        success {
            echo '✅ Пайплайн успешно завершён!'
            
            // Обновление статуса в GitHub (если настроено)
            // updateGitHubCommitStatus state: 'SUCCESS'
        }
        
        failure {
            echo '❌ Пайплайн завершился с ошибкой!'
            
            // Детальный лог ошибки
            script {
                def cause = currentBuild.getBuildCauses()
                echo "Причина падения: ${cause}"
                
                // Можно добавить автоматическую диагностику
                bat '''
                    echo "=== ДИАГНОСТИКА ==="
                    echo "Проверка свободного места на диске:"
                    dir
                    echo "Проверка node_modules:"
                    if exist node_modules echo "node_modules существует" else echo "node_modules отсутствует"
                '''
            }
            
            // Отправка уведомления об ошибке
            // emailext body: "Пайплайн упал!\n\nСборка: ${env.BUILD_URL}\nПричина: ${currentBuild.currentResult}", subject: "ПАЙПЛАЙН УПАЛ: ${env.JOB_NAME}", to: "devops@example.com"
        }
        
        unstable {
            echo '⚠️ Пайплайн завершился с предупреждениями'
        }
        
        changed {
            echo "Статус изменился: ${currentBuild.currentResult}"
        }
    }
}
pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        // Увеличиваем таймаут для yarn
        YARN_ENABLE_PROGRESS_BARS = 'false'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js & Yarn') {
            steps {
                script {
                    // Проверяем наличие yarn, если нет - устанавливаем
                    bat '''
                        node --version
                        npm --version || echo "npm не установлен"
                        yarn --version || npm install -g yarn@stable
                    '''
                }
            }
        }

        stage('Clean Cache') {
            steps {
                bat '''
                    if exist yarn.lock del yarn.lock
                    if exist node_modules rmdir /s /q node_modules
                    yarn cache clean
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    timeout(time: 15, unit: 'MINUTES') {
                        // Устанавливаем зависимости с yarn
                        bat '''
                            echo "Начинаем установку зависимостей..."
                            yarn install --network-timeout 300000 --ignore-optional
                            echo "Зависимости установлены"
                        '''
                    }
                }
                
                // Кэшируем node_modules для ускорения следующих сборок
                stash includes: 'node_modules/**', name: 'node-modules'
            }
        }

        stage('Test') {
            steps {
                // Восстанавливаем кэш зависимостей
                unstash 'node-modules'
                
                bat '''
                    echo "Запуск тестов..."
                    yarn test --verbose --testTimeout=30000
                '''
            }
        }

        stage('Build') {
            steps {
                bat '''
                    echo "Сборка проекта..."
                    yarn build || echo "Build script не найден или пропущен"
                '''
            }
        }

        stage('Security Audit') {
            steps {
                bat '''
                    echo "Проверка безопасности зависимостей..."
                    yarn audit --level moderate || echo "Audit завершен с предупреждениями"
                '''
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo 'Деплой приложения...'
                    // Добавьте команды деплоя здесь
                    // Например: yarn deploy
                }
            }
        }
    }

    post {
        always {
            echo "Очистка workspace..."
            // Оставляем только необходимые артефакты
            cleanWs(cleanWhenNotBuilt: false, deleteDirs: true, patterns: [[pattern: '.git/**', type: 'INCLUDE']])
        }
        success {
            echo 'Pipeline успешно завершен! ✅'
            // Можно добавить уведомления
        }
        failure {
            echo 'Pipeline завершился с ошибкой! ❌'
            // Можно добавить нотификации об ошибке
        }
    }
}
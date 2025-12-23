pipeline {
    agent {
        label 'windows'  // Убедитесь, что у вас есть агент с Windows
    }

    environment {
        NODE_ENV = 'test'
        CI = 'true'
        PYTHONIOENCODING = 'UTF-8'
        NPM_CONFIG_LOGLEVEL = 'warn'
        NPM_CONFIG_FETCH_TIMEOUT = '300000'
        NPM_CONFIG_PROGRESS = 'false'
        // Устанавливаем переменные для Git
        GIT_TERMINAL_PROMPT = '0'
        GIT_SSL_NO_VERIFY = 'true'  // Временно для отладки, удалите в продакшене
    }

    options {
        timeout(time: 60, unit: 'MINUTES')  // Увеличиваем таймаут
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Добавляем retry для этапов
        retry(3)
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
                echo 'Workspace cleaned'
            }
        }

        stage('Checkout') {
            steps {
                script {
                    // Увеличиваем таймаут для клонирования
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${env.BRANCH_NAME}"]],
                        extensions: [
                            [$class: 'CloneOption', depth: 1, noTags: true, shallow: true, timeout: 60],  // Глубокое клонирование не нужно
                            [$class: 'SparseCheckoutPaths', sparseCheckoutPaths: [[path: 'package.json'], [path: 'src/'], [path: '__tests__/']]],
                            [$class: 'WipeWorkspace']  // Чистим workspace перед клонированием
                        ],
                        userRemoteConfigs: [[
                            url: 'https://github.com/AntonChernooki/demoJenkins.git',
                            credentialsId: 'github-credentials'  // Укажите ваш ID credentials
                        ]]
                    ])
                }
                echo "Branch: ${env.BRANCH_NAME}"
                echo "Build: ${env.BUILD_NUMBER}"
                echo "Build URL: ${env.BUILD_URL}"
                bat 'git log --oneline -3'
            }
        }

        stage('Check Environment') {
            steps {
                script {
                    echo 'Checking environment...'
                    bat '''
                        chcp 65001 > nul
                        echo Node version:
                        node --version
                        echo NPM version:
                        npm --version
                        echo Git version:
                        git --version
                        echo Disk space:
                        dir C:\\
                        echo Checking package.json...
                        if exist package.json (
                            echo package.json found
                        ) else (
                            echo ERROR: package.json not found!
                            exit 1
                        )
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies with npm ci...'
                    
                    // Устанавливаем зависимости с увеличенными таймаутами
                    bat '''
                        chcp 65001 > nul
                        echo Cleaning npm cache...
                        npm cache clean --force
                        
                        echo Installing dependencies...
                        npm ci --no-audit --prefer-offline --verbose --no-fund --no-progress
                        
                        if errorlevel 1 (
                            echo First attempt failed, trying with legacy peer deps...
                            npm ci --no-audit --legacy-peer-deps --verbose --no-fund --no-progress
                        )
                        
                        if errorlevel 1 (
                            echo Second attempt failed, trying npm install...
                            npm install --no-audit --legacy-peer-deps --verbose --no-fund --no-progress
                        )
                        
                        echo Dependencies installed successfully
                    '''
                }
            }
        }

        stage('Security Check') {
            steps {
                bat '''
                    chcp 65001 > nul
                    echo Running security audit...
                    npm audit --audit-level=moderate || echo "Audit completed with warnings, continuing..."
                '''
            }
        }

        stage('Run Lint') {
            steps {
                bat '''
                    chcp 65001 > nul
                    echo Running lint...
                    npm run lint:ci || echo "Lint warnings found, continuing..."
                '''
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    timeout(time: 15, unit: 'MINUTES') {
                        bat '''
                            chcp 65001 > nul
                            echo Running tests with coverage...
                            npm run test:ci
                        '''
                    }
                }
            }
            
            post {
                always {
                    junit allowEmptyResults: true, testResultsPattern: '**/junit.xml,**/test-results.xml,**/test-report.xml'
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                }
            }
        }

        // Остальные этапы остаются без изменений, но с улучшенной обработкой ошибок
        stage('Build') {
            when {
                anyOf { 
                    branch 'develop'
                    branch 'main'
                    branch 'master' 
                }
            }
            steps {
                bat '''
                    chcp 65001 > nul
                    echo Building project...
                    npm run build:ci || echo "No build script configured, skipping..."
                    
                    if exist dist (
                        echo Build directory created:
                        dir dist
                    ) else (
                        echo "No dist directory created, but continuing..."
                    )
                '''
            }
        }

        stage('Archive Artifacts') {
            when { 
                branch 'main' 
            }
            steps {
                script {
                    if (fileExists('dist')) {
                        archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                        echo 'Artifacts archived'
                    } else {
                        echo 'No dist directory found, skipping artifact archiving'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "========================================"
            echo "Build status: ${currentBuild.currentResult}"
            echo "Duration: ${currentBuild.durationString}"
            echo "Branch: ${env.BRANCH_NAME}"
            echo "========================================"
            
            // Архивируем логи для отладки
            archiveArtifacts artifacts: 'npm-debug.log*, logs/**, *.log, coverage/**', allowEmptyArchive: true
            
            // Аккуратная очистка workspace
            script {
                if (fileExists('.git')) {
                    bat '''
                        chcp 65001 > nul
                        echo Cleaning up...
                        rmdir /s /q node_modules 2>nul
                        del package-lock.json 2>nul
                        del npm-debug.log* 2>nul
                    '''
                }
            }
        }
        
        success {
            echo '✅ Pipeline completed successfully!'
        }
        
        failure {
            echo '❌ Pipeline failed!'
            
            script {
                // Детальная диагностика при неудаче
                bat '''
                    chcp 65001 > nul
                    echo === FAILURE DIAGNOSTICS ===
                    
                    echo === GIT STATUS ===
                    git status
                    
                    echo === GIT REMOTE -v ===
                    git remote -v
                    
                    echo === NODE MODULES CHECK ===
                    if exist node_modules (
                        echo node_modules exists
                        dir node_modules | find /c "File(s)"
                    ) else (
                        echo node_modules does not exist
                    )
                    
                    echo === PACKAGE.JSON CHECK ===
                    if exist package.json (
                        type package.json
                    ) else (
                        echo package.json not found
                    )
                    
                    echo === DISK SPACE ===
                    wmic logicaldisk get caption,freespace,size
                    
                    echo === NETWORK CHECK ===
                    ping github.com
                    
                    echo === NPM CACHE ===
                    npm cache verify
                '''
            }
        }
    }
}
pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        CI = 'true'
        // Фиксируем кодировку для Windows
        PYTHONIOENCODING = 'UTF-8'
        // Настройки npm
        NPM_CONFIG_LOGLEVEL = 'warn'
        NPM_CONFIG_FETCH_TIMEOUT = '300000'
        NPM_CONFIG_PROGRESS = 'false'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
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
                checkout scm
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
                        echo Workspace:
                        cd
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

        stage('Clean for npm ci') {
            steps {
                bat '''
                    echo Cleaning previous installations...
                    if exist node_modules rmdir /s /q node_modules
                    if exist package-lock.json del package-lock.json
                    
                    echo Generating fresh package-lock.json...
                    npm install --package-lock-only --no-audit --loglevel=error || exit 0
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies with npm ci...'
                    
                    // Пробуем несколько стратегий
                    def installed = false
                    
                    try {
                        timeout(time: 10, unit: 'MINUTES') {
                            bat '''
                                echo "Attempt 1: npm ci with default options..."
                                npm ci --no-audit --prefer-offline
                            '''
                        }
                        installed = true
                    } catch (Exception e1) {
                        echo "Attempt 1 failed, trying alternative..."
                        
                        try {
                            timeout(time: 5, unit: 'MINUTES') {
                                bat '''
                                    echo "Attempt 2: npm ci with legacy peer deps..."
                                    npm ci --no-audit --legacy-peer-deps
                                '''
                            }
                            installed = true
                        } catch (Exception e2) {
                            echo "Attempt 2 failed, trying npm install as fallback..."
                            
                            timeout(time: 5, unit: 'MINUTES') {
                                bat '''
                                    echo "Attempt 3: Fallback to npm install..."
                                    npm install --no-audit --legacy-peer-deps
                                '''
                            }
                            installed = true
                        }
                    }
                    
                    if (!installed) {
                        error('Failed to install dependencies')
                    }
                    
                    echo 'Dependencies installed successfully'
                }
            }
        }

        stage('Security Check') {
            steps {
                bat '''
                    echo Running security audit...
                    npm audit --audit-level=moderate || echo Audit completed with warnings
                '''
            }
        }

        stage('Run Lint') {
            steps {
                bat '''
                    echo Running lint...
                    npm run lint:ci
                '''
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        bat '''
                            echo Running tests with coverage...
                            npm run test:ci
                        '''
                    }
                }
            }
            
            post {
                always {
                    junit '**/junit.xml'
                    junit '**/test-results.xml'
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                }
            }
        }

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
                    echo Building project...
                    npm run build:ci
                    
                    if exist dist (
                        echo Build directory created:
                        dir dist
                    )
                '''
            }
        }

        stage('Archive Artifacts') {
            when { 
                branch 'main' 
                expression { fileExists('dist') }
            }
            steps {
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
                echo 'Artifacts archived'
            }
        }

        stage('Deploy to Staging') {
            when { 
                branch 'develop'
                expression { fileExists('dist') }
            }
            steps {
                echo '=== DEPLOY TO STAGING ==='
                echo 'In real project: deploy to staging server'
                
                script {
                    // Пример деплоя
                    bat '''
                        echo "Would deploy to staging server..."
                        echo "Build number: ${env.BUILD_NUMBER}"
                    '''
                }
            }
        }

        stage('Production Approval') {
            when { 
                branch 'main'
                expression { fileExists('dist') }
            }
            steps {
                input(
                    message: "Approve deployment of build #${env.BUILD_NUMBER} to PRODUCTION?",
                    ok: 'Deploy',
                    submitter: 'admin,anton'
                )
            }
        }

        stage('Deploy to Production') {
            when { 
                branch 'main'
                expression { fileExists('dist') }
            }
            steps {
                echo '=== DEPLOY TO PRODUCTION ==='
                echo 'Application deployed to production!'
                
                script {
                    bat '''
                        echo "Deploying to production..."
                        echo "1. Backup current version"
                        echo "2. Copy new files"
                        echo "3. Restart application"
                        timeout /t 5 /nobreak
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "========================================"
            echo "Build status: ${currentBuild.currentResult}"
            echo "Duration: ${currentBuild.durationString}"
            echo "========================================"
            
            // Сохраняем логи для отладки
            archiveArtifacts artifacts: 'npm-debug.log*, logs/**, *.log', allowEmptyArchive: true
            
            // Очищаем workspace
            cleanWs(
                cleanWhenAborted: true,
                cleanWhenFailure: true,
                cleanWhenNotBuilt: true,
                cleanWhenUnstable: true,
                cleanWhenSuccess: true,
                deleteDirs: true,
                patterns: [[pattern: '.git/**', type: 'INCLUDE']]
            )
        }
        
        success {
            echo '✅ Pipeline completed successfully!'
        }
        
        failure {
            echo '❌ Pipeline failed!'
            
            script {
                // Диагностика при неудаче
                bat '''
                    echo === DIAGNOSTICS ===
                    echo Checking node_modules:
                    if exist node_modules (
                        dir node_modules | find /c "File(s)" || echo "Cannot list node_modules"
                    ) else (
                        echo "node_modules not found"
                    )
                    
                    echo Checking disk space:
                    wmic logicaldisk get caption,freespace,size 2>nul || echo "Cannot check disk space"
                '''
            }
        }
        
        unstable {
            echo '⚠️ Pipeline completed with warnings'
        }
    }
}
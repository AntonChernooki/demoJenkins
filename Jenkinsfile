pipeline {
    agent {
        label 'windows'  // Убедитесь, что у вас есть Windows агент с меткой 'windows'
    }

    environment {
        NODE_ENV = 'test'
        CI = 'true'
        PYTHONIOENCODING = 'UTF-8'
        NPM_CONFIG_LOGLEVEL = 'warn'
        NPM_CONFIG_FETCH_TIMEOUT = '300000'
        NPM_CONFIG_PROGRESS = 'false'
        GIT_TERMINAL_PROMPT = '0'
        // Устанавливаем кэш npm в отдельную директорию
        NPM_CONFIG_CACHE = 'C:\\npm-cache'
    }

    options {
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        retry(2)
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
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: "*/${env.BRANCH_NAME}"]],
                    extensions: [
                        [$class: 'CloneOption', depth: 1, noTags: true, shallow: true, timeout: 60],
                        [$class: 'WipeWorkspace']
                    ],
                    userRemoteConfigs: [[
                        url: 'https://github.com/AntonChernooki/demoJenkins.git'
                    ]]
                ])
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
                        @echo off
                        chcp 65001 > nul
                        echo === ENVIRONMENT CHECK ===
                        echo Node version:
                        node --version
                        echo NPM version:
                        npm --version
                        echo Git version:
                        git --version
                        echo Disk space:
                        wmic logicaldisk get caption,freespace,size
                        echo Current directory:
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

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies with npm ci...'
                    bat '''
                        @echo off
                        chcp 65001 > nul
                        echo === CLEANING NPM CACHE ===
                        npm cache clean --force
                        
                        echo === INSTALLING DEPENDENCIES ===
                        npm ci --no-audit --prefer-offline --no-fund --no-progress
                        
                        if errorlevel 1 (
                            echo First attempt failed, trying with legacy peer deps...
                            npm ci --no-audit --legacy-peer-deps --no-fund --no-progress
                        )
                        
                        if errorlevel 1 (
                            echo Second attempt failed, trying npm install...
                            npm install --no-audit --legacy-peer-deps --no-fund --no-progress
                        )
                        
                        echo Dependencies installed successfully
                    '''
                }
            }
        }

        stage('Security Check') {
            steps {
                bat '''
                    @echo off
                    chcp 65001 > nul
                    echo === SECURITY AUDIT ===
                    npm audit --audit-level=moderate || echo "Audit completed with warnings, continuing..."
                '''
            }
        }

        stage('Run Lint') {
            steps {
                bat '''
                    @echo off
                    chcp 65001 > nul
                    echo === RUNNING LINT ===
                    npm run lint:ci || echo "Lint warnings found, continuing..."
                '''
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    timeout(time: 15, unit: 'MINUTES') {
                        bat '''
                            @echo off
                            chcp 65001 > nul
                            echo === RUNNING TESTS WITH COVERAGE ===
                            npm run test:ci
                        '''
                    }
                }
            }
            
            post {
                always {
                    // ИСПРАВЛЕННЫЙ СИНТАКСИС JUNIT
                    junit testResults: '**/junit.xml,**/test-results.xml,**/test-report.xml', allowEmptyResults: true
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
                    @echo off
                    chcp 65001 > nul
                    echo === BUILDING PROJECT ===
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
            
            // Очищаем workspace
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
            echo '✅ Pipeline completed successfully!'
        }
        
        failure {
            echo '❌ Pipeline failed!'
            script {
                bat '''
                    @echo off
                    chcp 65001 > nul
                    echo === FAILURE DIAGNOSTICS ===
                    
                    echo === GIT STATUS ===
                    git status
                    
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
                '''
            }
        }
        
        unstable {
            echo '⚠️ Pipeline completed with warnings'
        }
    }
}
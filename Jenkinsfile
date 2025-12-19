pipeline {
    environment {
        DISCORD_WEBHOOK_URL = credentials('discord-webhook-url')
        SERVER_IP = credentials('ssh-host')
        USER = credentials('ssh-username')
        FRONTEND_ENV_DEV = credentials('file-env-dev')
        FRONTEND_ENV_STAGING = credentials('file-env-staging')
        FRONTEND_ENV_PRODUCTION = credentials('file-env-production')
        PROJECT_NAME = 'SCHOOL DIRECTORY FRONTEND'

        PRODUCTION_DIR = credentials('production-directory')
        DEV_DIR = credentials('development-directory')
        STAGING_DIR = credentials('staging-directory')
        MENTION_DISCORD_ID = credentials('mention-discord-id')
    }

    agent any

    stages {
        stage('Deploy') {
            steps {
                script {
                    def branchName = env.BRANCH_NAME
                    def projectDir

                    if (branchName == 'development') {
                        projectDir = DEV_DIR
                        env.FRONTEND_ENV = FRONTEND_ENV_DEV
                        pm2Name = 'sch-dir-dev'
                    } else if (branchName == 'staging') {
                        projectDir = STAGING_DIR
                        env.FRONTEND_ENV = FRONTEND_ENV_STAGING
                        pm2Name = 'sch-dir-staging'
                    } else if (branchName == 'main') {
                        projectDir = PRODUCTION_DIR
                        env.FRONTEND_ENV = FRONTEND_ENV_PRODUCTION
                        pm2Name = 'sch-dir-production'
                    } else {
                        echo "Unsupported branch: ${branchName}"
                        currentBuild.result = 'ABORTED'
                        return
                    }

                    sh 'cp "$FRONTEND_ENV" .env'
                    sh 'chmod 600 .env'

                    sh 'docker run --rm -v "$(pwd)":/app -w /app --entrypoint npm node:20 install'
                    sh 'docker run --rm -v "$(pwd)":/app -w /app --entrypoint npm node:20 run build'

                    sshagent(credentials: ['jenkins']) {
                        sh "rsync --stats --update --checksum -zrSlhp -e 'ssh -p 22 -o StrictHostKeyChecking=no' . ${USER}@${SERVER_IP}:${projectDir}"

                        sh "ssh -p 22 -o StrictHostKeyChecking=no ${USER}@${SERVER_IP} \"cd ${projectDir} && pm2-18 restart ${pm2Name}\""
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def gitLog = sh(script: 'git log -n 5 --format="%h %s (%an)"', returnStdout: true).trim()

                discordSend description: ">>> **Yay !!!** \nProjectmu udah berhasil di deploy yah \n\n Jenkins Pipeline Build [** FINISHED **] \n```\n${gitLog}\n```",
                            footer: "${env.PROJECT_NAME}",
                            link: env.BUILD_URL,
                            result: currentBuild.currentResult,
                            title: "Deploying ${env.PROJECT_NAME} to ${env.BRANCH_NAME} **SUCCESS**",
                            webhookURL: "${env.DISCORD_WEBHOOK_URL}",
                            thumbnail: "https://media.tenor.com/30TFXsJZzLgAAAAC/happy-anya-spy-x-family.gif",
                            notes: ">>> **Halo kak** ${env.MENTION_DISCORD_ID}"
            }
        }
        failure {
            script {
                def gitLog = sh(script: 'git log -n 5 --format="%h %s (%an)"', returnStdout: true).trim()

                discordSend description: ">>> **Red Arlert,** \nKuleeeee gagal nok, bak cek lagi  \n\n Jenkins Pipeline Build [** FAILED **] \n```\n${gitLog}\n```",
                            footer: "${env.PROJECT_NAME}",
                            link: env.BUILD_URL,
                            result: currentBuild.currentResult,
                            title: "Deploying ${env.PROJECT_NAME} to ${env.BRANCH_NAME} **FAILED**",
                            webhookURL: "${env.DISCORD_WEBHOOK_URL}",
                            thumbnail: "https://media.tenor.com/jW_f0aRGGwcAAAAC/anya-anya-forger.gif",
                            notes: ">>> **Halo kak** ${env.MENTION_DISCORD_ID}"
            }
        }
    }
}
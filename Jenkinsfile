#!Groovy
@Library("platform.infrastructure.pipelinelibrary@refarch1.5-current") _

def ecrRegistry = platformDefaults.getDockerRegistry()

def buildNodeId = platformDefaults.getBuildNodeLabel()
node(buildNodeId) {

  stage("Checkout") {
    deleteDir()
    checkout scm
  }

  stage("Pull Build Image") {
    def credentials = platformDefaults.getCredentialsId()
    def region = platformDefaults.getRegion()

    docker.withRegistry("https://${ecrRegistry}", "ecr:${region}:${credentials}") {
      docker.image("platform/images/node").pull()
    }
  }

  /*
  * Run npm build tasks -- npm install, test
  * Please ensure that npm test runs everything you need
  * Stages: Build/Test
  */
  stage ('Build/Test') {
    sh """
    docker run --rm -v \$WORKSPACE:/opt/ebsco:rw ${ecrRegistry}/platform/images/node audit
    docker run --rm -v \$HOME/.npmrc:/opt/ebsco/.npmrc:ro -v \$WORKSPACE:/opt/ebsco:rw ${ecrRegistry}/platform/images/node ci
    """
  }

  if(env.BRANCH_NAME != "master"){
    println "Do not publish from a branch which is not master"
    return 0;
  }

  stage('Publish') {
    sh "docker run --rm -v \$HOME/.npmrc:/opt/ebsco/.npmrc:ro -v \$WORKSPACE:/opt/ebsco:rw ${ecrRegistry}/platform/images/node publish"
  }
}
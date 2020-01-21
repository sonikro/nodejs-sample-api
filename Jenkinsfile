@Library("convair-hub@develop")
import br.com.viavarejo.jornada.jenkins.stages.common.DefineType
import br.com.viavarejo.jornada.jenkins.stages.common.DefineTypeParameter
import br.com.viavarejo.jornada.jenkins.stages.docker.DockerBuild
import br.com.viavarejo.jornada.jenkins.stages.docker.DockerBuildParameter
import br.com.viavarejo.jornada.jenkins.stages.docker.DockerPush
import br.com.viavarejo.jornada.jenkins.stages.docker.DockerPushParameter
import br.com.viavarejo.jornada.jenkins.stages.node.NpmInstall
import br.com.viavarejo.jornada.jenkins.stages.node.NpmTest

Convair {
    variables = [
        OPENSHIFT_REGISTRY: "172.30.1.1:5000",
        OPENSHIFT_APISERVER: "https://192.168.1.48:8443"
    ]

    selectedAgent = "linux"

    selectedStages = [
        DefineType: DefineType.use(new DefineTypeParameter(
                namespacePrefix: "workshop"
        )),

        InstallDeps: NpmInstall.use(),

        UnitTest: NpmTest.use(),

        DockerBuild: DockerBuild.use(new DockerBuildParameter(applicationName: "nodejs-api")),

        DockerPush: DockerPush.use(new DockerPushParameter(
                registry: "172.30.1.1:5000",
                registryCredentialsId: "openshift-registry-credentials",
                applicationName: "nodejs-api"
        )),
        StartRelease: [
                shouldRun: { env.SHOULD_DEPLOY },
                run: {
                    xlrCreateRelease overrideCredentialId: "xlrelease-credentials",
                            serverCredentials: "xlrelease-credentials",
                            template: "Workshop/release-nodejs-api",
                            releaseTitle: "[NodeJS API - ${env.VERSION}",
                            variables: [
                                    [propertyName: 'VERSION', propertyValue: env.VERSION],
                                    [propertyName: 'BRANCH_NAME', propertyValue: env.BRANCH_NAME ]
                            ],
                            startRelease: true
                }
        ]
    ]

    always = {
        echo "Sempre executa"
    }

    onSuccess = {
        echo "Deu certo"
    }

    onFailure = {
        echo "Falhou"
    }
}
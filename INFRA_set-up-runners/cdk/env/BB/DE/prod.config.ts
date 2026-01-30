import { IEnvironment } from '../../../types/interfaces/IEnvironment'
import {
    EnvironmentFullName,
    EnvironmentName,
} from '../../../types/enums/EnvironmentName'
import { Stacks } from '../../../types/enums/Stacks'

const envName = EnvironmentName.PROD
const envFullName = EnvironmentFullName.PROD

export const BBDeProdConfig: IEnvironment = {
    //General configuration
    name: envName,
    fullName: envFullName,
    accountInfo: {
        account: '64XXXXXXXXXXX',
        region: 'eu-central-1',
    },

    stacks: [Stacks.FRONTEND],

    storage: {
        S3: [
            { name: `new-frontend-infrastructure-test-cdk-bucket-${envName}` },
        ],
    },
}

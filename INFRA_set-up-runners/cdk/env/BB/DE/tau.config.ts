import { IEnvironment } from '../../../types/interfaces/IEnvironment'
import {
    EnvironmentFullName,
    EnvironmentName,
} from '../../../types/enums/EnvironmentName'
import { Stacks } from '../../../types/enums/Stacks'

const envName = EnvironmentName.TAU
const envFullName = EnvironmentFullName.TAU

export const BBDeTauConfig: IEnvironment = {
    //General configuration
    name: envName,
    fullName: envFullName,
    accountInfo: {
        account: '15XXXXXXXX',
        region: 'eu-central-1',
    },

    stacks: [Stacks.FRONTEND],

    storage: {
        S3: [
            { name: `new-frontend-infrastructure-test-cdk-bucket-${envName}` },
        ],
    },
}

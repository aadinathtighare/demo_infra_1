import { IEnvironment } from '../../../types/interfaces/IEnvironment'
import {
    EnvironmentFullName,
    EnvironmentName,
} from '../../../types/enums/EnvironmentName'
import { Stacks } from '../../../types/enums/Stacks'

const envName = EnvironmentName.ACC
const envFullName = EnvironmentFullName.ACC

export const BBDeAccConfig: IEnvironment = {
    //General configuration
    name: envName,
    fullName: envFullName,
    accountInfo: {
        account: '86XXXXXXXXXXX',
        region: 'eu-central-1',
    },

    stacks: [Stacks.FRONTEND],

    storage: {
        S3: [
            { name: `new-frontend-infrastructure-test-cdk-bucket-${envName}` },
        ],
    },
}

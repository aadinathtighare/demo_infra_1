import { IEnvironment } from '../../types/interfaces/IEnvironment'
import {
    EnvironmentFullName,
    EnvironmentName,
} from '../../types/enums/EnvironmentName'
import { Stacks } from '../../types/enums/Stacks'
import { LABInternationalAccountInfo } from './shared.config'

const envName = EnvironmentName.PRE
const envFullName = EnvironmentFullName.PRE

export const LABPreConfig: IEnvironment = {
    //General configuration
    name: envName,
    fullName: envFullName,
    accountInfo: LABInternationalAccountInfo,

    stacks: [Stacks.FRONTEND],

    storage: {
        S3: [
            { name: `new-frontend-infrastructure-test-cdk-bucket-${envName}` },
        ],
    },
}

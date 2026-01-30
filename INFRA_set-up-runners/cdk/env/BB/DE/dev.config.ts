import { Stacks } from '../../../types/enums/Stacks';
import { IEnvironment } from '../../../types/interfaces/IEnvironment';
import { EnvironmentName, EnvironmentFullName } from '../../../types/enums/EnvironmentName';

export const BBDeDevConfig: IEnvironment = {
  // Required by IEnvironment
  name: EnvironmentName.DEV,
  fullName: EnvironmentFullName.DEV,
  accountInfo: {
    account: '20XXXXXXXXX',
    region: 'eu-central-1',
  },

  // enum key match to your Stacks.ts. (RUNNER or RUNNERS )
  stacks: [Stacks.FRONTEND, Stacks.RUNNER],

  // Required: storage block (empty)
  storage: {
    S3: [
      // { name: 'bms-bbde-dev-frontend-bucket' }, // you can add
    ],
  },

  // Optional: runners (nested IRunnersConfig)
  runners: {
    registration: {
      gitlabUrl: 'https://gitlab.com',
      runnerTokenSsmParam: '/bms/ci/runner-token-bbde-dev',
      tags: ['fargate', 'bbde', 'dev'],
      runUntagged: false,
    },
    manager: {
      instanceType: 't3.small',
      publicSubnet: true, 
    },
    worker: {
      image: '207678167516.dkr.ecr.eu-central-1.amazonaws.com/ci-coordinator:dev',
      cpu: 1024,
      memoryMiB: 2048,
      assignPublicIp: true,
    },
    networking: {
      createNewVpc: true,
      managerSshCidr: '0.0.0.0/0', // in prod keep tight security
    },
  },
};

// if aggregator (environments.ts) using default import then uncomment below line
// export default BBDeDevConfig;
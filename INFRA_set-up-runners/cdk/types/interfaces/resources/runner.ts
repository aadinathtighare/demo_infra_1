// types/interfaces/resources/runner.ts
export interface IRunnerManager {
  readonly instanceType?: string;
  readonly publicSubnet?: boolean;
  readonly extraUserData?: string[];
}
export interface IRunnerWorker {
  readonly image?: string;
  readonly cpu?: number;
  readonly memoryMiB?: number;
  readonly assignPublicIp?: boolean;
}
export interface IRunnerNetworking {
  readonly createNewVpc?: boolean;
  readonly vpcId?: string;
  readonly workerSubnetIds?: string[];
  readonly workerSecurityGroupId?: string;
  readonly managerSshCidr?: string;
}
export interface IRunnerRegistration {
  readonly gitlabUrl: string;
  readonly runnerTokenSsmParam: string;
  readonly tags?: string[];
  readonly runUntagged?: boolean;
}
export interface IRunnersConfig {
  readonly manager?: IRunnerManager;
  readonly worker?: IRunnerWorker;
  readonly networking?: IRunnerNetworking;
  readonly registration: IRunnerRegistration;
}
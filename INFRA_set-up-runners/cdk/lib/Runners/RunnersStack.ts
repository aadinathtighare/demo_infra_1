// lib/Runners/RunnersStack.ts  (excerpt)

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as logs from 'aws-cdk-lib/aws-logs';

import { IEnvironment } from '../../types/interfaces/IEnvironment';


export class RunnersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, config: IEnvironment, props?: cdk.StackProps) {
    super(scope, id, props);

    const runners = config.runners;
    if (!runners) throw new Error('IEnvironment.runners is required');

    // Defaults
    const managerType    = runners.manager?.instanceType ?? 't3.small';
    const managerPublic  = runners.manager?.publicSubnet ?? true;

    const image          = runners.worker?.image ?? '';
    const cpu            = runners.worker?.cpu ?? 1024;
    const mem            = runners.worker?.memoryMiB ?? 2048;
    const assignPublicIp = runners.worker?.assignPublicIp ?? true;

    const createNewVpc   = runners.networking?.createNewVpc ?? true;
    const managerSshCidr = runners.networking?.managerSshCidr ?? '0.0.0.0/0';

    const gitlabUrl      = runners.registration?.gitlabUrl;
    const tokenParam     = runners.registration?.runnerTokenSsmParam;
    const tags           = runners.registration?.tags ?? [];
    const runUntagged    = runners.registration?.runUntagged ?? false;

    if (!gitlabUrl)  throw new Error('runners.registration.gitlabUrl is required');
    if (!tokenParam) throw new Error('runners.registration.runnerTokenSsmParam is required');
    if (!image)      throw new Error('runners.worker.image (ci-coordinator) is required');

    // ... पुढे VPC/SG/ECS TaskDef/EC2 Manager + SSM/token read + fargate driver setup
  }
}

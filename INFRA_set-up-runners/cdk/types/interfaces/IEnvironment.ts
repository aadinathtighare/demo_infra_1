import { Environment } from 'aws-cdk-lib'
import { EnvironmentFullName, EnvironmentName } from '../enums/EnvironmentName'
import { Stacks } from '../enums/Stacks'
import { IS3Bucket } from './resources/s3'
import { IAWSAccount } from './IAWSAccount'
import { IRunnersConfig } from './resources/runner' // ⬅️ new

export interface IEnvironment {
  // General configuration
  readonly name: EnvironmentName
  readonly fullName: EnvironmentFullName
  readonly accountInfo: IAWSAccount

  readonly stacks: readonly Stacks[]

  readonly storage: {
    readonly S3: readonly IS3Bucket[]
  }

  /** GitLab runner configuration (EC2 manager + ECS Fargate workers) */
  readonly runners?: IRunnersConfig
}

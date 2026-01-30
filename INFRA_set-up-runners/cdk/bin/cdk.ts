#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { FrontendStack } from '../lib/Frontend/FrontendStack'
import { RunnersStack } from '../lib/Runners/RunnersStack'  // ⬅️ add
import { envConfigs } from '../env/environments'
import { Stacks } from '../types/enums/Stacks'



const app = new cdk.App()

Object.entries(envConfigs).forEach(([envName, config]) => {
  // FRONTEND
  if (config.stacks && config.stacks.includes(Stacks.FRONTEND)) {
    new FrontendStack(app, `Frontend-${envName}`, config, {
      stackName: `FrontendStack-${envName}`, // make name stable+unique per env
      env: {
        account: config.accountInfo.account,
        region: config.accountInfo.region,
      },
      description: `Frontend infra for ${envName}`,
    })
  }

  // RUNNERS (EC2 manager + ECS Fargate workers)
  if (config.stacks && config.stacks.includes(Stacks.RUNNER)) {
    new RunnersStack(app, `Runners-${envName}`, config, {
      stackName: `RunnersStack-${envName}`,
      env: {
        account: config.accountInfo.account,
        region: config.accountInfo.region,
      },
      description: `GitLab Runner manager+Fargate workers for ${envName}`,
    })
  }
})

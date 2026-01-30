## Infrastructure (AWS CDK) Project Name = Business Bikes BMS FE 2.0
## Overview
This repository contains *Infrastructure as Code (IaC)* implemented using **AWS CDK (TypeScript)**.
It provisions and manages AWS resources for multiple environments under centralized configuration.

## Development Requirements

* [Node](https://nodejs.org/en)
* [Typescript](https://www.typescriptlang.org/)
* [CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) 

##  Code Formatting
This project uses **Prettier** for consistent code formatting.
Formatting rules are defined in '.prettierrc.yaml'.

##  Repository Structure
    cdk/
    ├── bin/
    │   └── cdk.ts                         # CDK app entry point
    │
    ├── env/
    │   ├── environments.ts                # Master environment config map
    │   ├── BB/
    │   │   └── DE/
    │   │       ├── acc.config.ts
    │   │       ├── dev.config.ts
    │   │       ├── prod.config.ts
    │   │       ├── tau.config.ts
    │   │       └── tst.config.ts
    │   └── LAB/
    │       ├── api.config.ts
    │       ├── demo.config.ts
    │       ├── pre.config.ts
    │       ├── prod.config.ts
    │       ├── sec.config.ts
    │       ├── shared.config.ts
    │       └── stg.config.ts
    │
    ├── lib/
    │   └── Frontend/
    │       ├── FrontendStack.ts           # Frontend infra stack definition
    │       └── constructs/resources/
    │           └── S3Buckets.ts           # S3 bucket provisioning module
    │
    ├── test/
    │   └── cdk.test.ts
    │
    ├── types/
    │   ├── enums/
    │   │   ├── EnvironmentName.ts
    │   │   └── Stacks.ts
    │   └── interfaces/
    │       ├── IAWSAccount.ts
    │       └── IEnvironment.ts
    │
    ├── cdk.json
    ├── package.json
    ├── tsconfig.json
    └── .prettierrc.yaml

---------------------------------------------------------------------------
The AWS CDK app entry point is located at 'cdk/bin/cdk.ts'.

### What it does
- Initializes the CDK application using 'new cdk.App()'
- Iterates over all environments defined in 'env/environments.ts' ('envConfigs')
- Deploys the 'FrontendStack' only for environments where 'Stacks.FRONTEND' is enabled in the config
- Deploys resources to the AWS account and region defined in 'config.accountInfo'

### Deployment Logic
For each environment:
- If 'config.stacks.includes(Stacks.FRONTEND)' is true → deploy frontend infrastructure
- Otherwise → frontend stack is skipped
----------------------------------------------------------
In lib folder we have custom stack: FrontendStack.ts file
/lib/Frontend/FrontendStack.ts in this file actual infra is defined.
-----------------------------------------------------------------------
We have a folder /env this we have environments.ts file like this  /env/environments

env/environments.ts this file helps to  bin/cdk.ts file for  multi-environment deployments.

envConfigs : all the configs keep in single object, that's loop by CDK app & deploy stacks.
We have 5 environments Acceptance, Development, Production, Automation, Staging.
--------------------------------------------------------------------------------
## Environment Configurations (envConfigs)

All environment-specific configurations are centralized in 'env/environments.ts'.

The file imports configuration objects for multiple environments and exports a single 'envConfigs' map.

### Structure
- **BB Environments**
  - BBDeAcc, BBDeDev, BBDeProd, BBDeTau, BBDeTst

### Usage
The CDK application iterates through 'envConfigs' in 'bin/cdk.ts' and deploys stacks based on the enabled stack list configured per environment.

This design supports:
- Multi-environment deployments
- Centralized configuration management
- Selective stack deployment per environment
-----------------------------------------------------------------------------------------------------
##  Environment Details
## Note: All BB DE environments deploy to region 'eu-central-1' with account-specific separation.


Environment	  Config File	              AWS Account ID	AWS Region	    Enabled Stacks
ACC	          env/BB/DE/acc.config.ts	  863518427724	    eu-central-1	FRONTEND
TST	          env/BB/DE/tst.config.ts	  532856276239	    eu-central-1	FRONTEND
PROD	      env/BB/DE/prod.config.ts	  649577700875	    eu-central-1	FRONTEND
TAU           env/BB/DE/tau.config.ts     153047251675      eu-central-1    FRONTEND             
DEV           env/BB/DE/dev.config.ts     207678167516      Seu-central-1   FRONTEND        

---------------------------------------------------------------------------------------------------------
## AWS CDK Commands

### Install dependencies
* 'npm install'                       install project dependencies

### Configure AWS (optional but recommended)
* 'aws configure list-profiles'       list configured AWS profiles
* 'export AWS_PROFILE=<profile>'      use a specific AWS profile (Linux/Mac)
* 'set AWS_PROFILE=<profile>'         use a specific AWS profile (Windows CMD)
* '$env:AWS_PROFILE="<profile>"'      use a specific AWS profile (PowerShell)

### Bootstrap (required once per account/region)
* 'cdk bootstrap'                     bootstrap current AWS account/region
* 'cdk bootstrap aws://<acc>/<region>' bootstrap a specific account/region

### Validate / Build
* 'npm run build'                     compile TypeScript
* 'cdk doctor'                        diagnose environment issues
* 'cdk version'                       check CDK version

### See available stacks
* 'cdk list'                          list all stack names (alias: 'cdk ls')

### Preview / Compare
* 'cdk synth'                         generate CloudFormation template
* 'cdk diff'                          compare deployed stack vs current local changes

### Deploy
* 'cdk deploy'                        deploy all stacks in this app
* 'cdk deploy <stack-name>'           deploy a specific stack
* 'cdk deploy --all'                  deploy all stacks explicitly
* 'cdk deploy --require-approval never' deploy without approval prompts

### Destroy (cleanup)
* 'cdk destroy <stack-name>'          destroy a specific stack
* 'cdk destroy --all'                 destroy all stacks
----------------------------------------------------------------------------------------------------
types/interfaces/IAWSAccount.ts 
IAWSAccount this is a typescript interface
it is used for define AWS deployment target like AWS Account ID & Region.

its used in below 2 files 
bin/cdk.ts & env/BB/DE/*.config.ts --------------------------------------------------------------------------
readonly means once set it won't be change (config id fixed)
---------------------------------------------------------------------------
Environment Config Schema --> types/interfaces/IEnvironment.ts 
Below all config files should follow same structure.
env/BB/DE/*.config.ts & env/LAB/*.config.ts
-------------------------------------------------------------------------------------------------
Environment names are standardized using TypeScript enums: --> (types/enums/EnvironmentName.ts)
--------------------------------------------------------------------------------------------
## This project uses a 'Stacks' enum to control which stacks should be deployed per environment.
types/enums/Stacks.ts -->Stacks.ts is a TypeScript enum.


if (config.stacks && config.stacks.includes(Stacks.FRONTEND)) {
    new FrontendStack(...)
}
Here we are using if condition 
if FRONTEND is present in environment config bin/cdk.ts file then deploy FrontendStack.
---------------------------------------------------------------------------------------
## S3 buckets for the frontend infrastructure are provisioned through a reusable construct module.
S3 Buckets Construct 
path of file --> (lib/Frontend/constructs/resources/S3Buckets.ts)

### How it works
Reads bucket definitions from the environment configuration:
--> 'config.storage.S3'
- Creates one S3 bucket per entry in the config
- Returns an array of created buckets ('s3.Bucket[]')
-----------------------------------------------------------------------------------------




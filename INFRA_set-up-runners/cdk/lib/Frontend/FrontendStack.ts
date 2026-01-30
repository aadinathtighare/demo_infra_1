import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { S3Buckets } from './constructs/resources/S3Buckets'
import { IEnvironment } from '../../types/interfaces/IEnvironment'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FrontendStack extends cdk.Stack {
    constructor(
        scope: Construct,
        id: string,
        config: IEnvironment,
        props?: cdk.StackProps
    ) {
        super(scope, id, props)

        // S3 Buckets
        const s3Buckets = S3Buckets(this, config)
    }
}

import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'
import { IEnvironment } from '../../../../types/interfaces/IEnvironment'

export function S3Buckets(scope: Construct, config: IEnvironment): s3.Bucket[] {
    return config.storage.S3.map(
        (bucketConfig) =>
            new s3.Bucket(scope, `FrontEndBucket`, {
                bucketName: bucketConfig.name,
                publicReadAccess: false,
            })
    )
}

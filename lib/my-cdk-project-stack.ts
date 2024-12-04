import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class MyCdkProjectStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket
    const leesa9019432Bucket = new s3.Bucket(this, 'leesa9019432Bucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test environments
    });

    // Create Lambda function
    const leesa9019432Lambda = new lambda.Function(this, 'leesa9019432Lambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('Lambda invoked!');
          return { statusCode: 200, body: 'Hello, World!' };
        }
      `),
      environment: {
        BUCKET_NAME: leesa9019432Bucket.bucketName,
      },
    });

    // Create DynamoDB table
    const leesa9019432Table = new dynamodb.Table(this, 'leesa9019432Table', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'leesa9019432Table',
      removalPolicy: cdk.RemovalPolicy.DESTROY,  // Only for dev/test environments
    });
  }
}

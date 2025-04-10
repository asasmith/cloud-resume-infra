import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

interface LambdaStackProps extends StackProps {
  table: dynamodb.Table;
}

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: LambdaStackProps) {
    super(scope, id, props);

    const visitorLambda = new lambda.Function(this, "VisitorCountHandler", {
      runtime: lambda.Runtime.NODEJS_22_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "index.handler",
    });

    new apigateway.LambdaRestApi(this, "VisitorCountApi", {
      handler: visitorLambda,
    });
  }
}

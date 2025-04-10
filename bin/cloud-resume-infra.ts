#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import {
    IamStack,
    CloudResumeWebsiteStack,
    LambdaStack,
    DynamoStack,
} from "../lib";

const app = new cdk.App();
const product = "cloud-resume";

const webStack = new CloudResumeWebsiteStack(app, `${product}-web-stack`);
const dynamodbStack = new DynamoStack(app, `${product}-dynamodb-stack`);
new IamStack(app, `${product}-iam-stack`, {
    cloudfrontDistribution: webStack.distribution,
});
new LambdaStack(app, `${product}-lambda-stack`, {
    table: dynamodbStack.table,
});

app.synth();

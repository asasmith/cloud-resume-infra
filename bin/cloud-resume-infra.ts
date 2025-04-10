#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IamStack, CloudResumeWebsiteStack } from "../lib";
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
const product = 'cloud-resume';

const webStack = new CloudResumeWebsiteStack(app, `${product}-web-stack`); 
new IamStack(app, `${product}-iam-stack`, {
    cloudfrontDistribution: webStack.distribution,
});

new LambdaStack(app, `${product}-lambda-stack`)

app.synth();


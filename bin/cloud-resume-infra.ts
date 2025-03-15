#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IamStack, CloudResumeWebsiteStack } from "../lib";

const app = new cdk.App();
const product = 'cloud-resume';

new IamStack(app, `${product}-iam-stack`);
new CloudResumeWebsiteStack(app, `${product}-web-stack`); 

app.synth();


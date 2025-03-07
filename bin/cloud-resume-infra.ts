#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IamStack, S3Stack } from "../lib";

const app = new cdk.App();
const product = 'cloud-resume';

new IamStack(app, `${product}-iam-stack`);
new S3Stack(app, `${product}-s3-stack`); 

app.synth();


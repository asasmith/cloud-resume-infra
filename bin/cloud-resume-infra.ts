#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from "../lib";

const app = new cdk.App();

new S3Stack(app, 'S3Stack'); 

app.synth();


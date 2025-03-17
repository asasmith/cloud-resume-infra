# Cloud Resume Challenge

This repo holds all of the infrastructure as code (iac) for my [Cloud Resume Project](https://cloudresumechallenge.dev/docs/the-challenge/aws/). The project reqs are:

- Create a resume static website
- Use a custom domain
- Implement a visitor counter
- Automate deployments
- Utilize aws services (s3, cloudformation, cloudfront, dynamoDB, api gateway, lambda)
- Leverage aws cdk for all resources

## Goals
I hope to gain a better understanding of aws services and how to manage those services via infrastructure as code. I would also like to have a more complete mental model of devops and devops best practices. I chose aws cdk because I have experience with js/ts and I've taken a Frontend Masters course that had a cdk portion (that course used Go).

## Todo

- [ ] Create resume using html
- [x] Add github action workflow to deploy updates to s3
- [ ] Style resume with css
- [x] Create s3 bucket for static website
- [x] Add cloudfront distribution and acm cert for https
- [x] Point custom domain to cloudfront distibution ((resume.asasmith.dev)[https://resume.asasmith.dev])
- [ ] Add visitor counter to static web site
- [ ] Set up dynamoDB to track visitor count
- [ ] Add lambda func/api to interact with dynamoDB
- [ ] Tests 
- [ ] Get cloud practitioner cert

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

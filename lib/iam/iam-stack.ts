import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";

interface StackProps extends cdk.StackProps {
  cloudfrontDistribution: cloudfront.Distribution;
}

export class IamStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const oidcProvider = new iam.OpenIdConnectProvider(this, "GitHubOIDC", {
      url: "https://token.actions.githubusercontent.com",
      clientIds: ["sts.amazonaws.com"],
    });

    const githubDeployRole = new iam.Role(this, "GitHubDeployRole", {
      assumedBy: new iam.FederatedPrincipal(
        oidcProvider.openIdConnectProviderArn,
        {
          StringLike: {
            "token.actions.githubusercontent.com:sub":
              "repo:asasmith/cloud-resume-frontend:ref:refs/heads/main",
          },
        },
        "sts:AssumeRoleWithWebIdentity",
      ),
      roleName: "GitHubDeployRole",
    });

    githubDeployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
        resources: [
          "arn:aws:s3:::cloud-resume-342811584933-us-east-1",
          "arn:aws:s3:::cloud-resume-342811584933-us-east-1/*",
        ],
      }),
    );

    const distributionArn = cdk.Arn.format(
      {
        service: "cloudfront",
        resource: `distribution/${props!.cloudfrontDistribution.distributionId}`,
        account: cdk.Stack.of(this).account,
        region: "",
      },
      this,
    );

    githubDeployRole.addToPolicy(
      new iam.PolicyStatement({
        actions: ["cloudfront:CreateInvalidation"],
        resources: [distributionArn],
      }),
    );
  }
}

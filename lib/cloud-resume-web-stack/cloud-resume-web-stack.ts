import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

interface CloudResumeWebsiteStackProps extends cdk.StackProps {
  account: string;
  region: string;
}

export class CloudResumeWebsiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: CloudResumeWebsiteStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "CloudResumeInfraBucket", {
      bucketName: `cloud-resume-${this.account}-${this.region}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const oac = new cloudfront.S3OriginAccessControl(this, "MyOAC", {
      signing: cloudfront.Signing.SIGV4_NO_OVERRIDE,
    });

    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(bucket, {
      originAccessControl: oac,
    });

    const distribution = new cloudfront.Distribution(
      this,
      "WebSiteDistribution",
      {
        defaultBehavior: {
          origin: s3Origin,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        },
        defaultRootObject: "index.html",
      },
    );

    const cloudFrontPolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.ServicePrincipal("cloudfront.amazonaws.com")],
      actions: ["s3:GetObject"],
      resources: [`${bucket.bucketArn}/*`],
      conditions: {
        StringEquals: {
          "AWS:SourceArn": `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`,
        },
      },
    });

    bucket.addToResourcePolicy(cloudFrontPolicy);

    new cdk.CfnOutput(this, "CloudfrontDistributionId", {
      value: distribution.distributionId,
      exportName: "CloudfrontDistributionId",
    });

    new cdk.CfnOutput(this, "CloudfrontUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "URL for cloud resume project s3 bucket",
    });
  }
}

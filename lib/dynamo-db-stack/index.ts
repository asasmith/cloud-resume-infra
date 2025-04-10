import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoStack extends Stack {
    public readonly table: dynamodb.Table;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        this.table = new dynamodb.Table(this, 'VisitorCountTable', {
            tableName: 'VisitorCount',
            partitionKey: {
                name: 'id',
                type: dynamodb.AttributeType.STRING,
            },
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY,
        });
    }
}

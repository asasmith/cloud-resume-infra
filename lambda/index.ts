import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

export const handler = async () => {
    const client = new DynamoDBClient({});
    const key = { id: { S: "visitorCount" } };

    const updateCommand = new UpdateItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: key,
        UpdateExpression: "Add #count :incr",
        ExpressionAttributeNames: { "#count": "count" },
        ExpressionAttributeValues: { ":incr": { N: "1" } },
        ReturnValues: "UPDATED_NEW",
    });

    try {
        const result = await client.send(updateCommand);
        const updatedCount = result.Attributes?.count?.N ?? "0";

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ count: updatedCount }),
        };
    } catch (error) {
        console.error({ error: `${error}` });

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ message: 'some error' }),
        }
    }
};

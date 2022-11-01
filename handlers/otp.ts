const TOKEN_TTL = (5 * 60 * 1000); // 5 min
const AWS = require('aws-sdk');
const { generateToken } = require("../lib/token");
const uuid = require('uuid');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
}


// TODO: move to lib 
const sendEmail = (to: string, subject: string, message: string, from: any) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: from ? from : process.env.AWS_SES_FROM,
        Source: from ? from : process.env.AWS_SES_FROM,
    };

    return ses.sendEmail(params).promise();
};

export default (event: any, context: any, callback: any) => {
    const token = generateToken();
    const message = `${token} - WOW Weather OTP`;
    let resolve: any, reject: any; // Promisify this better
    let documentClient = new AWS.DynamoDB.DocumentClient({ 'apiVersion': '2012-08-10', 'region': process.env.AWS_REGION });


    const dbPromise = new Promise((res: any, rej: any) => {
        resolve = res;
        reject = rej;
    });

    let data: any;
    try {
        data = JSON.parse(event.body);
    } catch (e) {
        callback(null, {
            statusCode: 400,
            body: `Bad request: ${e.message}, got: ${event.body}`,
        });
        return;
    }
    const now = new Date();
    let ttl = Math.floor(Date.now() / 1000) + TOKEN_TTL;
    const isoTimestamp = now.toISOString();

    documentClient.put({
        TableName: process.env.OTP_TABLE,
        Item: {
            id: uuid.v1(),
            email: data.email,
            token: token,
            used: false,
            created: isoTimestamp,
            expires: ttl
        }
    }, (err: Error) => {
        if (err) {
            console.error(err.message);
            const errMsg = JSON.stringify(err.message);
            reject({
                statusCode: 500,
                headers,
                body: {
                    errMsg
                }
            });
        } else {
            resolve({
                statusCode: 200,
                headers,
                body: `OTP sent to ${data.email}`
            });
        }
    });

    dbPromise.catch((err: any) => {
        callback(null, {
            statusCode: 500,
            headers,
            body: `Error while sending OTP ${err.message}`
        });
    });

    dbPromise.then((result: any) => {
        console.log('db: ', result);
        // Do not attempt email for malformed POST
        if (result.statusCode !== 200) {
            callback(null, result);
            return
        } else {
            sendEmail(data.email, 'WOW Weather One Time Pass', message, process.env.AWS_SES_FROM).then((sesResult: any) => {
                console.log('Email sent', sesResult);
                callback(null, result);
            }).catch((err: any) => {
                console.error(err);
                callback(null, {
                    statusCode: 500,
                    headers,
                    body: `Error while sending OTP ${err.message}`
                });
            });
        }
    })
};
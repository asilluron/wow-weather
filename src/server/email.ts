const AWS = require('aws-sdk');

const config = require('./config'); // load configurations file

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

const sendEmail = (to: string, subject: string, message: string, from: string) => {
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

    ses.sendEmail(params, (err: Error, data: any) => {
        if (err) {
            return console.log(err, err.stack);
        } else {
            console.log("Email sent.", data);
        }
    });
};

module.exports = { sendEmail };
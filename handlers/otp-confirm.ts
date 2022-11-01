const AWS = require('aws-sdk');
const JWT = require('jsonwebtoken');
const axios = require('axios');
const errorHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
}

const headers = {
    'Access-Control-Allow-Origin': '*'
}

export default async (event: any) => {
    console.log(event);
    let currentIp = event.requestContext.identity.sourceIp;

    console.log('currentIp is ', currentIp);
    if (currentIp.indexOf("127.0.0.1") >= -1) {
        currentIp = process.env.DEMO_IP;
    }

    let data: any;
    try {
        data = JSON.parse(event.body);
    } catch (e) {
        return Promise.resolve({
            statusCode: 400,
            body: `Bad request: ${e.message}, got: ${event.body}`,
        });
    }

    if (!data.email || !data.token) {
        console.log('Missing email or token');
        return Promise.resolve({
            statusCode: 400,
            headers: errorHeaders,
            body: 'Bad request: email and token are required'
        });
    }

    const documentClient = new AWS.DynamoDB.DocumentClient({ 'apiVersion': '2012-08-10', 'region': process.env.AWS_REGION });

    const DBparams = {
        TableName: process.env.OTP_TABLE,
        Key: {
            email: data.email,
        }
    };

    try {
        const result = await documentClient.get(DBparams).promise();

        if (data.token !== result.Item.token) {
            throw new Error('Invalid token');
        }

        const token = JWT.sign(
            { email: data.email },
            process.env.JWT_KEY,
            {
                expiresIn: "2h",
            }
        );



        const ipResult = await axios.get(`http://ip-api.com/json/${currentIp.trim()}`);
        if (ipResult.data.status === 'fail') {
            throw new Error(`Invalid IP: ${JSON.stringify(ipResult.data)}'\ncurrentIp: ${currentIp}`);
        }
        const ipData = ipResult.data;
        const { lat, lon } = ipData;
        const weatherMeta = await axios.get(`https://api.weather.gov/points/${lat},${lon}`);
        const weatherData = weatherMeta.data;
        const forecastUrl = weatherData.properties.forecast;

        const weatherForecast = await axios.get(forecastUrl);
        const forecast = weatherForecast.data.properties.periods[0].detailedForecast;

        // Now Ownenize it

        const owenResponse = await axios.get('https://owen-wilson-wow-api.herokuapp.com/wows/random');
        const { poster, full_line } = owenResponse.data[0];

        const response = {
            token,
            forecast,
            poster,
            full_line
        };

        return Promise.resolve({ statusCode: 200, body: JSON.stringify(response), headers });

    } catch (err) {
        // TODO: fix the error message response codes
        if (err) {
            console.error(err);
            return Promise.resolve({
                statusCode: 500,
                headers: errorHeaders,
                body: JSON.stringify(err)
            });
        }
    }

}
exports.handler = function(event, context, callback) {
    const Midtrans = require('midtrans-client');
    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };

    const snap = new Midtrans.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
        clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const { id, name, email, amount } = JSON.parse(event.body);
    const names = name.split(' ');
    let firstName, lastName;
    if (names && names.length > 1) {
        firstName = names[0];
        lastName = names[1];
    } else {
        firstName = names[0];
        lastName = '';
    }

    const params = {
        transaction_details: {
            order_id: `CHARITY-${id}-${+new Date()}`,
            gross_amount: parseInt(amount),
        },
        customer_details: {
            firstName,
            lastName,
            email,
        },
        creadit_card: {
            secure: true,
        },
    };
    snap
        .createTransaction(params)
        .then(function(transaction) {
            const { token, redirect_url } = transaction;
            console.log(`Token: ${token}`);
            console.log(`Redirect URL: ${redirect_url}`);
            callback(null, {
                statusCode: 200,
                headers: header,
                body: JSON.stringify({
                    url: redirect_url,
                    params,
                }),
            });
        })
        .catch(function(error) {
            console.log(`Error: ${error.message}`);
            callback(null, {
                statusCode: 400,
                headers: header,
                body: JSON.stringify({
                    error: error.message,
                }),
            });
        });
};
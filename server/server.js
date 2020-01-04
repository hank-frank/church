const express = require('express');
const axios = require('axios');
const auth = require('basic-auth');
const client = require('smartsheet');
const dotenv = require('dotenv').config();
// const pcBasicAuth = 'Basic' + btoa(process.env.PC_APPLICATION_ID + ":" + process.env.PC_SECRET)

const app = express();

var smartsheet = client.createClient({ accessToken: process.env.SMARTSHEET_BEARER_TOKEN });


app.use(express.static('dist'));


app.get('/ss', (req, res) => {

    var options = {
        queryParameters: {
        include: "attachments",
        includeAll: true
        }
    };
    
    smartsheet.sheets.listSheets(options)
        .then(function (result) {
            // Choose the first sheet
            let sheetId = result.data[0].id;

            // Load one sheet
            smartsheet.sheets.getSheet({id: sheetId})
            .then(function(sheetInfo) {
                console.log(sheetInfo);
                // drill down to the sheets rows
                let rows = sheetInfo.rows[0.].cells;
                rows.forEach((each) => {
                    //check for specific text in a row/col. 
                    if (each.value == "col 2 text") {
                        console.log("this shit worked!")
                    }
                })
                console.log(`rows cell info: `, rows[0].cells)
                res.send(sheetInfo);
            })
            .catch(function(error) {
                console.log(error);
            });
        })
        .catch(function(error) {
            console.log(error);
        });
});

app.get('/pc-people', (req, res) => {
    axios({
        method: 'get', 
        url: 'https://api.planningcenteronline.com/people/v2/people?where[henry]=string',
        auth: {
            username: process.env.PC_APPLICATION_ID,
            password: process.env.PC_SECRET
        }
    })
    .then((response) => {
        console.log(`data.attributes: `, response.data.data);
        res.send(response.data);
    })
    .catch((err) => {
        console.log(err)
    })
})

// app.get('/pc-event', (req, res) => {
//     axios({
//         method: 'get', 
//         url: 'https://api.planningcenteronline.com//webhooks/v2/subscriptions',
//         auth: {
//             username: process.env.PC_APPLICATION_ID,
//             password: process.env.PC_SECRET
//         }
//     })
//     .then((response) => {
//         console.log(response.data);
//         console.log(`attribures: `, response.data.data[0].attributes);
//         console.log(`links: `, response.data.data[0].links);
//         res.send(response.data);
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })

app.get('/pc-event', (req, res) => {
    axios({
        method: 'get', 
        url: 'https://api.planningcenteronline.com/webhooks/v2/available_events',
        auth: {
            username: process.env.PC_APPLICATION_ID,
            password: process.env.PC_SECRET
        }
    })
    .then((response) => {
        console.log(` subscription deliveries: `, response.data);
        
        res.send(response.data);
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = app;

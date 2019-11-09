'use strict';

const $ = require('jquery');

let possibleList, deck, total;
let wannaListNumber = 4;

$('#btnGo').on('click', () => {
    possibleList = [];
    total = 0;
    // deck = ['AAA', 'AAA', 'CCC', 'DDD'];
    // deck = ['A', 'B', 'C', 'D', 'E', 'F'];
    deck = [
        'MEI', 'MEI', 'MEI', 'DES', 'LUC',
        'TMA', 'TMA', 'TMA', 'BOK', 'BOK',
        'FUN', 'FUN', 'FUN', 'TAN', 'TAN',
        'SUU', 'GLX', 'GLX', 'BLU', 'BAK'
    ];

    generatePossibleList(deck, []);

    console.log('----------------------------');
    console.log('Num: ', possibleList.length);    
    console.log('Total: ', total);
    $('#divText').html(possibleList.length);
    possibleList.forEach(e => {
        console.log(e.list + ' ' + e.count/total*100 + '%');
    });
});

function generatePossibleList(deck, list) {
    // console.log('deck: ', deck);
    // console.log('list: ', list);

    if (list.length === wannaListNumber) {
        total++;
        // console.log('ori list: ', list);
        list = JSON.stringify(list.sort());

        // not contain
        // console.log('list: ', list);
        if (!possibleList.some(e => e.list === list)) {
            // console.log('not contain, count: 1');
            possibleList.push({
                list: list,
                count: 1
            });
        }
        // contain
        else {
            possibleList.find(e => e.list === list).count++;
            // console.log('contain, count: ' + possibleList.find(e => e.list === list).count);
        }

        return;
    }

    // expand all
    deck.forEach((element, index) => {
        // console.log('element: ', element);

        var newDeck = [...deck];
        newDeck.splice(index, 1);
        // console.log('new deck: ', newDeck);

        var newList = [...list];
        newList.push(element);
        // console.log('new list: ', newList);

        generatePossibleList(newDeck, newList);
    });
}

/*const csvParser = require('csv-parser');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const $ = require('jquery');

const inputFilename = 'AWS PartnerManagement Platform  - 每月帳單報表.csv';
const outputFilename = 'output.csv';
const groupList = {
    ca: 'Club Assist',
    dhc: 'DHC',
    jap: 'DBA7 / ETBT-500'
};*/

/*$('#btnStart').on('click', () => {
    let results = [];
    fs.createReadStream(inputFilename)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // csv header
            let csvWriterKeys = Object.keys(results[0]);
            let csvWriterHeader = csvWriterKeys.reduce((header, current) => {
                header.push({
                    id: current,
                    title: current
                });
                return header;
            }, []);
            csvWriterHeader.push({
                id: 'Group',
                title: 'Group'
            });

            // csv config
            let csvWriterConfig = {
                path: outputFilename,
                header: csvWriterHeader
            };

            // calculate data
            let priceList = {
                ca: {
                    name: groupList.ca,
                    price: 0
                },
                dhc: {
                    name: groupList.dhc,
                    price: 0
                },
                jap: {
                    name: groupList.jap,
                    price: 0
                },
                other: {
                    name: 'Other',
                    price: 0
                }
            }
            let finalData = results.map((current) => {
                let group;
                let az = current['Availability Zone'];
                let pn = current['Product Name'];
                let ut = current['Usage Type'];
                let it = current['Item Description'];

                // Availability Zone
                if (az.includes('us-east-1')) {
                    group = groupList.ca;
                } else if (az.includes('ap-northeast-1')) {
                    group = groupList.jap;
                } else if (az.includes('us-west-2')) {
                    group = groupList.dhc;
                }

                // Product Name
                else if (pn === 'Amazon CloudFront') {
                    group = groupList.ca;
                } else if (pn === 'Amazon Elasticsearch Service') {
                    group = groupList.ca;
                } else if (pn === 'Amazon Route 53') {
                    group = groupList.ca;
                } else if (pn === 'Amazon Simple Email Service') {
                    group = groupList.ca;
                } else if (pn === 'AWS WAF') {
                    group = groupList.ca;
                } else if (pn === 'Amazon Simple Storage Service') {
                    group = groupList.ca;
                } else if (pn === 'AWS Support (Business)') {
                    group = groupList.dhc;
                    current['Monthly Amount'] = current['Unit Price']
                }

                // Usage Type
                else if (ut.startsWith('USE1')) {
                    group = groupList.ca;
                } else if (ut.startsWith('APN1')) {
                    group = groupList.jap;
                } else if (ut.startsWith('USW2')) {
                    group = groupList.dhc;
                } else if (ut === 'CW:Requests') {
                    group = groupList.ca;
                }

                // Item Description
                else if (it.includes('Northern Virginia')) {
                    group = groupList.ca;
                } else if (it.includes('N. Virginia')) {
                    group = groupList.ca;
                } else if (it.includes('Application load balancer')) {
                    group = groupList.ca;
                } else if (it.includes('Application LoadBalancer')) {
                    group = groupList.ca;
                }

                // add group
                current.Group = group;

                // price
                let ma = Number(current['Monthly Amount']);
                switch(group) {
                    case groupList.ca:
                        priceList.ca.price += ma;
                        break;
                    case groupList.dhc:
                        priceList.dhc.price += ma;
                        break;
                    case groupList.jap:
                        priceList.jap.price += ma;
                        break;
                    default:
                        priceList.other.price += ma;
                }

                return current;
            });

            // price display in view
            $('#txtCa').text(Math.round(priceList.ca.price * 100) / 100);
            $('#txtDhc').text(Math.round(priceList.dhc.price * 100) / 100);
            $('#txtJap').text(Math.round(priceList.jap.price * 100) / 100);
            $('#txtOther').text(Math.round(priceList.other.price * 100) / 100);

            // write csv
            let cw = csvWriter(csvWriterConfig);
            cw.writeRecords(finalData)
                .then(() => alert('write success!'));
        });
});*/
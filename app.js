'use strict';

const $ = require('jquery');
const csvWriter = require('csv-writer').createObjectCsvWriter;

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

    possibleList = sortArrayDesc(possibleList);
    possibleList = addRateToArray(possibleList, total);
    console.log('----------------------------');
    console.log('Num: ', possibleList.length);
    console.log('Total: ', total);
    $('#divText').html(possibleList.length);
    possibleList.forEach(e => {
        // console.log(e.list + ' ' + e.count / total * 100 + '%');
        console.log(e);
    });
});

$('#btnExport').on('click', () => {
    exportCSV(possibleList);
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

function sortArrayDesc(array) {
    return array.sort((a, b) => b.count - a.count);
}

function addRateToArray(array, total) {
    return array.map(element => {
        // 12.34
        element.rate = Math.round(element.count / total * 10000) / 100;
        return element;
    });
}

function exportCSV(array) {
    const outputFilename = 'output.csv';

    // csv config
    let csvWriterConfig = {
        path: outputFilename,
        header: [{
            id: 'list',
            title: 'List'
        }, {
            id: 'rate',
            title: 'Rate'
        }]
    };

    // write csv
    let cw = csvWriter(csvWriterConfig);
    cw.writeRecords(array)
        .then(() => alert('write success!'));
}
var possibleList = [];

var deck = [
    'MEI', 'MEI', 'MEI', 'DES', 'LUC',
    'TMA', 'TMA', 'TMA', 'BOK', 'BOK',
    'FUN', 'FUN', 'FUN', 'TAN', 'TAN',
    'SUU', 'GLX', 'GLX', 'BLU', 'BAK'
];
var wannaListNumber = 5;

generatePossibleList(deck, []);

console.log('----------------------------');
console.log('Num: ', possibleList.length);
// possibleList.forEach(e => {
//     console.log(e);
// });

function generatePossibleList(deck, list) {
    // console.log('deck: ', deck);
    // console.log('list: ', list);

    if (list.length === wannaListNumber) {
        list = JSON.stringify(list.sort());
        if (!possibleList.includes(list)) {
            possibleList.push(list);
        }
        return;
    }

    // select one
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
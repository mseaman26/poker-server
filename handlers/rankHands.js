

export const rankHands = (hands, players) => {
    console.log('players inside rankHands', players)
    function compareArrays(arr1, arr2) {
        // Compare elements at each index
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return arr2[i] - arr1[i]; // Ascending order
                // return arr2[i] - arr1[i]; // Descending order
            }
        }
        // If all elements are equal
        return 0;
    }
    for (let i = 0; i < hands.length; i++) {
        hands[i].player = i
    }
    hands.sort((a, b) => compareArrays(a.rank, b.rank));
    console.log('hands after sort', hands)
    let handRank = hands.length
    console.log('initial hand rank', handRank)
    players[hands[0].player].numericalHand = handRank
    for (let i = 1; i < hands.length; i++) {
        if(JSON.stringify(hands[i].rank) === JSON.stringify(hands[i - 1].rank)){
            console.log('tie. player: ', i, 'rank: ', handRank)
            players[hands[i].player].numericalHand = handRank
        }else{
            handRank--
            players[hands[i].player].numericalHand = handRank
        }
    }
    console.log('players at end of rankHands', players)
    return {players, hands}
}
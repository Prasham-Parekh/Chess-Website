const pieces = {
    'a8': '♜', 'b8': '♞', 'c8': '♝', 'd8': '♛', 'e8': '♚', 'f8': '♝', 'g8': '♞', 'h8': '♜',
    'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
    'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e2': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
    'a1': '♖', 'b1': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'g1': '♘', 'h1': '♖'
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

let tableContent = '';

for (let i = 0; i < 8; i++) {
    tableContent += '<tr>';
    for (let j = 0; j < 8; j++) {
        let colorClass = (i + j) % 2 === 0 ? 'white' : 'black';
        let cellId = letters[j] + numbers[i];
        let piece = pieces[cellId] || '';
        tableContent += `<td class="${colorClass}" id="${cellId}">${piece}</td>`;
    }
    tableContent += '</tr>';
}

document.write(tableContent);

const GeneticAlgorithm = require('../../source/genetic-algorithm');
const Individual = require('../../source/individual');
const SudokuIndividual = require('./individual');
const { enumerate } = require('../../source/utils');


const dimension = 9;
const sudokuAlleles = enumerate(dimension).map(i => i + 1);


const sudoku = new GeneticAlgorithm({
    Individual: SudokuIndividual,
    alleles: sudokuAlleles
});

sudoku.run([
    [ 0, 0, 0,   2, 6, 0,   7, 0, 1 ],
    [ 6, 8, 0,   0, 7, 0,   0, 9, 0 ],
    [ 1, 9, 0,   0, 0, 4,   5, 0, 0 ],

    [ 8, 2, 0,   1, 0, 0,   0, 4, 0 ],
    [ 0, 0, 4,   6, 0, 2,   9, 0, 0 ],
    [ 0, 5, 0,   0, 0, 3,   0, 2, 8 ],

    [ 0, 0, 9,   3, 0, 0,   0, 7, 4 ],
    [ 0, 4, 0,   0, 5, 0,   0, 3, 6 ],
    [ 7, 0, 3,   0, 1, 8,   0, 0, 0 ]
]);

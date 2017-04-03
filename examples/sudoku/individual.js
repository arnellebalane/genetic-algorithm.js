const Individual = require('../../source/individual');
const { enumerate, pick, difference } = require('../../source/utils');


const dimension = 9;
const sudokuAlleles = enumerate(dimension).map(i => i + 1);


class SudokuIndividual extends Individual {
    get alleles() {
        return this._value.reduce((acc, row) => {
            return acc.concat(row.map(col => col || pick(sudokuAlleles)));
        }, []);
    }

    set alleles(value) {
        this._value = enumerate(dimension).map(i => {
            return value.slice(dimension * i, dimension * (i + 1));
        });
    }

    fitness() {
        return enumerate(dimension).reduce((total, i) => {
            return total
                + difference(sudokuAlleles, this.getRow(i)).length
                + difference(sudokuAlleles, this.getColumn(i)).length;
        }, 0);
    }

    getRow(index) {
        return this.alleles.slice(dimension * index, dimension * (index + 1));
    }

    getColumn(index) {
        const alleles = this.alleles;
        return enumerate(dimension).map(i => alleles[dimension * i + index]);
    }

    getSubGroup(index) {
        const groupRows = 3;
        const groupColumns = 3;
        const groupDimension = 3;
        const alleles = this.alleles;
        return enumerate(dimension).map(i => {

        });
    }
}


module.exports = SudokuIndividual;



1 2 3 4
5 6 7 8
9 0 1 2
3 4 5 6

1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6

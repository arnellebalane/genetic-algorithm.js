import 'babel/polyfill';
import expect from 'expect.js';
import * as utils from '../utils';


describe('utils', () => {
    describe('merge(...objects)', () => {
        it('should return empty object when not given any arguments', () => {
            var expected = {};
            var actual = utils.merge();
            expect(actual).to.eql(expected);
        });

        it('should return given object when given only one argument', () => {
            var expected = { a: 'a' };
            var actual = utils.merge({ a: 'a' });
            expect(actual).to.eql(expected);
        });

        it('should return merged object when given two arguments', () => {
            var expected = { a: 'a', b: 'b' };
            var actual = utils.merge({ a: 'a' }, { b: 'b' });
            expect(actual).to.eql(expected);
        });

        it('should return merged object when given more arguments', () => {
            var expected = { a: 'a', b: 'b', c: 'c' };
            var actual = utils.merge({ a: 'a' }, { b: 'b' }, { c: 'c' });
            expect(actual).to.eql(expected);
        });

        it('should not modify any of the given arguments', () => {
            var object1 = { a: 'a' };
            var object2 = { b: 'b' };
            var expected = { a: 'a', b: 'b' };
            var actual = utils.merge(object1, object2);
            expect(actual).to.eql(expected);
            expect(object1).to.eql({ a: 'a' });
            expect(object2).to.eql({ b: 'b' });
        });
    });

    describe('items(object)', () => {
        it('should return an iterator for the given object', () => {
            var iterator = utils.items({ a: 'a', b: 'b' });
            expect(iterator).to.have.property('next');
            expect(iterator.next).to.be.a('function');
            expect(iterator.next()).to.have.keys('value', 'done');
        });

        it('should be able to iterate the given object', () => {
            var object = { a: 'a', b: 'b' };
            var iterator = utils.items(object);

            var a = iterator.next();
            expect(a).to.have.keys('value', 'done');
            expect(a.value).to.eql(['a', 'a']);
            expect(a.done).to.be(false);

            var b = iterator.next();
            expect(b).to.have.keys('value', 'done');
            expect(b.value).to.eql(['b', 'b']);
            expect(b.done).to.be(false);

            var c = iterator.next();
            expect(c).to.have.keys('value', 'done');
            expect(c.value).to.be(undefined);
            expect(c.done).to.be(true);
        });
    });

    describe('extend(base, extension)', () => {
        it('should extend given object with given extension', () => {
            var expected = { a: 'c', b: 'b' };
            var actual = utils.extend({ a: 'a' }, { a: 'c', b: 'b' });
            expect(actual).to.eql(expected);
        });

        it('should directly extend the given base object', () => {
            var base = { a: 'a' };
            var extension = { a: 'c', b: 'b' };
            var expected = { a: 'c', b: 'b' };
            utils.extend(base, extension);
            expect(base).to.eql(expected);
        });
    });

    describe('sum(...values)', () => {
        it('should return 0 when no values are given', () => {
            var expected = 0;
            var actual = utils.sum();
            expect(actual).to.be(expected);
        });

        it('should return given value when only one value is given', () => {
            var expected = 1;
            var actual = utils.sum(1);
            expect(actual).to.be(expected);
        });

        it('should return the sum of many given values', () => {
            var expected = 15;
            var actual = utils.sum(1, 2, 3, 4, 5);
            expect(actual).to.be(expected);
        });
    });

    describe('shuffle(array)', () => {
        it('should shuffle the given array', () => {
            var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var shuffled = utils.shuffle(array);
            expect(shuffled).to.not.eql(array);
        });

        it('should not shuffle given array the same way every time', () => {
            var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var first = utils.shuffle(array);
            var second = utils.shuffle(array);
            expect(first).to.not.eql(second);
        });

        it('should not modify the original given array', () => {
            var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var shuffled = utils.shuffle(array);
            expect(array).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
    });
});

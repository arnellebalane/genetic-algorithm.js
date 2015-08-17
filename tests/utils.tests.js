import 'babel/polyfill';
import expect from 'expect.js';
import utils from '../utils';


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
});

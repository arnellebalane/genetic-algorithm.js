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

    describe('items(object)', () => {
        it('should return an iterator for the given object', () => {
            var iterator = utils.items({ a: 'a', b: 'b' });
            expect(iterator).to.have.property('next');
            expect(iterator.next).to.be.a('function');
            expect(iterator.next()).to.have.keys('value', 'done');
        });

        it('should be able to iterate the given object', () => {
            var object = { a: 'a', b: 'b'};
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
});

import { listMatcher } from './genreMatcher';

describe("Tests to cover genre matcher", () => {
    it('should reuturn empty parenthesis', () => {
        listMatcher(undefined)
            .then((genres) => {
                expect(typeof genres).toEqual(typeof '');
                expect(genres).toEqual('');
            });
    });
    it("should return a list of movies genres", () => {
        listMatcher([18])
            .then((genres) => {
                expect(typeof genres).toBe(typeof '');
                expect(genres).toEqual('Drama');
            })
    });

})
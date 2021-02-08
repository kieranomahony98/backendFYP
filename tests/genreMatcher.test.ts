import * as helperGenre from '../helpers/genreMatcher';

describe("Tests to cover genre matcher", () => {
    it('should reuturn empty parenthesis', () => {
        const spy = jest.spyOn(helperGenre, "listMatcher").mockResolvedValueOnce('action');
        helperGenre.listMatcher([1])
            .then((genres) => {
                expect(typeof genres).toEqual(typeof '');
                expect(genres).toEqual('action');
            });
        spy.mockClear();
    });
    it("should return a list of movies genres", () => {
        const spy = jest.spyOn(helperGenre, "listMatcher").mockResolvedValueOnce('action, drama, adventure');
        helperGenre.listMatcher([18])
            .then((genres) => {
                expect(typeof genres).toBe(typeof '');
                expect(genres).toEqual('action, drama, adventure');
            });
        spy.mockClear();

    });
    it('should return a list of movie genres', () => {
        helperGenre.genreMatcher(['18', '28'])
            .then((result) => {
                expect(typeof result).toEqual(typeof '');
                expect(result).toEqual('Drama, Action');
            })
    });
    it('should return a list of movie genres, no mocks', () => {
        helperGenre.listMatcher([18])
            .then((res) => {
                expect(res).toEqual('Drama');
                expect(typeof res).toBe(typeof '');
            });
    });
    it('should return an empty string', () => {
        helperGenre.listMatcher(undefined)
            .then((res) => {
                expect(res).toEqual('');
            })
    });

});
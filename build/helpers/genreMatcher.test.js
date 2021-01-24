"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genreMatcher_1 = require("./genreMatcher");
describe("Tests to cover genre matcher", () => {
    it('should reuturn empty parenthesis', () => {
        genreMatcher_1.listMatcher(undefined)
            .then((genres) => {
            expect(typeof genres).toEqual(typeof '');
            expect(genres).toEqual('');
        });
    });
    it("should return a list of movies genres", () => {
        genreMatcher_1.listMatcher([18])
            .then((genres) => {
            expect(typeof genres).toBe(typeof '');
            expect(genres).toEqual('Drama');
        });
    });
});
//# sourceMappingURL=genreMatcher.test.js.map
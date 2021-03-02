import * as helperQuery from '../helpers/revisedQuery';
import { movieSearchCriteriaModel } from '../tsModels/movieGernerationModel';

const fullSurvey = {
    with_genres: '1,2,3',
    primary_release_year: 2020,
    with_keywords: '1',
}
const returnFullSurvey = {
    with_genres: '1,2,3',
    with_keywords: '1',
}
const keywordsSurvey = {
    with_genres: '1,2,3',
    with_keywords: '1,2',
}
const returnkeywordsSurvey = {
    with_genres: '1,2,3',
    with_keywords: '1',
    sort_by: undefined
}
const genreList = {
    with_genres: '1,2,3',

}

const returngenreList: movieSearchCriteriaModel = {
    with_genres: '1,2',
};
describe('Testing the query revision algorithim', () => {
    it('should return a query without release year', () => {
        helperQuery.revisedQuery(fullSurvey)
            .then((res) => {
                expect(res).toEqual(returnFullSurvey);
            });
    });
    it('should return query with spliced keywords', () => {
        helperQuery.revisedQuery(keywordsSurvey)
            .then((res) => {
                expect(res).toEqual(returnkeywordsSurvey);
            });
    });
    it('should return query without sortby', () => {
        helperQuery.revisedQuery(genreList)
            .then((res) => {
                expect(res).toEqual(returngenreList);
            });
    });
    it('should return a blank object', () => {
        helperQuery.revisedQuery({})
            .then((res) => {
                expect(res).toEqual({});
            });
    });
    it('should throw an error', () => {
        const revised = jest.spyOn(helperQuery, "revisedQuery").mockRejectedValue('failed to revise query');
        helperQuery.revisedQuery(genreList)
            .catch((err) => {
                expect(err).toEqual('failed to revise query');
            });
        revised.mockClear();
    });
});
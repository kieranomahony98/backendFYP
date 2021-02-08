import mongoose from 'mongoose';
import * as comments from '../services/commentServices/commentService';

describe('Tests for comment service functionality', () => {
    beforeAll(async () => {
        const url = process.env.MONGO_URI ? process.env.MONGO_URI : '';
        await mongoose.connect(url, { useNewUrlParser: true });

    });
    it('should return false', () => {
        comments.updateSingleComment('', '')
            .then((comment) => {
                expect(comment).toEqual(false);
            });
    });
});
import { userComment, userCommentObj, structureCommentReturn, tsCommentSchema } from '../../tsModels/commentModels';
import CommentSchema from '../../MongoModels/conmmentModel';
import { logger } from '../../helpers/logger';

export async function updateSingleComment(_id: string, commentText: string) {
    if (!_id || !commentText) return false;
    CommentSchema.updateOne({ _id }, { $set: { commentText: commentText } })
        .then((commentWrote) => true)
        .catch((err) => {
            logger.error(`Failed to update comment: ${err.message}`);
            throw err;
        });
}

export async function addComment(commentData: any) {
    console.log(JSON.stringify(commentData));
    try {
        let commentObj: tsCommentSchema = {
            movieId: commentData.movieId,
            user: {
                userId: commentData.id,
                userName: commentData.userName
            },
            commentText: commentData.commentText,
            commentDownVotes: 0,
            commentUpVotes: 0
        }

        commentObj.depth = (commentData.depth) ? commentData.depth : 1;
        commentObj.parentId = (commentData.parentId) ? commentData.parentId : null;

        new CommentSchema(commentObj).save()
            .then((comment) => comment)
            .catch((err) => {
                logger.error(`Failed to add comment: ${err.message}`);
                throw err;
            });
    } catch (err) {
        logger.error(`Failed to add comment: ${err.message}`);
        throw err;
    }
}

export async function getCommentsForPost(movieId: string) {
    return await CommentSchema.find({ movieId }).lean().exec()
        .then((commentsForMovie) => {
            let rec = (comment: any, threads: any) => {
                for (let thread in threads) {
                    const value = threads[thread];

                    if (thread.toString() === comment.parentId.toString()) {
                        value.children[comment._id] = comment;
                        return;
                    }
                    if (value.children) {
                        rec(comment, value.children)
                    }
                }
            }
            let threads: any = {};
            let comment: any;
            for (let q = 0; q < commentsForMovie.length; q++) {
                comment = commentsForMovie[q];
                comment['children'] = {};
                let parentId = comment.parentId;
                if (!parentId) {
                    threads[comment._id] = comment
                    continue;
                }
                rec(comment, threads);
            }
            return {
                count: commentsForMovie.length,
                comments: threads
            }
        })
        .catch((err) => {
            logger.error(`Failed to get comments for movie ${movieId}: ${err.message}`);
            throw err;
        });

}

export async function deleteComment(_id: string) {
    CommentSchema.findOneAndUpdate({ _id }, { $set: { commentText: 'This comment has been delete', 'user.userId': null, 'user.userName': 'Unknown' } })
        .then((result) => result)
        .catch((err) => {
            logger.error(`failed to delete user: ${err.message}`);
            throw err;
        });
}

export async function setUpvotes(_id: string, commentScore: Number) {
    CommentSchema.findOneAndUpdate({ _id }, { $set: { commentUpvotes: commentScore } })
        .then((newScore) => newScore)
        .catch((err) => {
            logger.error(`failed to increase score: ${err.message}`);
            throw err;
        });
}

export async function setDownvotes(_id: string, commentScore: Number) {
    CommentSchema.findOneAndUpdate({ _id }, { $set: { commentUpvotes: commentScore } })
        .then((newScore) => newScore)
        .catch((err) => {
            logger.error(`failed to increase score: ${err.message}`);
            throw err;
        });
}
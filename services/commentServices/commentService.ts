import { userComment, userCommentObj, structureCommentReturn, tsCommentSchema } from '../../tsModels/commentModels';
import CommentSchema from '../../MongoModels/conmmentModel';
import { logger } from '../../helpers/logger';

export async function updateSingleComment({ id, commentText }: any) {
    if (!id || !commentText) return false;
    CommentSchema.updateOne({ _id: id }, { $set: { commentText: commentText } })
        .then((commentWrote) => true)
        .catch((err) => {
            logger.error(`Failed to update comment: ${err.message}`);
            throw err;
        });
}

export async function addComment(commentData: any) {
    try {
        let commentObj = {
            movieId: commentData.movieId,
            user: {
                userId: commentData.userId,
                userName: commentData.userName
            },
            commentText: commentData.commentText
        } as tsCommentSchema;

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
            console.log(commentsForMovie);
            let rec = (comment: any, threads: any) => {
                for (var thread in threads) {
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
            let nests: any = {};
            let comment: any;
            for (let q = 0; q < commentsForMovie.length; q++) {
                comment = commentsForMovie[q]
                comment['children'] = {}
                let parentId = comment.parentId
                if (!parentId) {
                    nests[comment._id] = comment
                    continue
                }
                rec(comment, nests);
            }
            return {
                count: commentsForMovie.length,
                comments: nests
            }
        })
        .catch((err) => {
            logger.error(`Failed to get comments for movie ${movieId}: ${err.message}`);
            throw err;
        });

}
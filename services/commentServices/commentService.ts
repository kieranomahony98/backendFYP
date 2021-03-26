import { tsCommentSchema } from '../../tsModels/commentModels';
import CommentSchema from '../../MongoModels/conmmentModel';
import { logger } from '../../helpers/logger';
import { checkIfDiscussionExists } from '../dbServices/discussionDbservice';
import { movieObject } from '../../tsModels/movieGernerationModel';
// https://github.com/chennakt9/nested-commenting-system this repo helped me build this file
export async function updateSingleComment(_id: string, commentText: string) {
    if (!_id || !commentText) {
        return false;
    }
    CommentSchema.updateOne({ _id }, { $set: { commentText } })
        .then((commentWrote) => true)
        .catch((err) => {
            logger.error(`Failed to update comment: ${err.message}`);
            throw err;
        });
}

export async function addComment(commentData: any) {
    try {
        let commentObj: tsCommentSchema = {
            movieId: commentData.movieId,
            user: {
                userId: commentData.id,
                userName: commentData.userName
            },
            commentText: commentData.commentText,
            commentDownVotes: 0,
            commentUpVotes: 0,
            isDeleted: false
        };

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

export async function getCommentsForPost(movie: movieObject) {
    const isDiscussion = await checkIfDiscussionExists(movie.movieId)
        .then((bool) => bool)
        .catch((err) => {
            logger.error(`Failed to check if discussion exists: ${err.message}`);
            throw err;
        });
    if (!isDiscussion) {
        return {
            count: 0,
            comments: []
        };
    }

    return await CommentSchema.find({ movieId: movie.movieId }).lean().exec()
        .then((commentsForMovie) => {
            let filterChildren = (comment: any, threads: any) => {
                for (const thread in threads) {
                    const value = threads[thread];
                    if (thread.toString() === comment.parentId.toString()) {
                        value.children[comment._id] = comment;
                        return;
                    }
                    if (value.children) {
                        filterChildren(comment, value.children);
                    }
                }
            }
            let threads: any = {};

            let comment: any;
            for (let q = 0; q < commentsForMovie.length; q++) {
                comment = commentsForMovie[q];
                if (comment.commentScore < -5) comment.commentText = "This comment is hidden due to low scoring";

                comment['children'] = {};
                let parentId = comment.parentId;
                if (!parentId) {
                    threads[comment._id] = comment;
                    continue;
                }

                filterChildren(comment, threads);
            }
            return {
                count: commentsForMovie.length,
                comments: threads
            }
        })
        .catch((err) => {
            logger.error(`Failed to get comments for movie ${movie.movieId}: ${err.message}`);
            throw err;
        });

}

export async function deleteComment(_id: string) {
    CommentSchema.findOneAndUpdate({ _id }, { $set: { commentText: 'This comment has been delete', 'user.userId': null, 'user.userName': 'Unknown', isDeleted: true } })
        .then((result) => result)
        .catch((err) => {
            logger.error(`failed to delete user: ${err.message}`);
            throw err;
        });
}

export async function setScore(_id: string, commentScore: Number, value: number, userId: string, changedFromUpVote: boolean, changedFromDownVote: boolean) {

    if (changedFromDownVote) {
        return CommentSchema.findByIdAndUpdate({ _id }, { $set: { commentScore }, $pull: { commentDownVotes: userId } })
            .then((completed) => completed)
            .catch((err) => {
                logger.error(`Failed to update score, changed from a downvote ${err.message}`);
                throw err;
            });
    }
    if (changedFromUpVote) {
        return CommentSchema.findByIdAndUpdate({ _id }, { $set: { commentScore }, $pull: { commentUpVotes: userId } })
            .then((completed) => completed)
            .catch((err) => {
                logger.error(`Failed to update score, changed from a upvote ${err.message}`);
                throw err;
            });
    }

    const scoreType = (value === 1) ? 'commentUpVotes' : "commentDownVotes";
    return CommentSchema.findByIdAndUpdate({ _id }, { $set: { commentScore }, $push: { [scoreType]: userId } })
        .then((newScore) => {
            return newScore;
        })
        .catch((err) => {
            logger.error(`failed to increase score: ${err.message}`);
            throw err;
        });
}

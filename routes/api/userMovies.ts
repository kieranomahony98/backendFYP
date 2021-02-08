import express from 'express';
import { logger } from '../../helpers/logger';
import { returnMovies } from '../../services/movieServices/discoverMoviesService';
import { writeToDatabase, getMoviesFromDatabase, getPlaylistsFromDatabase } from '../../services/dbServices/movieDbService';
import { auth } from '../../middleware/auth';
import { addComment, updateSingleComment, getCommentsForPost, deleteComment, setScore } from '../../services/commentServices/commentService';
import { checkIfDiscussionExists, createDiscussion, getAllDiscussions, getMovie } from '../../services/dbServices/discussionDbservice';
// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/creaes', (req, res) => {

});
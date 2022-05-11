const express = require('express');

const router = express.Router();

const { postController } = require('../../controllers/job_seeker');

router.route('/favorite/add').post(postController.addFavoritePost);
router.route('/favorite/delete').delete(postController.deleteFavoritePost);
router.route('/favorite-posts').get(postController.getFavoritePosts);

module.exports = router;
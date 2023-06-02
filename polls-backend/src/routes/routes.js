const express = require('express');
const router = express.Router();

const { getAllPolls, createPoll, updateVotesPoll, updatePoll, deletePoll} = require('../functions/polls');

router.get('/', getAllPolls);
router.post('/createNewPoll', createPoll);
router.put('/updateVotesPoll', updateVotesPoll);
router.put('/updatePoll', updatePoll);
router.delete('/deletePoll', deletePoll);


module.exports = router;
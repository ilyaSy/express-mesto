const router = require('express').Router();

const getCards = (req, res) => {

};

const createCard = (req, res) => {
  const {name, link} = req.query;
};

const deleteCard = (req, res) => {
  const {cardId} = req.params;
};

const toggleLike = (req, res) => {
  const {cardId} = req.params;
  const like = req.method === 'PUT' ? true : false;
}

router.get('/cards', getCards);
router.post('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', toggleLike);
router.delete('/cards/:cardId/likes', toggleLike);

module.exports = router;
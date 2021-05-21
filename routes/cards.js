const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  toggleLikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', toggleLikeCard);
router.delete('/cards/:cardId/likes', toggleLikeCard);

module.exports = router;

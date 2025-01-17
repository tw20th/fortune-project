const express = require('express');
const { User, TarotCard, UserTarotResult } = require('../models');

const router = express.Router();

// 検索エンドポイント
router.get('/user-tarot-results', async (req, res) => {
  const { userId } = req.query; // クエリパラメータで userId を取得
  try {
    const where = userId ? { userId } : {};
    const results = await UserTarotResult.findAll({
      where,
      include: [
        { model: User, attributes: ['name'] },
        { model: TarotCard, attributes: ['name', 'description'] },
      ],
    });

    const formattedResults = results.map((result) => ({
      id: result.id,
      userId: result.userId,
      tarotCardId: result.tarotCardId,
      userName: result.User.name,
      tarotCardName: result.TarotCard.name,
      description: result.TarotCard.description,
      createdAt: result.createdAt,
    }));

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user tarot results' });
  }
});

// データ作成エンドポイント
router.post('/user-tarot-results', async (req, res) => {
  const { userId, tarotCardId } = req.body;
  try {
    const newResult = await UserTarotResult.create({ userId, tarotCardId });
    res.status(201).json(newResult);
  } catch (error) {
    console.error('Error creating user tarot result:', error); // ログ出力
    res.status(400).json({ error: 'Failed to create user tarot result' });
  }
});

module.exports = router;

const { User, Fortune, UserFortune } = require('./models');

(async () => {
  try {
    // ユーザーを取得（例: Alice）
    const user = await User.findOne({ where: { name: 'Alice' } });

    // ランダムでタロットカード（Fortune）を引く
    const fortunes = await Fortune.findAll();
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    // 結果をデータベースに保存
    await UserFortune.create({
      user_id: user.id,
      fortune_id: randomFortune.id,
    });

    console.log(
      `User ${user.name} drew a card: ${randomFortune.category} - "${randomFortune.description}"`
    );
    process.exit(0);
  } catch (error) {
    console.error('Error during drawing a card:', error);
    process.exit(1);
  }
})();

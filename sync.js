const { sequelize, User, TarotCard, UserTarotResult } = require('./models');

(async () => {
  try {
    // 外部キー制約を無効化
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

    // データベースの同期
    await sequelize.sync({ force: true });

    // 外部キー制約を有効化
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Database synchronized successfully!');

    // 必要な初期データを挿入（オプション）
    await User.bulkCreate([
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
    ]);

    console.log('Initial data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1);
  }
})();

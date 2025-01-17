require('dotenv').config(); // .env ファイルを読み込む

const { Sequelize, DataTypes } = require('sequelize');

// Sequelize インスタンスを初期化
const sequelize = new Sequelize(
  process.env.DB_NAME, // 環境変数からデータベース名を取得
  process.env.DB_USER, // 環境変数からユーザー名を取得
  process.env.DB_PASSWORD, // 環境変数からパスワードを取得
  {
    host: process.env.DB_HOST || 'localhost', // デフォルトで localhost
    dialect: 'mysql', // MySQL を使用
    port: process.env.DB_PORT || 3306, // デフォルトポート 3306
  }
);

// モデルの定義
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
});

const TarotCard = sequelize.define('TarotCard', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

const UserTarotResult = sequelize.define('UserTarotResult', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  tarotCardId: { type: DataTypes.INTEGER, allowNull: false },
});

const Fortune = sequelize.define('Fortune', {
  category: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});

// リレーションの設定
User.hasMany(UserTarotResult, { foreignKey: 'userId' });
UserTarotResult.belongsTo(User, { foreignKey: 'userId' });

TarotCard.hasMany(UserTarotResult, { foreignKey: 'tarotCardId' });
UserTarotResult.belongsTo(TarotCard, { foreignKey: 'tarotCardId' });

// エクスポート
module.exports = { sequelize, User, TarotCard, UserTarotResult, Fortune };

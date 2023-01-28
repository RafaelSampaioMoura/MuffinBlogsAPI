module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      name: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
      tableName: "categories",
    }
  );

  return Category;
};

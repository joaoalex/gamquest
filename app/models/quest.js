module.exports = (sequelize, DataTypes) => {
  const Quest = sequelize.define("quest", {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    published: {
      type: DataTypes.BOOLEAN
    },
    questjson: {
      type: DataTypes.TEXT('long')
    }
  });

  return Quest;
 
};

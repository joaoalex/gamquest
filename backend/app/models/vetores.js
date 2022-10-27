module.exports = (sequelize, DataTypes) => {
  
const Vetores = sequelize.define("vetores",  {
    equipa:   {        type: DataTypes.INTEGER  },
    tipo:     {        type: DataTypes.STRING  },
    ordem:    {        type: DataTypes.STRING  },
    texto:    {        type: DataTypes.STRING  },
    ativo:    {        type: DataTypes.BOOLEAN }
    }
  );

return Vetores;
};

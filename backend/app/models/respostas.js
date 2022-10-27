module.exports = (sequelize, DataTypes) => {
  
const Respostas = sequelize.define("respostas",  {
    equipa:   {        type: DataTypes.INTEGER  },
    vetor:    {        type: DataTypes.STRING  },
    ordem:    {        type: DataTypes.STRING  },
    texto:    {        type: DataTypes.STRING  },
    ativo:    {        type: DataTypes.BOOLEAN }
    }
  );

return Respostas;
};

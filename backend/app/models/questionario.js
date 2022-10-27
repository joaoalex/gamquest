module.exports = (sequelize, DataTypes) => {

const Questionario = sequelize.define("questionario",  {
    equipa:     {        type: DataTypes.STRING },
    role:       {        type: DataTypes.STRING },
    pergunta: {        type: DataTypes.STRING },
    resposta: {        type: DataTypes.STRING }
    }
  
  );

return Questionario;
};

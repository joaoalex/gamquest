module.exports = (sequelize, DataTypes) => {
  
    const Roles = sequelize.define("roles",  {
        team:   {        type: DataTypes.INTEGER  },
        role:    {        type: DataTypes.STRING  }     
        }
      );
    
    return Roles;
    };
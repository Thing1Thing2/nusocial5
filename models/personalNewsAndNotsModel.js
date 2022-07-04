module.exports = (sequelize, DataTypes) => {
    const PersonalNewsAndNots = sequelize.define("personalnewsandnots", {
        from : {
            type: DataTypes.STRING,
            allowNull: false
           }, 
           to : {
            type: DataTypes.STRING,
            allowNull: false,
           },
           body:{
                type : DataTypes.STRING,
                allowNull: false
               }
    });
    return PersonalNewsAndNots;
};
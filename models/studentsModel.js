module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("students", {
        nus_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,    
            notEmpty: true,  
        },
        nusnet_id: {
            type: DataTypes.STRING,
            unique: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            notEmpty: true,  
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,  
        }, 
        course_name: {
            type: DataTypes.STRING,
            notEmpty: true,  
        },
        year_of_study: {
            type: DataTypes.INTEGER,
            isDecimal: true
        },
        online:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        friendTable: {
            type: DataTypes.STRING,
            unique: true,
        }, 
        profilePicture: {
            type: DataTypes.STRING,
        }
    });

    return Students;
};

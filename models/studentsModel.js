module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("students", {
        nus_email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false 
        }, 
        course_name: {
            type: DataTypes.STRING,  
        },
        year_of_study: {
            type: DataTypes.INTEGER,
        },
        online:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        postsCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        profilePictureURL: {
            type: DataTypes.STRING
        }
    }, {
        createdAt: "registeredAt",
        updatedAt: "modifiedAt"
    });
    return Students;
};

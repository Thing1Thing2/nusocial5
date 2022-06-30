module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        sender_nusocial_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    return Post;
};


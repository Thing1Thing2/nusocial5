const db = require('../models')
const {Sequelize, DataTypes} = require('sequelize');
const dbConfig = require('../config/dbConfig.js');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

// image Upload
const multer = require('multer')
const path = require('path')


// create main Model
const Student = db.students
const Chat = db.chats
const Post = db.posts;

// main work

// 1. create student

const addStudent = async (req, res) => {
    console.log(req.body.password);
    password = req.body.password;
    let info = {
        username: req.body.username,
        nus_email: req.body.nus_email,
        password: req.body.password,
        friendTable: req.body.username + "friends",
    }
    try {
    await Student.findOne({where: {username: info.username}}).then(async stu => {
        if (stu) {
            res.status(200).send("username is taken");
        } else {
            await Student.findOne({where: {nus_email: info.nus_email}}).then(async stu => {
                if (stu) {
                    res.status(200).send("You cannot create more than once account with the same email");
                } else {
                    Student.create(info).then(function(item){
                        res.status(200).send("successfully registered")
                      }).catch(err=> {
                        res.status(200).send(err);
                    });
                }
            })
        }
    }
     )
} catch (err) {
    res.send(200).send("error adding student");
    console.log("error adding student: " + err);
}
}

// 2. Create Friends table on register

const friendsTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const tableName = info.username + "friends";
  const FriendsTable = sequelize.define(tableName, {
    friendUsername: {
        type: DataTypes.STRING,
    }, 
    reqStatus:{
        type : DataTypes.STRING,
    },
    chatId: {
        type: DataTypes.STRING,
    },
    sentBy: {
        type: DataTypes.STRING,
    }
})
await FriendsTable.sync();
}

// 3. Create Photos table on register

const photosTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const tableName = info.username + "photos";
  const PhotosTable = sequelize.define(tableName, {
    image: {
        type: DataTypes.STRING,
    }, 
    at:{
        type : DataTypes.STRING,
    }
})
await PhotosTable.sync();
}

// 4. Create Links table on register
const linksTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const tableName = info.username + "links";
  const LinksTable = sequelize.define(tableName, {
    link: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    } ,
    at:{
        type : DataTypes.STRING,
    }
})
await LinksTable.sync();
}


// 5. Create News and Nots table on register
const newsandNotsTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const tableName = info.username + "newsandnots";
  const NewsAndNotsTable = sequelize.define(tableName, {
    origin: {
        type: DataTypes.STRING,
         // news can be created by a group or notification obtained from website so indicate origin 
         // group id if group posted this news
         // web url if got news from url
         // as an extension: user can add a reminder for themselves
    },
    image: {
        type: DataTypes.STRING, //only for news
    }, 
    body:{
        type : DataTypes.STRING, 
    }, 
    type : {
        type: DataTypes.STRING, //either news or notification
    }, 
    link : {
        type: DataTypes.STRING,
    }
})
await NewsAndNotsTable.sync();
}
// news has body and image, notification has body and link


// 6. Create Posts table on register

const postsTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const postsTableName = info.username + "posts";
    const PostsTable = sequelize.define(postsTableName, {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    await PostsTable.sync();
}
 



// 7. Create Comments table on register
const commentsTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const tableName = info.username + "comments";
    const CommentsTable = sequelize.define(tableName, {
        postId: {
            type: DataTypes.STRING,
        }, 
        body:{
            type : DataTypes.STRING,
        },
    })
    await CommentsTable.sync();
}

// 8. Create Groups table on register
const groupsTable = async (req, res) => {
    let info = {
        username: req.body.username,
    }
    const tableName = info.username + "groups";
    const GroupsTable = sequelize.define(tableName, {
        groupId: {
            type: DataTypes.STRING,
        }, 
        membershipStatus:{
            type : DataTypes.STRING,//member or admin
        }
    })
    await GroupsTable.sync();
}

// 9. get single student based on id and password

const findStudent = async (req, res) => {
    console.log("in find student");
    let username = req.body.username
    let password = req.body.password
    console.log(req.body);
    await Student.findOne({ where: { username: username}}).then(async stu => {
        console.log("Stu is: " + stu);
        if(stu) {
            console.log("in password compare");
            if(password === stu.password){
                stu.update({
                    online: true
                  })
                  res.status(200).send("successful login")
            } else {
                res.status(200).send("Incorrect password")
            }
            } 
            else {
                res.status(200).send("This User id does not exist");
            }
    }).catch(err=> 
        res.status(200).send(err));     
    
}


// 10. Logout student

const logoutStudent = async (req, res) => {
    let username = req.body.username
    let student = await Student.findOne({ where: { username: username}});
    student.update({online: false}).then(function(item){
        res.status(200).send("successfully logout")
      }).catch(function (err) {
        res.send("error occured")
        console.log(err);
      });   
}

// 11. 

const getStudentChats =  async (req, res) => {

    const id = req.params.id

    const data = await Student.findOne({
        include: [{
            model: Chat,
            as: 'chat'
        }],
        where: { id: id }
    })

    res.status(200).send(data)

}


// 8. Upload Image Controller

const addProfilePicture = async (req, res) => {
if(!req.file) {
    res.send("No file upload");
} else {
    console.log(req.file);
    console.log(req.body);
    console.log(req.body.username);
    res.send(req.body.username + "ProfilePic");
}
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../server/client/src/ProfilePics')
    },
    filename: (req, file, cb) => {
        const imageName = req.body.username + "ProfilePic.jpg";
        cb(null, imageName)
        let info = {
           profilePicture : imageName,
        }
        Student.update(info, { where : { username : req.body.username}});
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('path')

// 9. check if student is online

const isOnline = async (req, res) => {
    let uid = req.body.chat
    await Student.findOne({  attributes: ['online'], where: {username: uid},raw: true}).then(stu => {
        console.log("stu in isOnline : " + stu.online);
        if (stu.online === 1) {
        res.status(200).send("online");
        } else {
        res.status(200).send("offline");
        }
      }).catch(function (err) {
        res.send("error occured")
        console.log(err);
      });   
}

// 5. delete product by id

const deleteStudent = async (req, res) => {

    let id = req.params.id
    
    await Student.destroy({ where: { id: id }} )

    res.status(200).send('Student is deleted !')

}

const getAllStudents = async (req, res) => {
    let students = await Student.findAll({attributes: ['username']})
    res.status(200).send(students)
}

module.exports = {
    addStudent,
    friendsTable,
    linksTable,
    commentsTable,
    newsandNotsTable,
    photosTable,
    postsTable,
    groupsTable,
    logoutStudent,
    findStudent,
    deleteStudent,
    getStudentChats,
    upload,
    isOnline,
    addProfilePicture,
    getAllStudents
}


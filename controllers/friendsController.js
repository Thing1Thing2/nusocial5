const db = require('../models')


const {Op} = require("sequelize");

// create main Model
const Student = db.students
const Friends = db.friends;
const PersonalNewsAndNots = db.personalnewsandnots;

// main work


const addFriend = async (req, res) => {
    let info = {
        username: req.body.username,
        friend: req.body.friend,
        reqStatus: "pending",
        chatId: req.body.username + req.body.friend + "Chat",
        sentBy: req.body.username
    }
    try {
    await Friends.findOne({where: {[Op.or]: [{username: info.username,friend:info.friend, reqStatus:"confirm" }, {username: info.friend,friend:info.username, reqStatus:"confirm" }]}}).then(async stu => {
        if (stu) {
                res.status(200).send("Friend request already sent once");s
        } else {
            await Friends.findOne({where: {[Op.or]: [{username: info.username,friend:info.friend, reqStatus:"confirm" }, {username: info.friend,friend:info.username, reqStatus:"confirm" }]}}).then(async stu => {
                if (stu) {
                    res.status(200).send("You are already friends with " + info.friend);
                } else {
                    if (info.username === info.friend) {
                        res.status(200).send("cannot send friend request to yourself")
                    } else {
                    Friends.create(info).then(function(item) {
                        const infoNews = {
                            from: info.username,
                            to: info.friend,
                            body: `${info.username} sent you a friend request`
                        }
                          const settings = {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(infoNews),
                          }
                        fetch("https://nusocial5.herokuapp.com/api/personalnewsandnots/addNews", settings).then(response => response.text()).then(msg => {
                        if (msg === "sent message") {
                            res.status(200).send("successfully sent friend request"); 
                        } else {
                          res.status(200).send(msg);
                        }
                        })
                        
                        
                    }).catch(e => {console.log(e)
                    res.status(200).send("Error adding friend");})
                    }
                }
            })
        }
    }
    )
} catch (err) {
    res.status(200).send("error adding friend");
    console.log("error adding friend: " + err);
}
}

const confirmFriend = async (req, res) => {
    let username = req.body.username;
    let friendName = req.body.friend;
    let friend = await Friends.findOne({ where: { username: friendName, friend: username}});
    if (friend) {
        if(friend.reqStatus === "pending") {
    friend.update({reqStatus: "confirm"}).then(async function(item){
        await PersonalNewsAndNots.destroy({ where: { from: friendName, to: username}} )
        const info = {
            from: username,
            to: friendName,
            body: `${username} confirmed your friend request`
        }
      const settings = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }
    fetch("https://nusocial5.herokuapp.com/api/personalnewsandnots/addNews", settings).then(response => response.text()).then(msg => {
    if (msg === "sent message") {
        res.status(200).send("confirmed friend") 
    } else {
      res.status(200).send(msg);
    }
    })
    
      }).catch(function (err) {
        res.status(200).send("error occured")
        console.log(err);
      }); 
    } else {
        res.status(200).send("Already confirmed");
    }
    } else {
        res.status(200).send("No such friend request");
    }  
}

const getAllStudentsNotFriends = async (req, res) => {
    let username = req.body.username;
    let stu = await Student.findOne({
        where: {
            username: username
        }
    })
    if (stu) {
    let friends = await Friends.findAll(
      {
        attributes: ['username', 'friend']   
    });
   
    const f =  friends.filter(friend =>  friend.username === username || friend.friend === username).map(friend => {
        if(friend.username === username) {
            return friend.friend;
        } else {
            return friend.username;
        }
    }
       );
f.push(username);
   const filteredStudents = await Student.findAll({
    attributes: ['username'],
    where: {
        username: {[Op.notIn]:f}}
 })
   res.status(200).send(filteredStudents);
} else {
    res.status(200).send("Create an account to make friends");
}
}

const getAllFriendRequestsPending = async (req, res) => {
    let username = req.body.username;
    let stu = await Student.findOne({
        where: {
            username: username
        }
    })
    if (stu) {
        const pendingSent = await Friends.findAll({
            attributes: ['friend'],
            where: {
                reqStatus: "pending",
                sentBy: username
         }});
         const pendingReceived = await Friends.findAll({
            attributes: ['username'],
            where: {
                reqStatus: "pending",
                friend: username
            }
         })
         let returnList = [];
         pendingSent.map((sent)=> {
            returnList.push(["sent", sent.friend]);
         })
         pendingReceived.map((sent)=> {
            returnList.push(["received", sent.username]);
         })
         res.status(200).send(returnList);
    } else {
        res.status(200).send("Create an account to make friends");
    }
}

const getAllConfirmedFriends = async (req, res) => {
    let username = req.body.username;
    let stu = await Student.findOne({
        where: {
            username: username
        }
    })
    if (stu) {
        const friends = await Friends.findAll({
            attributes: ['username','friend'],
            where: {
                reqStatus: "confirm",
                [Op.or]: [{username: username}, {friend: username}]
         }});
         const confirmed = friends.map((friend)=> {
            if(friend.username === username){
                return friend.friend;
            } else {
                return friend.username;
            }
         })
         res.status(200).send(confirmed);
    } else {
        res.status(200).send("Create an account to make friends");
    }
}

module.exports = {
    addFriend,
    confirmFriend,
    getAllStudentsNotFriends,
    getAllFriendRequestsPending,
    getAllConfirmedFriends
}
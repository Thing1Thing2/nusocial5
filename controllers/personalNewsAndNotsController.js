const db = require('../models')
const sequelize = require("sequelize");


// create main Model
const Student = db.students
const Friends = db.friends;
const PersonalNewsAndNots = db.personalnewsandnots;

// main work

const addPersonalNewsAndNots = async (req, res) => {
  
    const from = req.body.from;
    const to = req.body.to;
    const body = req.body.body;
    const info = {
        from: from,
        to: to,
        body: body
    }

    let stu = await Student.findOne({where: {username: info.username}})
        if (stu) {
           PersonalNewsAndNots.create(info);
           res.status(200).send("sent message");
        } else {
            res.status(200).send("please login to be able to send a note");
        }
}

const getPersonalNewsAndNots = async (req, res) => {
    const username = req.body.username;
    console.log("req.body"+req.body.username);
    let stu = await Student.findOne({where: {username: username}});
    if(stu) {

        const fromNews = await PersonalNewsAndNots.findAll({
            attributes: ['body', [
                sequelize.fn
                (
                  "DATE_FORMAT", 
                  sequelize.col("createdAt"), 
                  "%d-%m-%Y %H:%i:%s"
                ),
                "createdAt",
              ], 'from', 'to'],
            where: {
                from: username
         }});
         const toNews = await PersonalNewsAndNots.findAll({
            attributes: ['body', 'createdAt'],
            where: {
                to: username
            }
         })
         let returnList = [];
         fromNews.map((sent)=> {
            returnList.push([sent]);
         })
         toNews.map((sent)=> {
            returnList.push([sent]);
         })
         res.status(200).send(returnList);
    } else {
        res.status(200).send("please login to be able to see personal news and notifications");
    }

}

module.exports = {
    addPersonalNewsAndNots,
    getPersonalNewsAndNots
}
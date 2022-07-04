const db = require('../models')



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

    await Student.findOne({where: {username: info.username}}).then(async stu => {
        if (stu) {
           PersonalNewsAndNots.create(info);
        } else {
            res.status(200).send("please login to be able to send a note");
            }})
}

module.exports = {
    addPersonalNewsAndNots
}
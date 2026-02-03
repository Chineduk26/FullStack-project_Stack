const services = require('../services/chatServices');

const sendMessage = async (req, res) => {
    try {
        const data = await services.createMessage({
            role:"user",
            content:req.body.content,
            userId: req.user?.id || null


     }); 
     res.status(201).json(data);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }   
};
const getHistory = async (req, res) => {
    try{
 const data = await services.getMessages({userId: req.user?.id || null
});
 res.status(200).json(data);
    }catch(error){
        res.status(500).json({error:"Internal Server Error"});
    }
};
module.exports = {
    sendMessage,
    getHistory
};
// this is where http talks to services (logic)
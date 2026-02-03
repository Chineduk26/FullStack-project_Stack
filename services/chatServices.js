const Message =require('../models/chat');

exports.createMessage = async (role, content, userId) => {
    const message= await Message.create({ role, content,   
     UserId:userId}); 
     return {
        id: message.id,
        role:message.role,
        content:message.content,
        createdAt:message.createdAt

     }
};
exports.getMessages = async ({userId}) => {
    const messages= await Message.findAll({where:{UserId:userId},
    order:[["createdAt","ASC"]]
    });
    return messages.map((message)=>({
        Id:message.id,
        role:message.role,
        content:message.content,
        createdAt:message.createdAt    
    }));
}

// this what determines what happens in the app
// Service talk to model directly and knows no http we will add more services later
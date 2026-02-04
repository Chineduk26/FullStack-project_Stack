import { useEffect,useState } from "react";
import api from "../api/api";

export default function chat(){
    const [messages,setMessages]=useState([]);
    const [text,setText]=useState('');

    useEffect(()=>{
        api.get('/chat/history')
        .then(res => setMessages(res.data))
        .catch(err => console.log(err));
    },[]);
   const sendMessage = async () => {
  if (!text) return;
  try {
    const res = await api.post('/chat', {
      content: text   // ✅ must be "content"
    });
    // update messages state
    setMessages(prev => [...prev, res.data]);
    // clear input
    setText('');
    console.log(res.data); // optional: log response
  } catch (err) {
    console.error(err);
  }
};

    return(
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map(m=>(<div key= {m.id}>
                <b>{m.role} :</b>{m.content}
                
            </div>
                ))}
                
        </div>
        <input value={text} onChange={e=>setText(e.target.value)}placeholder="Types message..." /> 
        <button onClick={sendMessage}>Send</button>
        </div>
    )
}
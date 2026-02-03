import { useEffect,useState } from "react";
import api from "../api/api";

export default function chat(){
    const [messages,setMessages]=useState([]);
    const [text,setText]=useState('');

    useEffect(()=>{
        api.get('api/chat/history')
        .then(res => setMessages(res.data))
        .catch(err => console.log(err));
    },[]);
    const sendMessage= async()=>{
        if(!text)return;
        const res = await api.post('api/chat',{
            messages:text
        });
       setMessages(prev => [...prev,res.data]);
       setText('');
    }
    return(
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map(m=>(<div key= {m.id}>
                <b>{m.role} :</b>{m.message}
                
            </div>
                ))}
                
        </div>
        <input value={text} onChange={e=>setText(e.target.value)}placeholder="Types message..." /> 
        <button onClick={sendMessage}>Send</button>
        </div>
    )
}
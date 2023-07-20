import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { getDatabase, ref, push, set, onChildAdded } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function App()      {
 
  const googlelogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.

        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(result.user.displayName)
        console.log(token, user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  // Create a new post reference with an auto-generated id
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, setUser] = useState('');
  const [chats, setChats] = useState([])
  const [msg, setMessage] = useState('')
  const db = getDatabase();
  const chatListRef = ref(db, 'chats');
  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats(chats=>[...chats,data.val()])
      setTimeout(()=>{
        updateHeight()
      },100)
    });
  }, []);

  const sendMessage = () => {

    const chatRef = push(chatListRef);
    set(chatRef, {
      user, message: msg 
    });
    setMessage('');
  };
  return (

    <div>

      {user ? null  :(<div> <button onClick={e => { googlelogin() }}>Google SignIn</button>
      </div>)}
      

      <div className='body'>

        {    user? <><h1 className='title'>HI,  {user} </h1>
          <div id="chat" className='chat-container' >
            {chats.map((c, i) =>

          <div key={i} className={`container ${c.user === user ? 'me' : ''}`}>
                <div className='chatbox'>
                  <span className='sender'>{c.user}:</span>
                  <span className='content'>    {c.message}</span>
                </div>
          </div>
            )
            }
          </div>
          <div className='btm'>
            <input type='text' placeholder='enter your message' onChange={(e) => setMessage(e.target.value)} value={msg} />
            <button className='button' onClick={sendMessage}>Send</button>
          </div>
        </>:null
          }
      </div>

    </div>
          
  );
}

export default App;



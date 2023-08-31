import React, {useState} from 'react'
import { auth } from '../../config/firebaseConfig';
import { 
    createUserWithEmailAndPassword,
    updateProfile, 
    signInWithEmailAndPassword, 
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Auth.css'

function Auth() {

  const navigate = useNavigate();

  const [existingUser, setExistingUser] = useState(true)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("signup");

    createUserWithEmailAndPassword(auth, email, password).then((res) => {
        console.log(res)
        // Add username as displayName
        updateProfile(auth.currentUser, { displayName: name });
        navigate("/");
    }).catch((err) => console.log(err));
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Login
    signInWithEmailAndPassword(auth, email, password).then((res) => 
      navigate("/").catch((err) => console.log(err))
    );
  }

  return (
    <div className='auth-container'>
      {existingUser ? (
           <form className='auth-form' onClick={handleLogin}>
               <h1 className='form-title'>Login with your email</h1>
               <div className="form-group">
                 <input 
                   type="email" 
                   placeholder='Enter your email' 
                   required  
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                 />
                 <input 
                   type="password" 
                   placeholder='Enter your password' 
                   required     
                   onChange={(e) => setPassword(e.target.value)}
                   value={password}
                 />
               </div>
               <button type='submit'>Login</button>
               <p className='form-account-text'>
                 Don't have an account? <span className="form-link" onClick={() => setExistingUser(false)}>Sign up</span>
               </p>
           </form>
         ) : (
            <form className='auth-form' onSubmit={handleSignup}>
               <h1 className='form-title'>Sign up with your email</h1>
               <div className="form-group">
                 <input 
                   type="text" 
                   placeholder='Enter your name' 
                   required 
                   onChange={(e) => setName(e.target.value)}
                   value={name}
                />
                 <input 
                   type="email" 
                   placeholder='Enter your email' 
                   required 
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                 />
                 <input 
                   type="password" 
                   placeholder='Enter your password' 
                   required 
                   onChange={(e) => setPassword(e.target.value)}
                   value={password}
                 />
               </div>
               <button type='submit'>Sign up</button>
               <p className='form-account-text'>
                 Already have an account? <span className="form-link" onClick={() => setExistingUser(true)}>Login</span>
               </p>
           </form>
         )}
    </div>
  );
}

export default Auth
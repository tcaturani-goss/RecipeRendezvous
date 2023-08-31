import React, {useContext} from 'react'
import './Header.css'
import reciperendezvousLogo from '../../assets/recipe-rendezvous-logo.png';
import { Link } from 'react-router-dom';
import { auth } from '../../config/firebaseConfig';
import { useAuthState} from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

function Header() {

  // Get the user data
  const [user] = useAuthState(auth);
  console.log(user)


  return (
    <div>
      <div className='header-main-container'>
        <div className='header-logo-container'>
           <a href="/"><img className='recipe-rendezvous-logo' src={reciperendezvousLogo} alt="RecipeRendezvous Logo" /></a>
           <a href="/" className='header-logo-text-link'>RecipeRendezvous</a>
        </div>
        <div className='header-link-container'>
          {user ? ( <div>
            <span className='username'>
              {user.displayName? user.displayName : user.email}
            </span>
            <button className="auth-link" onClick={() => signOut(auth)}>Log out</button>
          </div>
         ) : ( 
          <Link className='auth-link' to={'/auth'}>Sign up</Link>
         )}
        </div>
      </div>
    </div>
  )
}

export default Header
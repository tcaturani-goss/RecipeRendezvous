import React, {useState, useEffect} from 'react'
import './Likes.css'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { auth, db } from '../../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

function Likes({recipeId}) {

  const [user] = useAuthState(auth);  

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    // Did this user like this recipe?
    const likesRef = collection(db, "likes");
    if(user) {
        // Make a query to see if liked
        const q = query(
            likesRef, 
            where("recipeId", "==", recipeId), 
            where("userId", "==", user?.uid)
        );

        // Looking for a matching document
        getDocs(q, likesRef)
        .then((res) => {
            if (res.size > 0) {
               setIsLiked(true);
            }
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    // Now we are trying to find out the like count for this recipe
    // Make a query to count likes
    const likesRef = collection(db, "likes")
    const q2 = query(likesRef, where("recipeId", "==", recipeId))
    // Look for matching documents
    getDocs(q2, likesRef)
    .then((res) => {
        setLikesCount(res.size)
    })
    .catch((err) => console.log(err));
  }, [isLiked]);

  const handleLike = e => {
    // Check if user is looged in
    if(user) {
        // Create a reference to the likes collection
        // For the very first time it'll create the collection
        const likesRef = collection(db, "likes");
          // Adding a document with this recipeId and userId
          addDoc(likesRef, {
            userId: user?.uid,
            recipeId: recipeId
          })
          .then((res) => setIsLiked(true))
          .catch((err) => console.log(err));
    }
  }

  const handleUnlike = e => {
    // Make sure the user is logged in
    if(user) {
        // Need to find document with this recipeId and userId
        // To get it's document id
        const likesRef = collection(db, "likes");

        // Set up a query to find id for the record to delete
        const q = query(
            likesRef, 
            where("recipeId", "==", recipeId), 
            where("userId", "==", user?.uid)
        );

        // Get match
        getDocs(q, likesRef).then(res => {
            const likedId = res.docs[0].id;

            
            // Now delete this doc from likes collection
            deleteDoc(doc(db, "likes", likedId))
              .then((res) => setIsLiked(false))
              .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
     }
  };

  return (
    <div className='likes-container'>
        {isLiked ? (
           <FaHeart onClick={handleUnlike}/>
        ) : (
           <FaRegHeart onClick={handleLike}/>
        )}
        {likesCount}
    </div>
  )
}

export default Likes
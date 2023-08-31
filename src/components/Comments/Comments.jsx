import React, {useState, useEffect} from 'react'
import './Comments.css'
import { auth, db } from '../../config/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

function Comments({recipeId}) {

  const [user] = useAuthState(auth);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  // Show all comments when page loads
  useEffect(() => {
    const commentsRef = collection(db, "comments");
    //  Get the comments
    // getDocs(commentsRef).then(res => {
    //     // Convert to array
    //     const comments = res.docs.map((item) => ({
    //         ...item.data(),
    //         id: item?.id,
    //     }));
    //     setComments(comments);
    // });

    // filter to show only comments for this recipe
    const q = query(commentsRef, where("recipeId", "==", recipeId));

    onSnapshot(q, (snapshot) => {
        // Convert to array
        const comments = snapshot.docs.map((item) => ({
            ...item.data(),
            id: item?.id,
        }));
        setComments(comments);
    });
  }, []);

  const addNewComment = (e) => {
    e.preventDefault();
    // We need to make a new document in comments collection
    // The document need to save the newComment, the articleId, and the user who created it
    // Create a reference to the comments collection 
    // Will create the collection if does exist 
    const commentsRef = collection(db, "comments");
    // Add a document with this articleId, and userId
    addDoc(commentsRef, {
        userId: user?.uid,
        recipeId: recipeId,
        content: newComment,
        username: user?.displayName,
    }).then(res => {
        toast("Comment added!", {
            type: "success",
            autoClose: 1500,
          });
          setNewComment("");
    });
  };

  const deleteComment = id => {
    // We need the id of the comment to delete it so we are passing it as function parameter
    // Get the particular document with this id
    deleteDoc(doc(db, "comments", id)).then((res) => {
        toast("Comment deleted successfully!", {
            type: "success",
            autoClose: 1500,
          });
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className='comments-text'>
        <div className="comments-container">
            {comments.map((item) => (
               <div className='comment' key={item?.id}>
                 <p>
                    <span>{item?.username}</span>
                    {item?.content}
                 </p>
                 {user?.uid === item?.userId && (
                   <button onClick={() => deleteComment(item?.id)}>Delete</button>)}
               </div>
               ))}
        </div>
        {user ? (
            <form onSubmit={addNewComment}>
                <input
                  className='comment-input-box' 
                  type="text" 
                  placeholder='Add comment' 
                  onChange={e => setNewComment(e.target.value)}
                  value={newComment}
                />
            </form> 
          ) : (
            <p>Please login to comment</p>
        )}
    </div>
  )
}

export default Comments
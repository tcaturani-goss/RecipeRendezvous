import React, {useState} from 'react'
import './AddRecipe.css'
import { auth, db, storage } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 } from "uuid";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
    const [user] = useAuthState(auth);

    const navigate = useNavigate();
  
    const categories = ["Chicken", "Beef", "Soup", "Salad", "Vegetables"]
  
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "",
      image: "",
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
  
      //create a reference for the image
      const imageRef = ref(storage, `images/${formData.image.name + v4()}`);
  
      // now upload the image to the bucket
      uploadBytes(imageRef, formData.image)
        .then((res) => {
          // now get url from this ref
          getDownloadURL(res.ref).then((url) => {
            // now we have all the data and the url
            // create article reference
            const articleRef = collection(db, "recipes");
  
            // use addDoc to add the article to the collection
  
            //   addDoc(articleRef, {
            //     ...formData,
            //     imageURL: url,
            //     createdBy: user.displayName,
            //     userId: user.uid,
            //     createdAt: Timestamp.now().toDate(),
            //   });
            addDoc(articleRef, {
              title: formData.title,
              description: formData.description,
              category: formData.category,
              imageURL: url,
              createdBy: user.displayName,
              userId: user.uid,
            });
          });
        })
        .then((res) => {
          toast("Article added successfully!", {
            type: "success",
            autoClose: 1500,
          });
  
          // pause before redirecting the user to home page
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    };

  return (
    <div className="add-article-container">
      <form className="add-article-form" onSubmit={handleSubmit}>
        <h2 className='form-title-text'>Create Recipe</h2>
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Maximum 100 characters"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Maximum 120 characters"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select</option>
            {categories.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label>Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AddRecipe
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {  
  updateUserStart,
  updateUserSuccess,
  updateUserFailure, } 
  from "../redux/user/userSlice";


export default function Profile() {
  const dispatch = useDispatch();
  // file picker ref
  const filePickerRef = useRef(null);
  // profile image
  const [image, setImage] = useState(undefined);

  // image upload duration time
  const [imagePercent, setImagePercent] = useState(0);
  // for image error
  const [imageError, setImageError] = useState(false);
  // saving the image url in form data
  const [formData, setFormData] = useState({
  });  
  const [updateSuccess, setUpdateSuccess] = useState(false);


  // get current user
  const { currentUser, loading, error } = useSelector((state) => state.user);
  // Uploading image to firebase
  useEffect(() => {
    if (image){
      handleImageUpload(image)
    }
  },[image] )
  // function to handle image upload
  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (
          snapshot.bytesTransferred/snapshot.totalBytes ) * 100;
        setImagePercent(Math.round(progress))
      },
        (error) =>{
        setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({...formData, profilePicture: downloadURL }))
        }
          );
      };

      const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          dispatch(updateUserStart());
          const res = await fetch(`Backend/user/update/${currentUser._id}` ,{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success === false ) {
            dispatch(updateUserFailure(data));
            return 
          }
          dispatch(updateUserSuccess(data));
          setUpdateSuccess(true);
        } catch (error) {
          dispatch(updateUserFailure(error));
        }
      };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="file" id="" ref={filePickerRef} hidden accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          className="rounded-full h-36 w-36 self-center cursor-pointer object-cover"
          alt="profilePicture"
          onClick={() => filePickerRef.current.click()}
        />
        <p className=" text-sm self-center">
          {imageError ? (
            <span className="text-red-600">Error Uploding Image </span>) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="">
                {`Uploading.  ${imagePercent} %`}
              </span> ) : imagePercent === 100 ? (
                <span className="text-green-600"> Image Uploaded successfully</span>) : ''}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
          onChange={handleChange}
        />

        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
          onChange={handleChange}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'loading...' : 'Update'}
        </button>
      </form>
      <div className="p-1 flex justify-between">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Log Out</span>
      </div>
      <p className="text-red-500 mt-5">{error && 'something went wrong!'}</p>
      <p className="text-green-600 mt-5">{updateSuccess && 'User is updated successfully'}</p>
    </div>
  );
}

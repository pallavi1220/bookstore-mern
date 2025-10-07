import { Outlet } from "react-router-dom"
import Sidebar from "../components/Profile/Sidebar"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import API from "../axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

function Profile() {
  //const isLoggedIn = useSelector();
   const [Profile, setProfile] = useState();
   const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
   }
  useEffect(()=> {
    const fetch = async ()=> {
      const response = await API.get("/get-user-information",{headers});
     
      setProfile(response.data.data);
      

    };
    fetch();
  }, []);
  

  return (
   <div className=" bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row w-full h-auto py-8  gap-4 text-white">
   {!Profile && (
    <div className="w-full h-[100%] flex items-center justify-center">
    <Loader/></div>
  )}
   {Profile && (
    <>
    
    <div className=" w-full md:w-1/6  ">
    
    <Sidebar data={Profile} />
    
    
    </div>
    <div className=""><MobileNav /></div>


    <div className="w-full md:w-5/6 ">
   
    <Outlet className=""/>
    
    </div>
    </>
    )}
    
   </div>
  )
}

export default Profile
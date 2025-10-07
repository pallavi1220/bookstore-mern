import { useState } from "react";
import axios from "axios";
import API from "../axios";
function AddBook() {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await API.post(
          "/add-book",
          Data,
          { headers }
        );

        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
        alert(error.response.data.message);
    }
  };

  return (
   


      <div className="h-[100%] p-0 md:p-4">
    <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Add Book</h1>
    <div className="p-4 bg-zinc-800 rounded ">
        <div className="">
            <label htmlFor="" className="text-zinc-400">Image</label>
            <input type="text" name="url" 
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
            placeholder="url of image"
            required
            value={Data.url}
            onChange={change}/>
        </div>
         <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">Title of book</label>
            <input type="text" name="title" 
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
            placeholder="title of book"
            required
            value={Data.title}
            onChange={change}/>
        </div>
         <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">Author of book</label>
            <input type="text" name="author" 
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
            placeholder="author of book"
            required
            value={Data.author}
            onChange={change}/>
        </div>
         <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">Language</label>
            <input type="text" name="language" 
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
            placeholder="language of book"
            required
            value={Data.language}
            onChange={change}/>
            </div>
            <div className="w-3/6">
              <label htmlFor="" className="text-zinc-400">Price</label>
            <input type="number" name="price" 
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
            placeholder="price of book"
            required
            value={Data.price}
            onChange={change}/>
            </div>
        </div>
         <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">Description of book</label>
            <textarea   name="desc" 
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none" 
            rows={5}
            placeholder="description of book"
            required
            value={Data.desc}
            onChange={change}/>
        </div>
        <button className="mt-4  px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600
        transition-all duration-300"  
        onClick={submit}>Add Book</button>
       

    </div>
  </div>
    
  )
}

export default AddBook;

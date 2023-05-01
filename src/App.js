import React, { useState, } from "react"
import './App.css';
import axios from "axios";

const API_KEY =  process.env.OPENAI_API_KEY
const API_URL = "https://api.openai.com/v1/images/generations";

// const prompt = "A colorful bird with a long tail";
const model = "image-alpha-001";

function App() {

  const [data, setData] = useState()
  const [value, setValue] = useState()

 const handleClick = () => {
      axios.post(API_URL, {
    model,
    prompt : value ,
    n: 1,
    size: "512x512",
    response_format: "url"
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    }
  })
    .then(response => {
      const imageUrl = response.data.data[0].url;
      console.log(imageUrl); 
      setData(imageUrl)
    })
    .catch(error => console.error(error));
 }
 

  return (
    <>
       <div className="App">
         <input placeholder="Add Prompt" value={value} onChange={(e) => setValue(e.target.value)} />
         <button onClick={() => handleClick()}>Click</button>
    </div>
    <div>
      <img scr={data} alt="some error" height={512} width={512}/>
    </div>
    </>
  );
}

export default App;

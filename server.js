const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const callsHistory = []; 

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post('/api/user',(req,res) =>{
const { firstName,lastName} = req.body;
const time = new Date()

  if (!firstName|| !lastName) {
    callsHistory.push({success : false,time})
    return res.json({ ok: false, error: "All fields are required!" });
  }
  
  callsHistory.push({ success: true, time, name: `${firstName} ${lastName}` });
    res.json({ok: true, message:`hi : ${firstName} ${lastName}`});

});



app.get("/api/history", (req, res) => {
  res.json(callsHistory);
});

app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}/`)
}); 
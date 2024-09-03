const express = require("express");
const rootRouter = require("./routes/index");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use("/api/v1", rootRouter);


const PORT = 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
});





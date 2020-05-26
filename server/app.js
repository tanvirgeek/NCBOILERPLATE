const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser);
app.use(express.json());

app.get('/', (req, res) => {
    res.json("hello World");
})

const startApp = async () => {
    try {
        await mongoose.connect('mongodb+srv://tanvirgeek:tanvirscc124867@cluster0-dcytp.mongodb.net/test?retryWrites=true&w=majority',
        { useUnifiedTopology: true,useNewUrlParser: true });
        console.log(`successfully connected to database`);
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            console.log(`server runnin at ${port}`);
        });
    } catch (error) {
        console.log(error.message)
    }
}

startApp();



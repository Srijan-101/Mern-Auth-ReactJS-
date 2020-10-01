const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');

app.use(compression());
app.use(express.static(path.join(__dirname,'build')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});

const PORT = process.env.PORT || 8887;

app.listen(PORT,() => {
    console.log(`APP is running on port:${PORT}`);
});

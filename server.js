const app=require('./src/app.js');
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDB=require('./src/db/db.js');
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


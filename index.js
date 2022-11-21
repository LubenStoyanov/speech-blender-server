import express from 'express'

const PORT = process.env.PORT || 8080;
const app = express();



app.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT} (http://localhost:${PORT})`)
});
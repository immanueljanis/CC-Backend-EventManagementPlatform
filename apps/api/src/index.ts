// import App from './app';

// const main = () => {
//   // init db here

//   const app = new App();
//   app.start();
// };

// main();

import express, { Express, NextFunction, Request, Response, urlencoded } from "express"
import cors from "cors"
import router from "./routers/Index";

import { PORT } from './config';
const app: Express = express()

app.use(urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(router)

app.get("/", (req: Request, res: Response) => {
    res.send("Test root api")
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({
        error: true,
        message: err,
        data: null
    })
})

app.listen(PORT, () => {
    console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
})
import express, { Application, Request, Response} from "express";
import cors from "cors";
import { Configuration, OpenAIApi} from "openai";
import * as dotenv from "dotenv";
dotenv.config();
const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY: string = process.env.API_KEY as string;

const configuration = new Configuration({
    apiKey: API_KEY
})

const openai = new OpenAIApi(configuration);

app.post("/completions", async ( req: Request, res: Response) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content : req.body.message
                }
            ]
        })
        res.send(completion.data.choices[0].message);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

app.post("/images", async(req: Request, res: Response) => {
    try {
        const imageRes = await openai.createImage({
            prompt: req.body.message,
            n: 1,
            size: "1024x1024",
        });
        console.log(imageRes);
        res.send(imageRes.data.data);
    }
    catch(error) {
        console.error(error);
        res.status(500).send("Server error");
    }
})


app.listen(PORT, () => console.log(`Your server is running on PORT ${PORT}`));
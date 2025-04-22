import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        if (req.body.title === '') {
            return res.status(500).json('제목 안 씀')
        }
        let data = {
            title : req.body.title,
            content: req.body.content
        }
        try {
            const db = (await connectDB).db("forum")
            let result = await db.collection('post').updateOne({_id : new ObjectId(req.body._id)}, {$set : data})
            return res.status(200).redirect('/list')
        } catch (error) {
            return res.status(500).json('DB 에러')
        }
    }
}

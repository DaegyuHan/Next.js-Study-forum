import {connectDB} from "@/util/database";
import {ObjectId} from "mongodb";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res){
    if (req.method === 'DELETE') {
        let session = await getServerSession(req, res, authOptions)
        const db = (await connectDB).db("forum")
        let result = await db.collection('post').findOne({ _id : new ObjectId(req.body)})
        console.log(result)
        res.status(200).json('삭제 성공')
        
        if (result.author === session.user.email) {
            let result = await db.collection('post').deleteOne({ _id : new ObjectId(req.body)})
            return res.status(200).json('삭제완료')
        } else {
            return res.status(500).json('작성자 불일치')
        }
    }
}

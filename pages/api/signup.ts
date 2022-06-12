import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const [email, firstname, lastname, password, birthday] = req.body;
    
    if (req.method === "POST") {
        return res.end();
    }

    if (!email || !firstname || !lastname || !password || !birthday) {
        res.statusCode = 400;
        return res.send("'필수 데이터가 없습니다.");
    }

    res.statusCode = 405;
    return res.end();
}
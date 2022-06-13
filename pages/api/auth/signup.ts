import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import { StoredUserType } from "../../../types/user";
import jwt from "jsonwebtoken";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    const {email, password, firstname, lastname, birthday} = req.body;
    const userExist = Data.user.exist({email});

    if(userExist) {
        res.statusCode =409;
        res.send("이미 가입된 이메일입니다.")
    }

    
    const hashedPassword = bcrypt.hashSync(password, 8);

    const users = Data.user.getList();
    

    let userId;

    if(users.length === 0) {
        userId = 1;
    } else {
        userId = users[users.length -1].id + 1;
    }

    const newUser: StoredUserType = {
        id: userId,
        email,
        firstname,
        lastname,
        password: hashedPassword,
        birthday,
        profileImage: "/static/image/user/default_user_profile_image.jpg",
    }

    Data.user.write([...users, newUser])
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);
    
    const expiresDate = (new Date(Date.now() + 60 * 60 * 24 * 1000 * 3)).toUTCString();

    console.log("Set-Cookie",
    `access_token=${token};path=/;expires=${expiresDate};httponly`);


    res.setHeader(
        "Set-Cookie",
        `access_token=${token};path=/;expires=${expiresDate};httponly`
    )


    const newUserWithoutPassword: Partial<Pick<
        StoredUserType, 
        "password"
    >> = newUser;

    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    return res.send(newUser);
    

}

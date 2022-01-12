import cookie from "cookie";
import User from "../../../models/User";

const handler = async(req, res) => {


  if(req.url==="/api/user/signup")
  {
    console.log(req.body);
    try {
      const user = await User.create(req.body); 
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token-user", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Succesfull registration");

    } catch (error) {
       res.status(400).json("Wrong Credentials!");
    }
  }
};

export default handler;

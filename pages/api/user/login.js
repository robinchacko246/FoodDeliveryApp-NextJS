import cookie from "cookie";
import User from "../../../models/User";

const handler = async(req, res) => {


  if(req.url==="/api/user/login")
  {
   
    const { username, password } = req.body;
    
    try {
      const user = await User.findOne({username:username});
      console.log("user");
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token-user", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      user.token=process.env.TOKEN;
      //console.log(user[0]);
      res.status(200).json(user);

    } catch (error) {
       res.status(400).json("Wrong Credentials1!");
    }
  }
};

export default handler;

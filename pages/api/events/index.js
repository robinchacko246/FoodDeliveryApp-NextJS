import dbConnect from "../../../util/mongo";
import Event from "../../../models/Event";

export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const products = await Event.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    if(!token || token !== process.env.TOKEN){
      console.log(token);
      console.log(process.env.token);
      return res.status(401).json("Not authenticated!")
    }
    try {
      console.log("inide");
      const product = await Event.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


/**
 * Attempts to send email to owner
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
  ) {
    console.log(req.body)
    await axios.post("http://0.0.0.0:8081/contact",req.body)
    res.send({"status":"success"})
  }
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { scrape } from "@/utils/puppeteer/scrapper";

import { scrape } from "@/utils/cheerio/scrapper";

type RequestBody = {
  urls: string[];
};

interface Request extends NextApiRequest {
  body: RequestBody;
}

type Payload = {
  extractions: any;
};

type ErrorResponse = {
  status: number;
  message: string;
};

type Response = Payload | ErrorResponse;

const handler = async (req: Request, res: NextApiResponse<Response>) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .send({
        status: 405,
        message: "Only POST requests allowed",
      } as ErrorResponse);
    return;
  }

  const { urls } = req.body;
  const extractions = await scrape(urls);
  res.status(200).json({ extractions });
};

export default handler;

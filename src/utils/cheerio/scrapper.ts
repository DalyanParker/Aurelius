import * as cheerio from "cheerio";
import fetch from "node-fetch";

type CheerioScrapeRequest = {
  urls: string[];
};

type ExtractedHTML = {
  url: string;
  timestamp: Date;
  html: string;
};

export const scrape = async (urls: string[]) => {
  const currentDate = new Date().getTime();

  const requests = urls.map(async (url) => {
    const response = await fetch(url);
    const html = await response.text();
    const extractedHTML: ExtractedHTML = {
      url,
      timestamp: currentDate,
      html,
    };
    return extractedHTML;
  });

  return await Promise.all(requests);
};

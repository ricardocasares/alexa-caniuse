import { json } from "micro";
import { handler } from "./skill";
import { RequestEnvelope } from "ask-sdk-model";

export default async req => {
  const event = (await json(req)) as RequestEnvelope;

  return new Promise((resolve, reject) =>
    handler(event, null, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    })
  );
};

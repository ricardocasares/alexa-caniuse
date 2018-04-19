import { json } from "micro";
import { handler } from "./skill";

export default async req => handler(await json(req));

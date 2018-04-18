const micro = require("micro");
const { handler } = require("./skill");

const server = micro(async (req, res) => {
  const event = await micro.json(req);
  return new Promise((resolve, reject) => {
    handler(event, null, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
});

server.listen(3000);

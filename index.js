const micro = require("micro");
const { handler } = require("./skill");

module.exports = req =>
  micro.json(req).then(
    event =>
      new Promise((resolve, reject) => {
        handler(event, null, (err, data) => {
          if (err) return reject(err);
          resolve(data);
        });
      })
  );

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html><head><title>Assignment</title></head>");
    res.write(
      "<body><h1>Welcome to the assignment of node js</h1><form action='/create-user' method='POST'> <input name='user' type='text' > <button type='submit'>Create</button></input></form></body>"
    );
    res.write("</html>");
    res.end();
  }
  if (url === "/users") {
    res.write("<html><head><title>Assignment's Users</title></head>");
    res.write(
      "<body><ul><li>Sherif Hamam</li><li>Ahmed</li><li>Ebrahim</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
  res.write("<html><head><title>404</title></head>");
  res.write("<body><h1>Page Not Found</h1></body>");
  res.write("</html>");
  res.end();
};
module.exports = requestHandler;

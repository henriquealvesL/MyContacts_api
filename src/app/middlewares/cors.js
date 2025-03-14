module.exports = (request, response, next) => {
  const allowedOrigins = [
    "https://mycontacts-frontend.onrender.com",
    "http://localhost:3000",
  ];
  const origin = request.headers.origin;

  if (allowedOrigins.includes(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE"
    );
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.setHeader("Access-Control-Max-Age", "600");
  }
  next();
};

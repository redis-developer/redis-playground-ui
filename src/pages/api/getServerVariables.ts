import { NextApiRequest, NextApiResponse } from "next";

const HTTP_STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      //const data = req.body;
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers["host"]?.split(":")[0] || "localhost";
      const PORT_BACKEND = process.env.PORT_BACKEND || 3001;

      let PLAYGROUND_END_POINT = process.env.PLAYGROUND_END_POINT;
      if (!PLAYGROUND_END_POINT) {
        PLAYGROUND_END_POINT = `${protocol}://${host}:${PORT_BACKEND}`;
      }
      const PLAYGROUND_FROM_DOCKER =
        process.env.PLAYGROUND_FROM_DOCKER || "N";

      const retData = {
        PLAYGROUND_END_POINT: PLAYGROUND_END_POINT,
        PLAYGROUND_ENCRYPTION_KEY: process.env.PLAYGROUND_ENCRYPTION_KEY,
        PLAYGROUND_FROM_DOCKER: PLAYGROUND_FROM_DOCKER,
      };
      res.status(HTTP_STATUS_CODES.OK).json(retData);
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res
        .status(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED)
        .end(`Method ${method} Not Allowed`);
  }
}

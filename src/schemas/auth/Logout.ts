const LogoutSchema = {
  tags: ["Auth"],
  summary: "logout account with token",
  description: "logout account with token.",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: "Logout successfully",
      properties: {
        status: {
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
            service: { type: "string" },
            description: { type: "string" },
          },
        },
        data: { type: "boolean" },
      },
    },
    401: {
      description: "Unauthorized",
      properties: {
        status: {
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
            service: { type: "string" },
            description: { type: "string" },
            error: { type: "string" },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      properties: {
        status: {
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
            service: { type: "string" },
            description: { type: "string" },
            error: { type: "string" },
          },
        },
      },
    },
  },
};

export default LogoutSchema;

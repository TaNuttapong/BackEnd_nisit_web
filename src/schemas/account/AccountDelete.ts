const deleteAccountSchema = {
  tags: ["Account"],
  summary: "delete account with id",
  description: "delete user account with id .",
  security: [{ bearerAuth: [] }],
  params: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "account id",
      },
    },
  },
  response: {
    200: {
      description: "Account delete successfully",
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

export default deleteAccountSchema;

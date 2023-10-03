const updateAccountSchema = {
  tags: ["Account"],
  summary: "update account with id",
  description: "update user account with id .",
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
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      role: { type: "string" },
      name: { type: "string" },
      branch: { type: "string" },
    },
    examples: [
      {
        email: "example@email.com",
        role: "ADMIN",
        name: "Tar",
        branch: "ComSCI",
      },
    ],
    required: ["email", "role", "name", "branch"],
  },
  response: {
    200: {
      description: "Account update successfully",
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
        data: {
          type: "string",
          format: "date-time",
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

export default updateAccountSchema;

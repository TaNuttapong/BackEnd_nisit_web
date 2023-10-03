const createAccountSchema = {
  tags: ["Account"],
  summary: "Create a new account",
  description: "Create a new user account.",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
      name: { type: "string" },
      branch: { type: "string" },
    },
    examples: [
      {
        email: "example@email.com",
        password: "password123",
        name: "Tar",
        branch: "ComSCI",
      },
    ],
    required: ["email", "password", "name", "branch"],
  },
  response: {
    201: {
      description: "Account created successfully",
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
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            email: { type: "string" },
            branch: { type: "string" },
            role: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    403: {
      description: "Failed to create account",
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

export default createAccountSchema;

const LoginSchema = {
  tags: ["Auth"],
  summary: "login account with email&&password",
  description: "login account with email&&password.",
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
    examples: [
      {
        email: "example@email.com",
        password: "password123",
      },
    ],
    required: ["email", "password"],
  },
  response: {
    200: {
      description: "Login successfully",
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
          access_token: { type: "string" },
          exp: { type: "number" },
          role: { type: "string" },
        },
      },
    },
    400: {
      description: "Login fail",
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

export default LoginSchema;

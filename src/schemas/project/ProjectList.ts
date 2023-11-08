const listProjectSchema = {
  tags: ["Project"],
  summary: "list Project",
  description: "list Project.",
  security: [{ bearerAuth: [] }],
  response: {
    200: {
      description: "Project list successfully",
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
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              project_name: { type: "string" },
              description: { type: "string" },
              image: { type: "string" },
              start_date: { type: "string" },
              end_date: { type: "string" },
              account_id: { type: "string" },
              link: { type: "string" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
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

export default listProjectSchema;

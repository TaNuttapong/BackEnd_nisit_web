const addNiSitSchema = {
  tags: ["NiSit"],
  summary: "Add a new NiSit with Excel",
  description: "Add a new NiSit with Excel.",
  consumes: ["multipart/form-data"],
  security: [{ bearerAuth: [] }],
  requestBody: {
    content: {
      "multipart/form-data": {
        schema: {
          type: "object",
          properties: {
            file: { type: "string", format: "binary" },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Add NiSit successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
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
              data: "boolean",
            },
          },
        },
      },
    },
    403: {
      description: "Failed to add NiSit",
      content: {
        "application/json": {
          schema: {
            type: "object",
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
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
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
      },
    },
  },
};

export default addNiSitSchema;

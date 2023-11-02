const addNiSitSchema = {
  tags: ["NiSit"],
  summary: "Add a new NiSit",
  description: "Add a new NiSit.",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      classStudent: { type: "string" },
      student_id: { type: "string" },
    },
    examples: [
      {
        name: "test test",
        classStudent: "comsci",
        student_id: "6330250111",
      },
    ],
    required: ["name", "classStudent", "student_id"],
  },
  response: {
    201: {
      description: "NiSit created successfully",
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
      description: "Failed to create NiSit",
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

export default addNiSitSchema;

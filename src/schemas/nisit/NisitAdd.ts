const addNiSitSchema = {
  tags: ["NiSit"],
  summary: "Add a new NiSit",
  description: "Add a new NiSit.",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    properties: {
      student_id: { type: "string" },
      name: { type: "string" },
      class: { type: "string" },
    },
    examples: [
      {
        student_id: "6330250121",
        name: "test testname",
        class: "wasd",
      },
    ],
    required: ["student_id", "name", "class"],
  },
  response: {
    201: {
      description: "Add NiSit successfully",
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
            project_name: { type: "string" },
            description: { type: "string" },
            link: { type: "string" },
            image: { type: "string" },
            start_date: { type: "string", format: "date-time" },
            end_date: { type: "string", format: "date-time" },
            account_id: { type: "number" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
    403: {
      description: "Failed to add Project",
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

const addProjectSchema = {
  tags: ["Project"],
  summary: "Add a new Project",
  description: "Add a new project.",
  security: [{ bearerAuth: [] }],
  body: {
    type: "object",
    properties: {
      project_name: { type: "string" },
      description: { type: "string" },
      link: { type: "string" },
      image: { type: "string" },
      start_date: { type: "string", format: "date" },
      end_date: { type: "string", format: "date" },
      account_id: { type: "number" },
    },
    examples: [
      {
        project_name: "testName",
        description: "test1231",
        link: "www.google.com",
        image: "src/assets/projects/test.png",
        start_date: "2022-10-10",
        end_date: "2022-10-20",
        account_id: 1,
      },
    ],
    required: [
      "project_name",
      "description",
      "link",
      "image",
      "start_date",
      "end_date",
      "account_id",
    ],
  },
  response: {
    201: {
      description: "Add Project successfully",
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

export default addProjectSchema;

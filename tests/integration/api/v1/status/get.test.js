import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      //     const responseBody = await response.json();

      //  const parsedUpdatedAt = new Date(responseBody.updatedAt).toISOString();
      //  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      //    expect(responseBody.dependencies.database.version).toEqual("16.0");
      //    expect(responseBody.database.max_connections).toEqual(100);
      //    expect(responseBody.database.opened_connections).toEqual(1);
    });
  });
});

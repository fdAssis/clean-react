import { faker } from "@faker-js/faker";
import { HttpPostClientParams } from "../protocols/http";

export const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: { name: faker.internet.userName(), email: faker.internet.email(), }
});
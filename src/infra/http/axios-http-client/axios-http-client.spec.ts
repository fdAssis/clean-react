import { HttpPostClientParams } from "@/data/protocols/http";
import { faker } from "@faker-js/faker"
import axios from "axios";
import { AxiosHttClient } from "./axios-http-client";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttClient => {
  return new AxiosHttClient();
}

const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: { name: faker.internet.userName(), email: faker.internet.email(), }
});

describe('AxiosHttClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
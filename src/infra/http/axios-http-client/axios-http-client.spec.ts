import { HttpPostClientParams } from "@/data/protocols/http";
import { AxiosHttClient } from "./axios-http-client";

import { faker } from "@faker-js/faker"
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
  data: { name: faker.internet.userName(), email: faker.internet.email(), },
  status: faker.random.numeric()
}

mockedAxios.post.mockResolvedValue(mockedAxiosResult);

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

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut();
    const httpResponse = await sut.post(mockPostRequest());

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  });
});
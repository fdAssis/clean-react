import { faker } from "@faker-js/faker"
import axios from "axios";
import { AxiosHttClient } from "./axios-http-client";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttClient => {
  return new AxiosHttClient();
}

describe('AxiosHttClient', () => {
  test('Should call axios with correct Url and verb', async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url });

    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  })
})
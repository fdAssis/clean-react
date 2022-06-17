import { faker } from "@faker-js/faker"
import axios from "axios";
import { AxiosHttClient } from "./axios-http-client";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosHttClient', () => {
  test('Should call axios with correct Url', async () => {
    const url = faker.internet.url();
    const sut = new AxiosHttClient();
    await sut.post({ url });

    expect(mockedAxios).toHaveBeenCalledWith(url);
  })
})
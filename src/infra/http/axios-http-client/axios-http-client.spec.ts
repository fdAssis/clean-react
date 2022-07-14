import { AxiosHttClient } from "./axios-http-client";

import { mockPostRequest } from '@/data/test/';
import axios from "axios";
import { mockAxios } from "../test";

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttClient,
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios,
  }
}

describe('AxiosHttClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.post(request);

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());

    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  });
});
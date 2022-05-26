import { HttpPostClientSpy } from "@/data/test/http-client-spy.mock";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { authenticationMock } from "@/domain/test/authentication.mock";

import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  //sut = sistem under test
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  }
}

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(authenticationMock());
    expect(httpPostClientSpy.url).toBe(url);
  });
})

describe("RemoteAuthentication", () => {
  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const mockAuthentication = authenticationMock();
    await sut.auth(mockAuthentication);
    expect(httpPostClientSpy.body).toEqual(mockAuthentication);
  });
})
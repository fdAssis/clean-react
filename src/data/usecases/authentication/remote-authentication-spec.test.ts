import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { HttpPostClientSpy } from "@/data/test/http-client-spy.mock";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { InvalidCredentialsError } from "@/domain/error/invalid-credentials-error";
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

  test("Should call HttpPostClient with correct body", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const mockAuthentication = authenticationMock();
    await sut.auth(mockAuthentication);
    expect(httpPostClientSpy.body).toEqual(mockAuthentication);
  });

  test("Should throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    }
    const promise = sut.auth(authenticationMock());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

});
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnexpectError } from "@/domain/error";
import { AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { accountModelMock, authenticationMock } from "@/domain/test";
import { HttpPostClientSpy } from "@/data/test";

import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
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

  test("Should throw UnexpectError if HttpPostClient returns 400", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    }
    const promise = sut.auth(authenticationMock());
    await expect(promise).rejects.toThrow(new UnexpectError());
  });

  test("Should throw UnexpectError if HttpPostClient returns 404", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    }
    const promise = sut.auth(authenticationMock());
    await expect(promise).rejects.toThrow(new UnexpectError());
  });

  test("Should throw UnexpectError if HttpPostClient returns 500", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.internalServerError,
    }
    const promise = sut.auth(authenticationMock());
    await expect(promise).rejects.toThrow(new UnexpectError());
  });

  test("Should return an AccountModel if HttpPostClient returns 200", async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const httpResult = accountModelMock();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    }
    const account = await sut.auth(authenticationMock());
    expect(account).toEqual(httpResult);
  });

});
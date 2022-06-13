import { faker } from "@faker-js/faker";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "../models/account-model";

export const authenticationMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})


export const accountModelMock = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
})
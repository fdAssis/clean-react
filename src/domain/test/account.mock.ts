import { AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "../models";

import { faker } from "@faker-js/faker";

export const authenticationMock = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})


export const accountModelMock = (): AccountModel => ({
  accessToken: faker.datatype.uuid(),
})
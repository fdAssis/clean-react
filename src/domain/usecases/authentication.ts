import { AccountModel } from "domain/models/account-model";

type AuthenticationParams = {
  name: string,
  email: string,
}

export interface Authentication {
  auth(params: AuthenticationParams) : Promise<AccountModel>;
}
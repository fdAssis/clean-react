import { HttpPostClient, HttpPostClientParams } from "@/data/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
  constructor(
    public url?: string,
    public body?: object,
  ) { };

  post(params: HttpPostClientParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve();
  }
}
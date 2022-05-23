import { HttpPostClient } from "data/protocols/http/http-post-client";

export class HttpPostClientSpy implements HttpPostClient {
  constructor(public url? : string){};

  post(url:string):Promise<void>{
    this.url = url;
    return Promise.resolve();
  }
}
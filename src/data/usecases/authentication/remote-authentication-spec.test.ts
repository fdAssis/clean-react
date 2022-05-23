import { HttpPostClient } from "data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

describe("RemoteAuthentication",() => {
  test("Should call HttpPostClient with correct URL", async () => {

    const url = 'any_url';

    class HttpPostClientSpy implements HttpPostClient {
      constructor(public url? : string){};

      post(url:string):Promise<void>{
        this.url = url;
        return Promise.resolve();
      }
    }

    const httpPostClientSpy = new HttpPostClientSpy();
    //sut = sistem under test
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
})
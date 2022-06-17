import { HttpPostClientParams } from "@/data/protocols/http";
import axios from "axios";


export class AxiosHttClient {
  async post(params: HttpPostClientParams<any>): Promise<void> {
    await axios(params.url);
  }
}
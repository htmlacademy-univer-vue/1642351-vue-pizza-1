import axios, { AxiosError } from "axios";

class ApiErr extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
  }
}

export class ApiService {
  _getError(e) {
    if (e instanceof AxiosError) {
      return new ApiErr(
        e.response.data?.error?.message ?? e.message,
        e.response
      );
    } else {
      return new ApiErr(e.message, e.response);
    }
  }

  _w(method, url) {
    return async () => {
      try {
        const response = await method(url);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  _wb(method, url, body) {
    return async () => {
      try {
        const response = await method(url, body);
        return {
          __state: "success",
          ...response,
        };
      } catch (e) {
        return {
          __state: "error",
          data: this._getError(e),
        };
      }
    };
  }

  $get(url) {
    return this._w(axios.get, url)();
  }

  $delete(url) {
    return this._w(axios.delete, url)();
  }

  $post(url, body) {
    return this._wb(axios.post, url, body)();
  }

  $put(url, body) {
    return this._wb(axios.put, url, body)();
  }
}

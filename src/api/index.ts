type Data = {
  method: string,
  headers: Headers,
  body?: any,
};

type Headers = {
  Accept: string,
  ContentType: string,
};

export const Api = {
  call(url: string, method: string, body: any = {}) {
    const data: Data = {
      method,
      headers: {
        Accept: "application/json",
        ContentType: "application/json",
      },
    };
    if (Object.keys(body).length > 0) {
      data.body = JSON.stringify(body);
    }
    return fetch(url, data).then((response) => {
      return response.json();
    });
  },

  get(url: string) {
    return this.call(url, "get");
  },

  post(url: string, body = {}) {
    return this.call(url, "post", body);
  },

  delete(url: string) {
    return this.call(url, "delete");
  },
};

import { errorHandler, messageHandler } from "../handlers/responseHandler.js";

export async function requestApi(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;
    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }
    const res = await fetch(url, {
      method,
      headers,
      body,
    });

    if (res.status === 200) {
      await messageHandler(res);
      return await res.json();
    } else {
      alert(`Check URL ${url}`);
    }
  } catch (e) {
    errorHandler(e);
  }
}

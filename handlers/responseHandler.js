export const messageHandler = async (res) => {
  const jsonMessage = await res.clone().json();
  if ("message" in jsonMessage) {
    console.log(jsonMessage.message); //responseHandler
  }
};
export const errorHandler = (err) => {
  if (err instanceof TypeError) {
    console.error(`${err.name}: ${err.message}`); //errorHandler
  }
};

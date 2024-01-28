export const messageHandler = async (res) => {
  const jsonMessage = await res.clone().json();
  if ("message" in jsonMessage) {
    UIkit.notification({
      message: jsonMessage.message,
      status: "primary",
      pos: "bottom-center",
      timeout: 5000,
    });

    console.log(jsonMessage.message); //responseHandler
  }
};
export const errorHandler = (err) => {
  if (err instanceof TypeError) {
    console.error(`${err.name}: ${err.message}`); //errorHandler
  }
};

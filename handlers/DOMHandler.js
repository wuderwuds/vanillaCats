import { deleteCat, getAllCats } from "../controllers/api.js";
import { render } from "../helpers/render.js";

const $button = document.querySelector("[data-nsr]");

export const deleteItemHandler = async (id) => {
  await deleteCat(id);
  render(await getAllCats());
};

export const changeItemHandler = async (e, id) => {
  await deleteCat(id);
  render(await getAllCats());
};

import { getAllCats, newCat } from "./controllers/api.js";
import { render } from "./helpers/render.js";
import { randomInteger } from "./helpers/randomInt.js";

(async () => {
  // await newCat({
  //   id: Date.now(),
  //   name: `Кот ${randomInteger(0, 100)}`,
  //   image: "https://pngimg.com/uploads/tattoo/tattoo_PNG5492.png",
  //   age: randomInteger(1, 13),
  //   rate: randomInteger(1, 5),
  //   favorite: false,
  //   description: "lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.",
  // });

  render(await getAllCats());
})();

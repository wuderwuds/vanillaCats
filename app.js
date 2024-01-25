import {getAllCats} from "./controllers/api.js";
import {render} from "./helpers/render.js";

(async () => {
    render(await getAllCats() )
})()  // get catsList



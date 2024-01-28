import { deleteItemHandler } from "../handlers/DOMHandler.js";
export const render = (data) => {
  const rootElement = document.querySelector("#app");
  if (document.querySelector("#app")) rootElement.innerHTML = "";
  if (data) {
    data.forEach(({ age, description, favorite, id, image, name, rate }) => {
      const cat = document.createElement("div");
      const deleteCat = document.createElement("button");

      cat.innerHTML = `
          <div>
              <div class="uk-card uk-card-default">
                      <div class="uk-card-header">
                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                              <div class="uk-width-auto">
                                  <img class="uk-border-circle" width="40" height="40" src="${image}" alt="${name}">
                              </div>
                              <div class="uk-width-expand">
                                  <h3 class="uk-card-title uk-margin-remove-bottom">${name}</h3>
                                  <p class="uk-text-meta uk-margin-remove-top">Возраст: ${age}</p>
                              </div>
                          </div>
                      </div>
                      <div class="uk-card-body">
                          <p>${description}</p>
                          <p>rate: ${rate} / 5</p>
                      </div>
                      <div class="uk-card-footer">
                  </div>
                
              </div>  
          </div>
        `;

      deleteCat.innerHTML = "Delete cat";
      deleteCat.classList.add("uk-button");
      deleteCat.classList.add("uk-button-text");
      deleteCat.onclick = () => {
        void deleteItemHandler(id);
      };

      cat.lastElementChild.lastElementChild.lastElementChild.appendChild(
        deleteCat,
      );
      rootElement.appendChild(cat);
    });
  }
};

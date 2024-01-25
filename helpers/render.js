export const render = (data) => {

    const catList = document.createElement('ul')
    data.forEach(catItem => {
        const cat = document.createElement('li')
        cat.innerHTML = `
        <img src="${catItem.image}" alt="${catItem.name}"/>
        <p>${catItem.id} | ${catItem.name} | ${catItem.favorite}</p>
        `
        catList.append(cat)
    })
    document.body.append(catList)
}
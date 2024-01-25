export async function requestApi(url, method='GET', data = null ){
    try {
        const headers = {}
        let body
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        console.log(url)
        return await (await fetch(url, {
            method,
            body
        })).json()
    } catch (e) {
        console.log('Ошибка', e.message)
    }

}
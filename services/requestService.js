
export async function requestApi(url, method='GET', data= null) {
    
        const headers = {};
        let body;
        if(data) {
            headers['Content-type']= 'application/json'
            body = JSON.stringify(data);
        }
        const res = await fetch(url, {
            method,
            headers,
            body
        })
        if(res.status !==200) {            
            return Promise.reject(res)
        } else 
            {return res} 
    }


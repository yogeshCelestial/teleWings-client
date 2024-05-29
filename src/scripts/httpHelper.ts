declare var axios: any;

export type ObjReq = {
    data: string | null;
    method: string;
    url: string
    authToken: string | null,
}

const httpHelper = (reqObj: ObjReq, successHandler: (a: any) => void, failureHandler: (b: any) => void) => {
    axios({
        method: reqObj.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': reqObj.authToken,
        },
        data: reqObj.method === 'POST' ? reqObj.data : null,
        baseURL: `http://localhost:8080/${reqObj.url}`,
    }).then((resp: any) => {
        console.log(resp)
        if (resp.status === 200 || resp.status === 201) {
            successHandler(resp.data);
        }
    }).catch((err: any) => {
        failureHandler(err);
    })
}

export const searchUsers = async (searchVal: string) => {
    const resp = await axios.get(`http://localhost:8080/users/?searchVal=${searchVal}`);
    return await resp.data;
}

export default httpHelper;
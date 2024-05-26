declare var axios: any;

export type ObjReq = {
    data: string;
    method: string;
    url: string
}

const httpHelper = (reqObj: ObjReq, successHandler: (a: any) => void, failureHandler: (b: any) => void) => {
    console.log(reqObj);
    axios({
        method: reqObj.method,
        headers: {
            'Content-Type': 'application/json',
        },
        data: reqObj.data,
        baseURL: `http://localhost:8080/${reqObj.url}`,
    }).then((resp: any) => {
        if (resp.status === 200 || resp.status === 201) {
            successHandler(resp.data);
        }
    }).catch((err: any) => {
        failureHandler(err);
    })
}

export default httpHelper;
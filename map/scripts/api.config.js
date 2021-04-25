module.exports = {
    httpRoute: '../service/http',
    envRoute: '../constants/env.json',
    services: [
        {
            name: 'BI',
            apiDoc: 'http://172.20.1.144:8101/v2/api-docs',
            ignorePaths:[
                "/demo/get",
                "/v1/excel",
                "/v1/dataset/add_by_file",
                "/v1/dataset/update_by_file",
            ]
        }
    ],

    ignoreType: ['Timestamp'],
    responseWarp: 'ApiResult',
    pageWarp: 'PageList'
};

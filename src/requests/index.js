import * as axios from 'axios';

const FileDownload = require('js-file-download');

const baseUrl = 'http://0.0.0.0:8003';

export const searchData = async (data, callback) => {
    const search_mode = data.search_mode;

    const url = search_mode === 'hash' || search_mode === 'dynamic_search'
        ? baseUrl + '/search/' + data.input_data
        : baseUrl + '/search/' + data.search_mode;

    console.log('data', data);

    if (search_mode === 'hash') {
        axios(url, {
            method: 'GET',
            headers: {
                dynamic_search: ''
            }
        })
            .then(resp => callback(resp.json()))
            .catch(err => callback(err))
    }

    else if (search_mode === 'date') {
        axios(url, {
            method: 'GET',
            headers: {
                dynamic_search: '',
                date: data.input_data
            }
        });
    }

    else if (search_mode === 'search_ip') {
        axios(url, {
            method: 'GET',
            headers: {
                dynamic_search: '',
                search_ip: ''
            }
        });
    }
    
    else if (search_mode === 'dynamic_search') {
        axios(url, {
            method: 'GET',
            headers: {
                'dynamic_search': 'True',
                'responseType': 'arraybuffer',
                'Content-Type': "application/octet-stream",
                'Content-Disposition': "attachment;filename=result.zip"
            }
        })
            .then(resp => {
                FileDownload(resp.data, 'result.zip');
            })
            .catch(err => callback(err));
    }
};
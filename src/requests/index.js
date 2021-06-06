import * as axios from 'axios';

const FileDownload = require('js-file-download');

const baseUrl = 'http://0.0.0.0:8003';

const stub_analysed_data = {
    'date': '28 April 2021',
    'imphash': '8eeaa9499666119d13b3f44ecd77a729',
    'name': 'calc.exe',
    'possible matches': '[<здесь вложенная структура внутри которой тоже возможны массивы>]',
    'probability': 0.999,
    'sha1': 'ed13af4a0a754b8daee4929134d2ff15ebe053cd',
    'source_ip': '10.5.40.18',
    'ssdeep': '384:Otj8FKzuRxmeWCJxhd2WS/YWyiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiLiiiB:QXif4CbPQ7',
    'type': 'benign'
};

export const searchData = async (data, callback) => {
    const search_mode = data.search_mode;

    const url = search_mode === 'hash' || search_mode === 'dynamic_search'
        ? baseUrl + '/search/' + data.input_data
        : baseUrl + '/search/' + data.search_mode;

    if (search_mode === 'hash') {
        axios(url, {
            method: 'GET',
            headers: {
                'dynamic_search': '',
                'search_ip': '',
                'date_date': ''
            }
        })
            .then(resp => callback(resp.data))
            .catch(err => callback(err))
    }

    else if (search_mode === 'date') {
        axios(url, {
            method: 'GET',
            headers: {
                'dynamic_search': '',
                'search_ip': '',
                'date_date': data.input_data
            }
        })
            .then(resp => callback(resp.data))
            .catch(err => callback(err));
    }

    else if (search_mode === 'search_ip') {
        axios(url, {
            method: 'GET',
            headers: {
                'dynamic_search': '',
                'search_ip': data.input_data,
                'date_date': ''
            }
        })
            .then(resp => callback(resp.data))
            .catch(err => callback(err));
    }

    // done
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
                callback('ФАЙЛ УСПЕШНО СКАЧАН');
            })
            .catch(err => callback(err));
    }
};


export const uploadFile = (mode, fileToUpload, callback) => {
    const url = `${baseUrl}/${fileToUpload.name}/${mode}`;
    
    callback();
};

export const analyzeFile = (mode, fileToAnalyze, callback) => {
    const url = `${baseUrl}/analysis/${mode}`;

    callback(stub_analysed_data);
};
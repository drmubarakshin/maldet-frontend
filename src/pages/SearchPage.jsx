import React from 'react';

import * as requests from '../requests';

import './Pages.scss';


class SearchPage extends React.Component {
    state = {
        input: '',
        fetchedData: undefined,
        search_mode: 'dynamic_search'
    };

    onSearchInputChange = (e) => this.setState({ input: e.target.value });
    onModeChange        = (e) => this.setState({ search_mode: e.target.value });

    onSearchButtonClick = async (e) => {
        e.preventDefault();

        const collectedData = {
            search_mode: this.state.search_mode,
            input_data: this.state.input
        };

        const setDataCallback = (response) => {
            this.setState({ fetchedData: response });
        };

        await requests.searchData(collectedData, setDataCallback);
    };

    render() {
        return (
            <div className="search">
                <div className="search__radio">
                    <div className="radio">
                        <input
                            type="radio"
                            value='dynamic_search'
                            onChange={this.onModeChange}
                            checked={this.state.search_mode === 'dynamic_search'}
                        />
                        <span>Динамический поиск</span>
                    </div>

                    <div className="radio">
                        <input
                            type="radio"
                            value='search_ip'
                            onChange={this.onModeChange}
                            checked={this.state.search_mode === 'search_ip'}
                        />
                        <span>Поиск по IP</span>
                    </div>

                    <div className="radio">
                        <input
                            type="radio"
                            value='date'
                            onChange={this.onModeChange}
                            checked={this.state.search_mode === 'date'}
                        />
                        <span>Поиск по дате в формате `дд/мм/гггг`</span>
                    </div>

                    <div className="radio">
                        <input
                            type="radio"
                            value='hash'
                            onChange={this.onModeChange}
                            checked={this.state.search_mode === 'hash'}
                        />
                        <span>Поиск по Хэшу `sha1`</span>
                    </div>
                </div>

                <div className="search__input-block">
                    <input
                        type={'text'}
                        placeholder={'Введите текст для поиска: ...'}
                        className={'search__input'}
                        onChange={this.onSearchInputChange}
                    />
                    <button
                        onClick={this.onSearchButtonClick}
                        className="search__input-btn"
                        disabled={this.state.input === ''}
                    >
                        Найти
                    </button>
                </div>

                <div className="search__body">
                    <pre>
                        {this.state.fetchedData && JSON.stringify(this.state.fetchedData, null, 2)}
                    </pre>
                </div>
            </div>
        );
    }
};

export default SearchPage;



// const jsonExample = {
//     "glossary": {
//         "title": "example glossary",
//         "GlossDiv": {
//             "title": "S",
//             "GlossList": {
//                 "GlossEntry": {
//                     "ID": "SGML",
//                     "SortAs": "SGML",
//                     "GlossTerm": "Standard Generalized Markup Language",
//                     "Acronym": "SGML",
//                     "Abbrev": "ISO 8879:1986",
//                     "GlossDef": {
//                         "para": "A meta-markup language, used to create markup languages such as DocBook.",
//                         "GlossSeeAlso": ["GML", "XML"]
//                     },
//                     "GlossSee": "markup"
//                 }
//             }
//         }
//     }
// };
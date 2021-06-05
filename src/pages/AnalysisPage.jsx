import React from 'react';


class AnalysisPage extends React.Component {
    handleFileUpload = (event) => {
        console.log(event.target.files);
    };

    render() {
        return (
            <div className="search">
                <input
                    ref="fileInput"
                    onChange={this.handleFileUpload}
                    type="file"
                    style={{ display: "none" }}
                    multiple={true}
                />
                <button onClick={() => this.refs.fileInput.click()}>Upload File</button>
            </div>
        );
    }
};

export default AnalysisPage;
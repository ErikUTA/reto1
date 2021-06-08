import React, {Component} from 'react';
import QrReader from 'react-qr-scanner';


class QrConteiner extends Component {

    constructor(props){
        super(props)
        this.state = {
            result: 'Hold QR',
        }
        this.handleScan = this.handleScan.bind(this);
    }
    handleScan(result){
        this.setState({
            result: data
        })
    }

    handleError(err){
        console.log(err);
    }

    render(){
        return(
            <React.Fragment>
                <div>
                    <QrReader
                        delay={100}                        
                        onError={this.handleError}
                        onScan={this.handleScan}                        
                    />                                        
                </div>
                <p>{this.state.result}</p>
            </React.Fragment>
        )
    }
}

export default QrConteiner;
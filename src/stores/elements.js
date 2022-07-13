import React from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';

export class MiniActionsCartButton extends React.PureComponent{

    render(){
        return (
            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ width: '100%' }}>
                <div variant="contained" className='ModalItemButtonCart OPEN' style={{ width: 118, height: 38, borderRadius: 40, border: '1px solid #F9BC23', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button style={{ width: 23, height: 23, padding: 0, marginLeft: 8, color: '#525252', fontSize: '0.875rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9BC23', border: '1px solid #F9BC23', borderRadius: 60 }} onClick={this.props.minus.bind(this, this.props.item_id)}>–</button>
                    <div>
                        <span style={{ fontSize: '0.875rem', fontFamily: 'Roboto', fontWeight: 500, color: '#525252' }}>{this.props.count}</span>
                    </div>
                    <button style={{ width: 28, height: 28, padding: 0, marginRight: 6, color: '#525252', fontSize: '0.875rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9BC23', border: '1px solid #F9BC23', borderRadius: 60 }} onClick={this.props.add.bind(this, this.props.item_id)}>+</button>
                </div>
            </ButtonGroup>
        )
    }
}

export function IconRuble(props) {
    return (
        <svg
            style={ props.style }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 0 24 24"
            >
            <path d="M17.778 7.449a3.628 3.628 0 00-1.107-2.761l-.001-.001a4.03 4.03 0 00-2.923-1.057h.009-5.454v7.636h5.454a4.032 4.032 0 002.917-1.06l-.003.003a3.633 3.633 0 001.108-2.768v.007zm4.04 0a7.11 7.11 0 01-2.158 5.368l-.002.002a7.65 7.65 0 01-5.581 2.08h.015-5.795v2.011H16.926c.29 0 .525.235.525.525v.022-.001 2.203c0 .29-.235.525-.525.525h-.022.001-8.608v3.291a.537.537 0 01-.537.528H4.886a.525.525 0 01-.525-.525v-.022.001-3.273H.522a.525.525 0 01-.525-.525v-.022.001-2.182-.021c0-.29.235-.525.525-.525h.022-.001 3.818v-2.011H.522a.525.525 0 01-.525-.525v-.022.001-2.54-.006a.537.537 0 01.528-.537h.019-.001 3.818V.55.529c0-.29.235-.525.525-.525h.022-.001 9.187a7.653 7.653 0 015.57 2.084l-.004-.004a7.11 7.11 0 012.157 5.378v-.013z"></path>
        </svg>
    );
}
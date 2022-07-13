import React from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup';

export class MiniActionsCartButton extends React.PureComponent{

    render(){
        return (
            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" style={{ width: '100%' }}>
                <div variant="contained" className='ModalItemButtonCart OPEN' style={{ width: 118, height: 38, borderRadius: 40, border: '1px solid #F9BC23', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button style={{ width: 23, height: 23, padding: 0, marginLeft: 10, color: '#525252', fontSize: '0.875rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9BC23', border: '1px solid #F9BC23', borderRadius: 60 }} onClick={this.props.minus.bind(this, this.props.item_id)}>–</button>
                    <div>
                        <span style={{ fontSize: '0.875rem', fontFamily: 'Roboto', fontWeight: 500, color: '#525252' }}>{this.props.count}</span>
                    </div>
                    <button style={{ width: 28, height: 28, padding: 0, marginRight: 6, color: '#525252', fontSize: '0.875rem', fontFamily: 'Roboto', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9BC23', border: '1px solid #F9BC23', borderRadius: 60 }} onClick={this.props.add.bind(this, this.props.item_id)}>+</button>
                </div>
            </ButtonGroup>
        )
    }
}
import React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

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

export class MiniActionsCartButton extends React.PureComponent{
    render(){
        return (
            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className='MiniActionsCartButton'>
                <div variant="contained" className='ModalItemButtonCart OPEN'>
                    <button className='minus' onClick={this.props.minus.bind(this, this.props.item_id)}>–</button>
                    <span>{this.props.count}</span>
                    <button className='plus' onClick={this.props.add.bind(this, this.props.item_id)}>+</button>
                </div>
            </ButtonGroup>
        )
    }
}

export class ActionsCartButtonStart extends React.PureComponent{
    render(){
        return(
            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className='ActionsCartButtonStart'>
                <Button variant="contained" className='ModalItemButtonCart' onClick={this.props.add.bind(this)}>
                    <span>В корзину за { new Intl.NumberFormat('ru-RU').format(this.props.price)}</span>
                    <IconRuble style={{ width: 14, height: 14, fill: '#525252', marginLeft: 5, paddingBottom: 1  }} />
                </Button>
            </ButtonGroup>
        )
    }
}

export class ActionsCartButton extends React.PureComponent{
    render(){
        return (
            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className='ActionsCartButton'>
                <div variant="contained" className='ModalItemButtonCart OPEN'>
                    <button className='minus' onClick={this.props.minus.bind(this)}>–</button>
                    <div>
                        <span>{this.props.count} шт. на { new Intl.NumberFormat('ru-RU').format( parseInt(this.props.price) * parseInt(this.props.count) )}</span>
                        <IconRuble style={{ width: 14, height: 14, fill: '#525252', marginLeft: 5, paddingBottom: 1 }} />
                    </div>
                    <button className='plus' onClick={this.props.add.bind(this)}>+</button>
                </div>
            </ButtonGroup>
        )
    }
}


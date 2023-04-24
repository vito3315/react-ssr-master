import React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { height } from '@mui/system';

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

export function VKIcon(props){
    return (
        <svg 
            style={ props.style }
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512"
        >
            <path d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z"/>
        </svg>
    )
}

export function OdnIcon(props){
    return (
        <svg 
            style={ props.style }
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 448 512"
        >
            <path d="M184.2 177.1c0-22.1 17.9-40 39.8-40s39.8 17.9 39.8 40c0 22-17.9 39.8-39.8 39.8s-39.8-17.9-39.8-39.8zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-305.1 97.1c0 44.6 36.4 80.9 81.1 80.9s81.1-36.2 81.1-80.9c0-44.8-36.4-81.1-81.1-81.1s-81.1 36.2-81.1 81.1zm174.5 90.7c-4.6-9.1-17.3-16.8-34.1-3.6 0 0-22.7 18-59.3 18s-59.3-18-59.3-18c-16.8-13.2-29.5-5.5-34.1 3.6-7.9 16.1 1.1 23.7 21.4 37 17.3 11.1 41.2 15.2 56.6 16.8l-12.9 12.9c-18.2 18-35.5 35.5-47.7 47.7-17.6 17.6 10.7 45.8 28.4 28.6l47.7-47.9c18.2 18.2 35.7 35.7 47.7 47.9 17.6 17.2 46-10.7 28.6-28.6l-47.7-47.7-13-12.9c15.5-1.6 39.1-5.9 56.2-16.8 20.4-13.3 29.3-21 21.5-37z"/>
        </svg>
    )
}

export function TGIcon(props){
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 496 512"
            style={ props.style }
        >
            <path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/>
        </svg>
    )
}

export function IconInfoWhite() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 80 80"
      >
        <circle cx="40" cy="40" r="39" stroke="#DADADA" strokeWidth="2"></circle>
        <path
          stroke="#DADADA"
          strokeLinecap="round"
          strokeWidth="4"
          d="M40 34L40 62"
        ></path>
        <circle cx="40" cy="22.667" r="4" fill="#DADADA"></circle>
      </svg>
    );
}

export function IconInfoBlack() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 80 80"
      >
        <circle cx="40" cy="40" r="40" fill="#000" fillOpacity="0.6"></circle>
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="4"
          d="M40 34L40 62"
        ></path>
        <circle cx="40" cy="22.666" r="4" fill="#fff"></circle>
      </svg>
    );
}

export function IconClose(props) {
    return (
      <svg
        style={ props.style ? props.style : null }
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
      >
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="3"
          d="M2 2l60 60M62 2L2 62"
        ></path>
      </svg>
    );
}

export function BurgerIcon(props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="23"
            fill="none"
            viewBox="0 0 30 23"
            {...props}
        >
            <path
                stroke="#B1B1B1"
                strokeLinecap="round"
                strokeWidth="3"
                d="M1.5 1.5L28.5 1.5"></path>
            <path
                stroke="#B1B1B1"
                strokeLinecap="round"
                strokeWidth="3"
                d="M1.5 11.5L28.5 11.5"></path>
            <path
                stroke="#B1B1B1"
                strokeLinecap="round"
                strokeWidth="3"
                d="M1.5 21.5L28.5 21.5"></path>
        </svg>
    );
}

export function YaBtn(props) {
    return (
        <svg width="200" height="56" viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="56" rx="28" fill="black"></rect>
            <rect x="45" y="16" width="24" height="24" rx="12" fill="#FC3F1D"></rect>
            <path d="M58.6912 35.212H61.1982V20.812H57.5516C53.8843 20.812 51.9574 22.6975 51.9574 25.4739C51.9574 27.6909 53.0141 28.9962 54.8995 30.3429L51.6259 35.212H54.3401L57.9867 29.7628L56.7228 28.9133C55.1896 27.8773 54.4437 27.0693 54.4437 25.3288C54.4437 23.7956 55.5211 22.7596 57.5723 22.7596H58.6912V35.212Z" fill="white"></path>
            <path d="M82.2067 25.128C82.2067 24.52 82.3133 23.992 82.5267 23.544C82.74 23.0853 83.0387 22.712 83.4227 22.424C83.8067 22.1253 84.2653 21.9013 84.7987 21.752C85.3427 21.6027 85.9453 21.528 86.6067 21.528H90.3347V33H88.3827V28.584H86.6067L83.6787 33H81.4227L84.6547 28.296C83.8227 28.0933 83.204 27.7253 82.7987 27.192C82.404 26.648 82.2067 25.96 82.2067 25.128ZM88.3827 26.968V23.208H86.5907C85.8653 23.208 85.284 23.352 84.8467 23.64C84.42 23.9173 84.2067 24.3973 84.2067 25.08C84.2067 25.752 84.3987 26.2373 84.7827 26.536C85.1667 26.824 85.7107 26.968 86.4147 26.968H88.3827Z" fill="white"></path>
            <path d="M97.9547 29.496H94.4507V33H92.5947V24.696H94.4507V27.992H97.9547V24.696H99.8107V33H97.9547V29.496Z" fill="white"></path>
            <path d="M101.668 31.496C101.913 31.2827 102.105 30.9893 102.244 30.616C102.393 30.2427 102.51 29.7787 102.596 29.224C102.681 28.6587 102.745 28.0027 102.788 27.256C102.83 26.5093 102.868 25.656 102.9 24.696H108.98V31.496H110.228V35.368H108.612L108.468 33H102.74L102.596 35.368H100.964V31.496H101.668ZM107.124 31.496V26.2H104.5C104.446 27.512 104.356 28.6 104.228 29.464C104.11 30.3173 103.913 30.9947 103.636 31.496H107.124Z" fill="white"></path>
            <path d="M118.382 32.392C118.265 32.4667 118.121 32.552 117.95 32.648C117.78 32.7333 117.577 32.8133 117.342 32.888C117.108 32.9627 116.836 33.0267 116.526 33.08C116.217 33.1333 115.865 33.16 115.47 33.16C113.945 33.16 112.804 32.7813 112.046 32.024C111.3 31.2667 110.926 30.2053 110.926 28.84C110.926 28.168 111.028 27.5653 111.23 27.032C111.433 26.4987 111.716 26.0507 112.078 25.688C112.441 25.3147 112.873 25.032 113.374 24.84C113.876 24.6373 114.425 24.536 115.022 24.536C115.641 24.536 116.196 24.6373 116.686 24.84C117.188 25.0427 117.598 25.3467 117.918 25.752C118.238 26.1573 118.457 26.6587 118.574 27.256C118.702 27.8533 118.708 28.552 118.59 29.352H112.846C112.921 30.1093 113.172 30.68 113.598 31.064C114.025 31.4373 114.692 31.624 115.598 31.624C116.26 31.624 116.809 31.544 117.246 31.384C117.694 31.2133 118.073 31.0373 118.382 30.856V32.392ZM115.022 26.008C114.478 26.008 114.02 26.1733 113.646 26.504C113.273 26.8347 113.028 27.3253 112.91 27.976H116.814C116.836 27.304 116.686 26.808 116.366 26.488C116.046 26.168 115.598 26.008 115.022 26.008Z" fill="white"></path>
            <path d="M122.889 29.624H122.169V33H120.313V24.696H122.169V28.12H122.953L125.593 24.696H127.545L124.409 28.696L127.673 33H125.481L122.889 29.624Z" fill="white"></path>
            <path d="M132.341 33.16C131.669 33.16 131.066 33.064 130.533 32.872C129.999 32.6693 129.546 32.3867 129.173 32.024C128.799 31.6507 128.511 31.1973 128.309 30.664C128.106 30.1307 128.005 29.5227 128.005 28.84C128.005 28.168 128.106 27.5653 128.309 27.032C128.511 26.4987 128.799 26.0507 129.173 25.688C129.546 25.3147 130.005 25.032 130.549 24.84C131.093 24.6373 131.701 24.536 132.373 24.536C132.949 24.536 133.45 24.6 133.877 24.728C134.314 24.856 134.661 25.016 134.917 25.208V26.744C134.586 26.5307 134.223 26.3653 133.829 26.248C133.445 26.1307 132.997 26.072 132.485 26.072C130.767 26.072 129.909 26.9947 129.909 28.84C129.909 30.6853 130.751 31.608 132.437 31.608C132.981 31.608 133.445 31.5493 133.829 31.432C134.223 31.304 134.586 31.144 134.917 30.952V32.488C134.639 32.6693 134.293 32.8293 133.877 32.968C133.461 33.096 132.949 33.16 132.341 33.16Z" fill="white"></path>
            <path d="M142.27 21.528V33H140.334V21.528H142.27Z" fill="white"></path>
            <path d="M144.724 21.528H148.596C149.407 21.528 150.159 21.6187 150.852 21.8C151.556 21.9813 152.164 22.28 152.676 22.696C153.199 23.112 153.604 23.6613 153.892 24.344C154.191 25.0267 154.34 25.8693 154.34 26.872C154.34 27.8853 154.191 28.776 153.892 29.544C153.604 30.3013 153.194 30.936 152.66 31.448C152.138 31.96 151.513 32.3493 150.788 32.616C150.073 32.872 149.29 33 148.436 33H144.724V21.528ZM146.66 23.208V31.336H148.5C149.065 31.336 149.577 31.2507 150.036 31.08C150.505 30.9093 150.906 30.648 151.236 30.296C151.578 29.944 151.839 29.496 152.02 28.952C152.212 28.3973 152.308 27.7413 152.308 26.984C152.308 26.2373 152.217 25.624 152.036 25.144C151.855 24.6533 151.599 24.264 151.268 23.976C150.948 23.688 150.564 23.4907 150.116 23.384C149.668 23.2667 149.183 23.208 148.66 23.208H146.66Z" fill="white"></path>
        </svg>
    )
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
            <ButtonGroup disableElevation={true} disableRipple={true} variant="outlined" className='ActionsCartButtonStart'>
                <Button variant="outlined" className='ModalItemButtonCart' onClick={this.props.add.bind(this)}>
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

export class MiniActionsCartButtonPrize extends React.PureComponent{
    render(){
        return (
            <ButtonGroup disableElevation={true} disableRipple={true} variant="contained" className='MiniActionsCartButtonPrize'>
                <div variant="contained">
                    { parseInt(this.props.count) == 1 ? 
                        <span>В подарок за { new Intl.NumberFormat('ru-RU').format( parseInt(this.props.price) )}</span> 
                            : 
                        <span>{this.props.count} шт. в подарок за { new Intl.NumberFormat('ru-RU').format( parseInt(this.props.price) )}</span>
                    }
                    <IconRuble style={{ width: 12, height: 12, fill: '#525252', marginLeft: 5 }} />
                </div>
            </ButtonGroup>
        )
    }
}

export class MyTextInput extends React.PureComponent {
    constructor(props) {
      super(props);
          
      this.state = {
        type: 'text'
      };
    }
    
    render(){
      return (
        <TextField 
          label={this.props.label}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.func}
          onBlur={this.props.onBlur ? this.props.onBlur : null}
          onKeyDown={this.props.onKeyDown ? this.props.onKeyDown : null}
          disabled={ this.props.disabled || this.props.disabled === true ? true : false }
          variant="outlined" 
          size={'small'} 
          color='primary'
          multiline={this.props.multiline ? this.props.multiline : false}
          maxRows={this.props.maxRows ? this.props.maxRows : 1}
          type={ this.props.type ? this.props.type : this.state.type }
          style={ this.props.style ? this.props.style : {} } 
          className={ this.props.className ? this.props.className : '' }
        />
      )
    }
}
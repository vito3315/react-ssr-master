import { makeAutoObservable } from 'mobx';
import moment from "moment";
const queryString = require('query-string');

class ItemsStore {
  // Don't need decorators now
  items = '';
  itemsPromo = '';
  allItems = '';
  allItemsCat = '';
  banners = '';
  AllPrice = 0;
  sum_div = 0;
  
  cityName = '';
  cityNameRU = '';
  
  promo = null;
  userToken = null;
  userName = '';

  activePage = '';

  need_dops = '';
  free_items = '';
  cart_data = '';
    
  setSumDiv = (items) => {
    this.sum_div = parseInt( items );
  };

  getSumDiv(){
    return this.sum_div;
  };
  
  setDops = (items) => {
    this.need_dops = JSON.stringify(items);
  };

  getDops(){
    return this.need_dops.length == 0 ? [] : JSON.parse(this.need_dops, true);
  };
  
  setFreeItems = (items) => {
    this.free_items = JSON.stringify(items);
  };

  getFreeItems(){
    return this.free_items.length == 0 ? [] : JSON.parse(this.free_items, true);
  };
  
  setCityRU = (city) => {
    this.cityNameRU = city;
  };
  
  getCityRU(){
    //return this.cityNameRU;
    return this.cityNameRU && this.cityNameRU.length > 0 ? this.cityNameRU : 'Город';
  };

  setCity = (city) => {
    this.cityName = city;
  };
  
  getCity(){
    return this.cityName;
  };

  setAllPrice = (price) => {
    this.AllPrice = price;
  };
  
  getAllPrice(){
    return this.AllPrice;
  };

  setPage = (activePage) => {
    this.activePage = activePage;
  };
  
  getPage(){
    return this.activePage;
  };

  setToken = (userToken, userName) => {
    this.userToken = userToken;
    this.setUserName(userName);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', userToken);
    }
  };
  
  getUserName(){
    return this.userName && this.userName.length > 0 ? this.userName : '';
  }
  
  setUserName(userName){
    this.userName = userName;
  }
  
  getToken(){
    return this.userToken;
  };

  getInfoPromo(promoName){
    fetch('https://jacofood.ru/src/php/test_app.php', {
      method: 'POST',
      headers: {
          'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify({
          type: 'get_promo_web', 
          city_id: itemsStore.getCity(),
          promo_name: promoName
      })
  }).then(res => res.json()).then(json => {
      itemsStore.setPromo( JSON.stringify(json), promoName );
      let check_promo = itemsStore.checkPromo();
              
      if( check_promo.st === false ){
        localStorage.removeItem('promo_name')
      }
      
      //return check_promo;
    })
  }
  
  setPromo = (promo, name) => {
    this.promo = promo;
    
    localStorage.setItem('promo_name', name);
  };
  
  getPromo(){
    return JSON.parse(this.promo, true);
    //localStorage.setItem('my_cart', this.items);
  };

  checkPromo(){
    let orderInfo = itemsStore.getCartData();
    itemsStore.setItemsPromo([]);
    
    let tmp = 0,
        allPrice = 0,
        by_time = !orderInfo.orderTimes || parseInt( orderInfo.orderTimes ) == 1 ? 0 : orderInfo.orderPredDay + ' ' + orderInfo.orderPredTime;   
        
    let promo_info = this.getPromo();
    let my_cart = this.getItems();  
    let allItems = this.getAllItems();
      
    let new_my_cart = [];
      
    my_cart.forEach( (el_cart, key_cart) => {
      new_my_cart.push({
        name: el_cart.name,
        item_id: el_cart.item_id,
        count: el_cart.count,
        one_price: el_cart.one_price,
        all_price: parseInt(el_cart.one_price) * parseInt(el_cart.count)
      });
    })
    
    my_cart = new_my_cart;  
      
    this.setItems(my_cart);  
      
    let cart_new_promo = [];    
    allPrice = my_cart.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
    
    let type_order = 0,
        point_id_dev = 0,
        point_id_pic = 0;
    
    if( orderInfo.orderType || orderInfo.orderType == 0 ){
      type_order = parseInt( orderInfo.orderType ) ?? 0;
      point_id_dev = orderInfo.orderAddr ? parseInt( orderInfo.orderAddr.point_id ) : 0;
      point_id_pic = parseInt( orderInfo.orderPic ) ?? 0;
    }
    
    let this_date = moment(by_time).format("YYYY-MM-DD"),
        this_time = moment(by_time).format("H:mm"),
        this_dow = parseInt(moment(by_time).format("E"));
    
    if( by_time == 0 ){
      this_date = moment(new Date()).format("YYYY-MM-DD");
      this_time = moment(new Date()).format("H:mm");
      this_dow = parseInt(moment(new Date()).format("E"));
    }else{
      this_date = moment(by_time).format("YYYY-MM-DD");
      this_time = moment(by_time).format("H:mm");
      this_dow = parseInt(moment(by_time).format("E"));
    }
    
    if( promo_info ){
      if( !promo_info.status_promo ){
        return {
          st: false,
          text: promo_info.promo_text.false
        }
      }
      
      if( promo_info.limits.date.min && promo_info.limits.date.max ){
        if( this_date >= promo_info.limits.date.min && this_date <= promo_info.limits.date.max ){
          
        }else{
          return {
            st: false,
            text: promo_info.promo_text.false
          }
        }
      }
      
      if( promo_info.limits.time.min != 0 && promo_info.limits.time.max != 0 ){
        if( this_time >= promo_info.limits.time.min && this_time <= promo_info.limits.time.max ){
          
        }else{
          return {
            st: false,
            text: promo_info.promo_text.false
          }
        }
      }
      
      if( promo_info.limits.point_id != 0 ){
        if( (type_order == 0 && point_id_dev == promo_info.limits.point_id) || (type_order == 1 && point_id_pic == promo_info.limits.point_id) ){
          
        }else{
          return {
            st: false,
            text: 'Адрес для доставки или самовывоза указан некорректно. Проверьте правильность введённых данных.'
          }
        }
      }
      
      if( promo_info.limits.summ.min != 0 || promo_info.limits.summ.max != 0 ){
        if( allPrice >= promo_info.limits.summ.min && (promo_info.limits.summ.max >= allPrice || promo_info.limits.summ.max == 0) ){
          
        }else{
          return {
            st: false,
            text: 'Общая сумма вашего заказа превышает допустимую стоимость для применения промокода.'
          }
        }
      }
      
      if( promo_info.limits.dows ){
        if( parseInt(promo_info.limits.dows[ this_dow ]) == 0 ){
          return {
            st: false,
            text: 'Указанный вами день недели недоступен для применения промокода. Пожалуйста, выберите другую дату.'
          }
        }
      }
      
      if( promo_info.limits.type_order ){
        if( 
          parseInt( promo_info.limits.type_order ) == 1
            || 
          (parseInt( promo_info.limits.type_order ) == 3 && type_order == 0)  
            || 
          (parseInt( promo_info.limits.type_order ) == 2 && type_order == 1) ){
          
        }else{
          return {
            st: false,
            text: 'Тип заказа не применим для данного промокода. Пожалуйста, отредактируйте заказ.'
          }
        }
      }
      
      if( promo_info.limits.only_kassa ){
        if( parseInt( promo_info.limits.only_kassa ) == 1 ){
          return {
            st: false,
            text: 'Указанный вами промокод действителен только при оплате на кассе. Пожалуйста, посетите для оформления заказа ближайшее к вам кафе.'
          }
        }
      }
      
      if( promo_info.limits.items.length > 0 ){
        let check = 0;
        let this_item = null;
        
        promo_info.limits.items.map((need_item)=>{
          this_item = new_my_cart.find( (item) => item.item_id == need_item );
          
          if( this_item ){
            check ++;
          }
        })
        
        if( promo_info.limits.items.length != check ){
          return {
            st: false,
            text: promo_info.promo_text.false
          }
        }
      }
      //
      
      
      let all_price = 0,
          count_sale = 0,
          this_item = null;
      
      //скидка
      if( parseInt(promo_info.promo_action) == 1 ){
        //товары
        if( parseInt(promo_info.sale.cat_sale) == 1 ){
          count_sale = parseInt(promo_info.sale.count_sale);
          
          my_cart.forEach( (el_cart, key_cart) => {
            this_item = allItems.find( (item) => item.id == el_cart.item_id );
            
            if( parseInt(this_item.type) != 3 && parseInt(this_item.type) != 4 ){
              promo_info.sale.sale_action.forEach( (el_promo) => {
                if( parseInt(el_cart.item_id) == parseInt(el_promo) ){
                  
                  if( parseInt(promo_info.sale.type_price) == 1 ){
                    //рубли  
                    
                    if( count_sale > 0 ){
                      all_price = (parseInt(el_cart.one_price) * parseInt(el_cart.count)) - parseInt(count_sale);
                      
                      if( all_price <= 0 ){
                        all_price = 1;
                      }
                      
                      count_sale -= (parseInt(el_cart.one_price) * parseInt(el_cart.count));
                      
                      my_cart[ key_cart ].all_price = all_price;
                    }
                  }else{
                    //проценты  
                    
                    all_price = parseInt(el_cart.all_price) - ((parseInt(el_cart.all_price) / 100) * parseInt(count_sale));
                    my_cart[ key_cart ].all_price = parseInt(all_price);
                  }
                }
              })
            }
          })
        }
        
        //категории
        if( parseInt(promo_info.sale.cat_sale) == 2 ){
          count_sale = parseInt(promo_info.sale.count_sale);
          
          my_cart.forEach( (el_cart, key_cart) => {
            this_item = allItems.find( (item) => item.id == el_cart.item_id );
            
            if( parseInt(this_item.type) != 3 && parseInt(this_item.type) != 4 ){
              promo_info.sale.sale_action.forEach( (el_promo) => {
                if( parseInt(this_item.cat_id) == parseInt(el_promo) ){
                  
                  if( parseInt(promo_info.sale.type_price) == 1 ){
                    //рубли  
                    
                    if( count_sale > 0 ){
                      all_price = (parseInt(el_cart.one_price) * parseInt(el_cart.count)) - parseInt(count_sale);
                      
                      if( all_price <= 0 ){
                        all_price = 1;
                      }
                      
                      count_sale -= (parseInt(el_cart.one_price) * parseInt(el_cart.count));
                      
                      my_cart[ key_cart ].all_price = all_price;
                    }
                  }else{
                    //проценты  
                    all_price = parseInt(el_cart.all_price) - ((parseInt(el_cart.all_price) / 100) * parseInt(count_sale));
                    my_cart[ key_cart ].all_price = parseInt(all_price);
                  }
                }
              })
            }
          })
        }
        
        //все кроме допов и напитков
        if( parseInt(promo_info.sale.cat_sale) == 3 ){
          count_sale = parseInt(promo_info.sale.count_sale);
          
          my_cart.forEach( (el_cart, key_cart) => {
            this_item = allItems.find( (item) => item.id == el_cart.item_id );
            
            if( parseInt(this_item.type) != 3 && parseInt(this_item.type) != 4 ){
              if( parseInt(promo_info.sale.type_price) == 1 ){
                //рубли  
                
                if( count_sale > 0 ){
                  all_price = (parseInt(el_cart.one_price) * parseInt(el_cart.count)) - parseInt(count_sale);
                  
                  if( all_price <= 0 ){
                    all_price = 1;
                  }
                  
                  count_sale -= (parseInt(el_cart.one_price) * parseInt(el_cart.count));
                  
                  my_cart[ key_cart ].all_price = all_price;
                }
              }else{
                //проценты  
                all_price = parseInt(el_cart.all_price) - ((parseInt(el_cart.all_price) / 100) * parseInt(count_sale));
                my_cart[ key_cart ].all_price = parseInt(all_price);
              }
            }
          })
        }
        
        tmp = 0;
        allPrice = 0;
        
        allPrice = my_cart.reduce( (sum, item) => sum + item['all_price'], tmp );
        
        itemsStore.setAllPrice(allPrice);
        
        return {
          st: true,
          text: promo_info.promo_text.true
        }
      }
      
      //добавление товара
      if( parseInt(promo_info.promo_action) == 2 ){
        promo_info.items_add.forEach((el) => {
          this_item = allItems.find( (item) => item.id == el.item_id );
          
          cart_new_promo.push({
            item_id: el.item_id,
            count: el.count,
            one_price: this_item['price'],
            all_price: el.price,
          });
        });
        
        tmp = 0;
        allPrice = 0;
        
        allPrice = my_cart.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
        
        tmp = 0;
        
        allPrice += cart_new_promo.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
        
        itemsStore.setItemsPromo(cart_new_promo);
        itemsStore.setAllPrice(allPrice);
      }
      
      //товар за цену
      if( parseInt(promo_info.promo_action) == 3 ){
        if( promo_info.items_on_price.length > 0 ){
          my_cart.forEach( (el_cart, key_cart) => {
            promo_info.items_on_price.forEach( (el_promo) => {
              if( parseInt(el_cart.item_id) == parseInt(el_promo.id) ){
                my_cart[ key_cart ].new_one_price = parseInt(el_promo.price)
                my_cart[ key_cart ].all_price = parseInt(el_promo.price) * parseInt(el_cart.count)
              }
            });
          });
          
          tmp = 0;
          allPrice = 0;
          
          allPrice = my_cart.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
          itemsStore.setAllPrice(allPrice);
        }
      }
      
      this.setItems(my_cart);
      
      return {
        st: true,
        text: promo_info.promo_text.true
      }
    }else{
      return {
        st: false,
        text: promo_info.promo_text.false,
        test: promo_info
      }
    }
  }

  setBanners = (items) => {
    this.banners = JSON.stringify(items);
  };

  getBanners(){
    return this.banners.length == 0 ? [] : JSON.parse(this.banners, true);
  };
  
  setItemsPromo = (items) => {
    this.itemsPromo = JSON.stringify(items);
  };

  getItemsPromo(){
    return this.itemsPromo.length == 0 ? [] : JSON.parse(this.itemsPromo, true);
  };

  setAllItemsCat = (items) => {
    this.allItemsCat = JSON.stringify(items);
  };

  getAllItemsCat(){
    return this.allItemsCat.length == 0 ? [] : JSON.parse(this.allItemsCat, true);
  };

  setItems = (items) => {
    let tmp = 0,
        allPrice = 0;
    
    let cart_new_promo = this.getItemsPromo();
        
    allPrice = items.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
    
    tmp = 0;
        
    allPrice += cart_new_promo.reduce( (sum, item) => sum + parseInt(item['all_price']), tmp );
    
    this.setAllPrice(allPrice);
    
    this.items = JSON.stringify(items);
    if (typeof window !== 'undefined') {
      let my_cart = items.filter( (item) => item.count > 0 );
      my_cart = JSON.stringify(my_cart);
      
      localStorage.setItem('my_cart', my_cart);
    }
  };
  
  saveCartData = (items) => {
    let cartData = JSON.stringify(items);
    this.cart_data = cartData;
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartData', cartData);
    }
  };
  
  getCartData(){
    if (typeof window !== 'undefined') {
      if( localStorage.getItem('cartData') ){
        return JSON.parse( localStorage.getItem('cartData') );
      }else{
        return [];
      }
    }
  };
  
  setAllItems = (items) => {
    this.allItems = JSON.stringify(items);
  };

  getItems(){
    return this.items.length == 0 ? [] : JSON.parse(this.items, true);
  };
  
  getAllItems(){
    return this.allItems.length == 0 ? [] : JSON.parse(this.allItems, true);
  };

  AddItem(id){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    let promo = itemsStore.getPromo();
    
    if( all_items.length > 0 ){
      let cart_info = my_cart.find( (item) => item.item_id == id );
      let count_ = 0;
      
      if( cart_info ){
        count_ = cart_info.count;
      }
      
      let item_info = all_items.find( (item) => item.id == id );
      
      if(item_info){
        let count = count_ + 1,
            price = item_info['price'];
          
        let max_count = itemsStore.check_max_count( parseInt(id) );    
        
        if( parseInt(max_count) >= count ){
          let check_in_cart = my_cart.some( (item) => item.item_id == id );
            if( !check_in_cart ){
              my_cart.push({
                name: item_info.name,
                item_id: id,
                count: count,
                one_price: price,
                all_price: count * price
              })
            }else{
              my_cart.forEach((item, key) => {
                if( item.item_id == id ){
                  my_cart[key]['count'] = count;
                  my_cart[key]['all_price'] = count * price;
                }
              });
            }
          
          itemsStore.setItems(my_cart);
          
          if( promo ){
            itemsStore.checkPromo();
          }
          
          return count;
        }
        
        return count - 1;
      }
    }else{
      return 0;
    }
  }

  MinusItem(id){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    let promo = itemsStore.getPromo();
    
    if( all_items.length > 0 ){
      let cart_info = my_cart.find( (item) => item.item_id == id );
      
      if( !cart_info ){
        return 0;
      }
      
      let item_info = all_items.find( (item) => item.id == id ),
          count = parseInt(cart_info.count) - 1,
          price = item_info['price'];
      
      if( count <= 0 ){
        count = 0;
      }    
          
      if( count >= 0 ){
        my_cart.map( (item, key) => {
          if( item.item_id == id ){
            my_cart[key]['count'] = count;
            my_cart[key]['all_price'] = count * price;
          }
        } )
        
        itemsStore.setItems(my_cart)
      }
    
      if( promo ){
        itemsStore.checkPromo();
      }
      
      return count;
    }else{
      return 0;
    }
  }

  check_need_dops(){
    let my_cart = itemsStore.getItems();
    let all_items = itemsStore.getAllItems();
    
    if( !all_items || all_items.length == 0 ){
      return [];
    }
    
    let count_pizza = 0,
        count_rolls = 0;
        
    let need_dops = itemsStore.getDops();
        
    if( need_dops.length == 0 ){
      return [];
    }
    
    my_cart.forEach(el => {
      let this_item = all_items.find( (item) => item.id == el.item_id );
      
      if( !this_item ){
        return [];
      }
      
      if( parseInt(this_item['cat_id']) == 14 ){
        count_pizza += parseInt(el.count)
      }else{
        if( parseInt(this_item['cat_id']) !== 14 && parseInt(this_item['cat_id']) !== 5 && parseInt(this_item['cat_id']) !== 6 && parseInt(this_item['cat_id']) !== 7 ){
          count_rolls += parseInt(el.count)
        }
      }
    });
    
    let all_need_dops = [];
    
    if( count_rolls > 0 && count_pizza == 0 ){
      all_need_dops = need_dops['rolls'];
    }
    
    if( count_rolls == 0 && count_pizza > 0 ){
      all_need_dops = need_dops['pizza'];
    }
    
    if( count_rolls > 0 && count_pizza > 0 ){
      all_need_dops = [...need_dops['rolls'], ...need_dops['pizza']];
    }
    
    if( count_rolls == 0 && count_pizza == 0 ){
      all_need_dops = [...need_dops['rolls'], ...need_dops['pizza']];
    }
    
    let my_dops = [],
        add_my_dop = [];
    
    my_cart.forEach(el => {
      let this_item = all_items.find( (item) => item.id == el.item_id );
      
      if( !this_item ){
        return [];
      }
      
      if( parseInt(this_item['cat_id']) == 7 ){
        my_dops.push( this_item );
      }
    });
    
    my_dops.forEach( (my_d) => {
      let check_dop = false;
      
      all_need_dops.forEach( (need_dop) => {
        if( parseInt( need_dop.id ) == parseInt( my_d.id ) ){
          check_dop = true;
        }
      });
      
      if( !check_dop ){
        add_my_dop.push( my_d );
      }
    });
    
    all_need_dops = [...all_need_dops, ...add_my_dop];
    
    return all_need_dops;
  }
  
  check_max_count(item_id){
    let free_dops_in_cart = [];
    let unic_id = [];
    
    let my_cart = itemsStore.getItems();
    let free_items = itemsStore.getFreeItems();
    
    if( !free_items ){
      return 99;
    }
    
    my_cart.forEach((item_cart, key) => {
      free_items.forEach( (item) => {
        if( parseInt(item_cart['item_id']) == parseInt(item['this_item_id']) ){
          item['count_in_cart'] = parseInt(item_cart['count']);
          
          free_dops_in_cart.push( item );
          unic_id.push( parseInt(item['item_id']) );
        }
      });
    });
    
    unic_id = [...new Set(unic_id)];
    
    let new_free_dop = [];
    
    unic_id.forEach( (unic_item, key) => {
      free_dops_in_cart.forEach( (item_free) => {
        if( parseInt(unic_item) == parseInt(item_free['item_id']) ){
          let check = false;
          
          new_free_dop.forEach( (el, k) => {
            if( parseInt( el['item_id'] ) == parseInt(unic_item) ){
              check = true;
              new_free_dop[k]['count'] += item_free['count_in_cart'] * item_free['max_count'];
            }
          });
          
          if( !check ){
            new_free_dop.push({
              item_id: parseInt(unic_item),
              count: item_free['count_in_cart'] * item_free['max_count']
            });
          }
        }
      })
    });
    
    let max_count = 99;
    
    new_free_dop.forEach(el => {
      if( parseInt( el['item_id'] ) == parseInt(item_id) ){
        max_count = parseInt(el['count']);
      }
    });
    
    return max_count;
  }
  
  constructor() {
    if (typeof window !== 'undefined') {
      if( localStorage.getItem('my_cart') ){
        let cart = JSON.parse(localStorage.getItem('my_cart'));
        let new_cart = [];
        
        cart.forEach(item => {
          new_cart.push({
            name: item.name,
            item_id: item.item_id,
            count: item.count,
            one_price: parseInt( item.one_price ),
            all_price: parseInt( item.one_price ) * parseInt( item.count )
          })
        });
        
        this.setItems( new_cart );
      }
      if( localStorage.getItem('token') ){
        this.setToken( localStorage.getItem('token') );
      }
      if( localStorage.getItem('cartData') ){
        this.cartData = localStorage.getItem('cartData');
      }
      if( localStorage.getItem('promo_name') ){
        setTimeout(()=>{
          this.getInfoPromo( localStorage.getItem('promo_name') )
        }, 300)
      }
    }
    
    
    
    makeAutoObservable (this);
  }
}

const itemsStore = new ItemsStore();

export default itemsStore;
export { ItemsStore };
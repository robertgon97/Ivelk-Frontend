import menuIvelk from './components/header.vue'
import Item from './components/item.vue'

const GlobalComponents = {
  install (Vue) {
    Vue.component('menu-ivlk', menuIvelk)
    Vue.component('item-normal', Item)
  }
}

export default GlobalComponents

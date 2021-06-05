import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Sidebar,
    SidebarItem,
    Collapse,
    CollapseItem,
    Tab,
    Tabs,
    Card,
    Image as VanImage,
    Tag,
    Button,
    Form,
    Field,
    Badge,
    Checkbox,
    CheckboxGroup,
    SwipeCell,
    Stepper,
    SubmitBar,
    Empty,
    Icon,
    AddressList,
    AddressEdit,
    ContactCard,
    Popup
} from 'vant'
import 'assets/css/iconfont.css'

createApp(App)
    .use(Tab).use(Tabs).use(Card)
    .use(Collapse).use(CollapseItem)
    .use(Sidebar).use(SidebarItem).use(AddressList).use(AddressEdit)
    .use(VanImage).use(Tag).use(Button).use(ContactCard)
    .use(Form).use(Field).use(Badge).use(Icon).use(Popup)
    .use(Checkbox).use(CheckboxGroup).use(Empty)
    .use(SwipeCell).use(Stepper).use(SubmitBar)
    .use(Swipe).use(SwipeItem).use(Lazyload, {
        loading: require("./assets/images/default.png")
    })
    .use(store).use(router).mount('#app')
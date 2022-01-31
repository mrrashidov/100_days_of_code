import {createApp} from "vue";
import App from "./App.vue";
import "./assets/css/main.css";
import router from "./router";
import client from "./graphql"

createApp(App)
    .use(client)
    .use(router)
    .mount("#app");

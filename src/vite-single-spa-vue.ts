import { createApp, h } from "vue";
import App from "./App.vue";
import singleSpaVue from "single-spa-vue";

createApp(App).mount("#app");

export const { bootstrap, mount, unmount } = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App, {}),
    // router,
  },
  handleInstance(app) {
    // app.use(router);
  },
});

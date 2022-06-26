export * from "./router";

import router from "./router";
import makeModule from "./store/store";

export default {
  router,
  store: makeModule()
};

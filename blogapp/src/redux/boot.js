import { store } from "./store";
import authActions from "./auth/actions";

const Boot = () =>
  new Promise(() => {
    store.dispatch(authActions.checkAuthorization());
  });

export default Boot;

import actions from "./actions";

const initState = {
  blogs: null,
  loading: true,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.FETCH_BLOGS_SUCCESS:
      console.log(action.payload);
      return {
        blogs: action.payload.data,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

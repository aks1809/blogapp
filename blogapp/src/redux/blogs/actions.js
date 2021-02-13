const actions = {
  FETCH_BLOGS_START: "FETCH_BLOGS_START",
  FETCH_BLOGS_SUCCESS: "FETCH_BLOGS_SUCCESS",

  fetchBlogsStart: (type) => ({
    type: actions.FETCH_BLOGS_START,
    payload: type,
  }),
  fetchBlogsSuccess: (data) => ({
    type: actions.FETCH_BLOGS_SUCCESS,
    payload: data,
  }),
};
export default actions;

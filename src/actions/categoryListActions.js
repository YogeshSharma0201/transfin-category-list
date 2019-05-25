//Action for fetching posts
export const categoryListActions = (pathname) => (dispatch, getState) => {
  var result = getState().categoryListReducer.result;
  var offset = result.offset;
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: {
      fetching: true
    }
  });

  // /business is default route
  if(pathname !== '/business' && pathname !== '/economy') pathname = '/business';

  fetch(`https://transfin.in/transfinadmin/web/api/common/category-page-recent-posts?`+
    `id=6840`+
    `&access_token=wblc2Dmjm2S9tR5fL8OSL5nCAKGSHmzl`+
    `&url=${pathname.slice(1)}`+
    `&offset=${offset}`+
    `&count=10`)
    .then((res)=> res.json())
    .then((res)=> {
      res = res.response[0];
      // combine new and previous posts if offset != 0
      var posts = (offset === 0) ? [...res.posts] : [...result.posts, ...res.posts];
      //save posts and increment offset
      dispatch({
       type: 'SIMPLE_ACTION',
       payload: {
         posts,
         posts_count: res.posts_count,
         offset: offset+10,
         fetching: false
       }
      })
    })
    .catch((err)=> {
      console.log(err);
      //disable fetch loader and enable load more button in case of errors
      dispatch({
       type: 'SIMPLE_ACTION',
       payload: {
         fetching: false
       }
      })
    });
}

//Action for changing category
export const changeCategory = () => {
  return {
    type: 'CHANGE_CATEGORY'
  }
};

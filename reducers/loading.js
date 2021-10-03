const ACTION_TYPE = { 
  SHOW: componentsName + "SHOW",
  HIDE: componentsName + "HIDE",
  // LOADING: componentsName + "LOADING",
};

const componentsName = "loading";
const initialState = { showLoading: false };

export default reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ACTION_LOADING.SHOW:
    //   return { 
    //     ...state, 
    //     showLoading: true 
    //   };
    case ACTION_TYPE.SHOW:
      return { 
        ...state, 
        showLoading: true 
      };
    case ACTION_TYPE.HIDE:
      return { 
        ...state, 
        showLoading: false 
      };
    default:
      return state;
  }
};



export const showLoading = () => ({
  type: ACTION_TYPE.SHOW,
});

export const hideLoading = () => ({
  type: ACTION_TYPE.HIDE,
});


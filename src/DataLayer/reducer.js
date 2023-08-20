
export const initialState = {
    users: [],
    videos: [],
    category: [],
    brands: [],
    itemToVerify: [],
    placed_orders: [],
    lengths: {
        farmers: 0,
        corporates: 0,
        consumers: 0
    },
    drawer: true
}
const reducer = (state, action) => {
    var type = action.type
    switch (type) {
        case "SET_USERS":
            return { ...state, users: action.data }
        case "SET_CATE_LIST":
            return { ...state, category: action.data }
        case "SET_VIDEOS":
            return { ...state,  videos: action.data }
        case "SET_USER_DATA":
            return { ...state, user: { ...state.user, userData: action.data } }
        case "SET_USER_CART":
            return { ...state, user: { ...state.user, userCart: action.data } }
        case "SET_FARMER_DATE":
            return { ...state, farmerData: action.data }
        case "SET_BRANDS":
            return { ...state, brands: action.data }
        case "SET_ITEM_TO_VERIFY":
            return { ...state, itemToVerify: action.data }
        case "SET_ALL_USERS_DATA":
            return { ...state, allUsersData: action.data }
        case "SET_DRAWER":
            return { ...state, drawer: action.data }
        case "SET_PLACED_ORDERS":
            return { ...state, placed_orders: action.data }
        case "SET_LENGTHS":
            return { ...state, lengths: action.data }
        case "SET_CROPS":
            return { ...state, crops: action.data }
        default:
            return state
    }
}
export default reducer

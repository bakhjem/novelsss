
const initialState = {
  items: [],
  item: {},
  mangalist: [],
  mangadetail: [],
  genres: [],
  cate: [],
  hotnovel: [],
  noveldetail: [],
  novelchapter: [],
  newupdate:[],
  genresdetail: [],
  completenovel: [],
  newnovel: [],
  search: [],
  loading:false
}

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_FETCH':
      return {
        ...state,
            loading: true
      };
    case 'FETCH_MANGA_HOME':
      return {
        ...state,
            mangalist: action.mangalist,loading: false
      };
    case 'FETCH_HOT_NOVEL':
      return {
        ...state,
        hotnovel: action.hotnovel,loading: false
      };
    case 'FETCH_GENRES':
      return {
        ...state,
        genres: action.genres
      };
    case "FETCH_NOVEL_DETAIL":
      return {
        ...state,
        noveldetail: action.noveldetail,loading: false
      };
      case "FETCH_NOVEL_CHAPTER":
      return {
        ...state,
        novelchapter: action.novelchapter,loading: false
      };
      case "FETCH_NOVEL_NEW_UPDATE":
      return {
        ...state,
        newupdate: action.newupdate, loading: false
      };
      case "FETCH_GENRES_DETAIL":
      return {
        ...state,
        genresdetail: action.genresdetail,loading: false
      };
      case "FETCH_NEW_NOVEL":
      return {
        ...state,
        newnovel: action.newnovel,loading: false
      };
      case "FETCH_COMPLETED_NOVEL":
      return {
        ...state,
        completenovel: action.completenovel,loading: false
      };
      case "FETCH_SEARCH_NOVEL":
      return {
        ...state,
        search: action.search,loading: false
      };
    default:
      return state
  }
}

export default HomeReducer;

import { CarihareketAction, CarihareketState } from "../../types/carihareket";

const defaultState: CarihareketState = {
  data: [],
  loading: false,
  error: "",
};

const CarihareketReducer = (
  state: CarihareketState = defaultState,
  action: CarihareketAction
) => {
  switch (action.type) {
    case "GET_Cariharekets_START":
      return { ...state, loading: true, error: "" };
    case "GET_Cariharekets_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_Cariharekets_ERROR":
      return { ...state, loading: false, error: "Error fetching Cariharekets" };
      case "GET_DetayCariharekets_START":
        return { ...state, loading: true, error: "" };
      case "GET_DetayCariharekets_SUCCESS":
        return { ...state, loading: false, data: action.payload };
      case "GET_DetayCariharekets_ERROR":
        return { ...state, loading: false, error: "Error fetching Cariharekets" };
        case "GET_DetaySorguCariharekets_START":
          return { ...state, loading: true, error: "" };
        case "GET_DetaySorguCariharekets_SUCCESS":
          return { ...state, loading: false, data: action.payload };
        case "GET_DetaySorguCariharekets_ERROR":
          return { ...state, loading: false, error: "Error fetching Cariharekets" };
    case "ADD_Carihareket_START":
      return { ...state, loading: true, error: "" };
    case "ADD_Carihareket_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_Carihareket_ERROR":
      return { ...state, loading: false, error: "Error adding Cariharekets" };
    case "UPDATE_Carihareket_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_Carihareket_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((Carihareket) =>
          Carihareket.carHarid === action.payload.carHarid ? action.payload : Carihareket
        ),
      };
    case "UPDATE_Carihareket_ERROR":
      return { ...state, loading: false, error: "Error updating Carihareket" };
      
    case "DELETE_Carihareket_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_Carihareket_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((Carihareket) => Carihareket.carHarid !== action.payload),
      };
    case "DELETE_Carihareket_ERROR":
      return { ...state, loading: false, error: "Error deleting Carihareket" };
    default:
      return state;
  }
};

export default CarihareketReducer;
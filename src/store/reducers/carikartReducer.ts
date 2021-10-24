import { CarikartAction, CarikartState } from "../../types/carikart";

const defaultState: CarikartState = {
  data: [],
  loading: false,
  error: "",
};

const CarikartReducer = (
  state: CarikartState = defaultState,
  action: CarikartAction
) => {
  switch (action.type) {
    case "GET_Carikarts_START":
      return { ...state, loading: true, error: "" };
    case "GET_Carikarts_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_Carikarts_ERROR":
      return { ...state, loading: false, error: "Error fetching Carikarts" };
      case "GET_UnvanCarikarts_START":
        return { ...state, loading: true, error: "" };
      case "GET_UnvanCarikarts_SUCCESS":
        return { ...state, loading: false, data: action.payload };
      case "GET_UnvanCarikarts_ERROR":
        return { ...state, loading: false, error: "Error fetching Carikarts" };

        case "GET_IlceCarikarts_START":
          return { ...state, loading: true, error: "" };
        case "GET_IlceCarikarts_SUCCESS":
          return { ...state, loading: false, data: action.payload };
        case "GET_IlceCarikarts_ERROR":
          return { ...state, loading: false, error: "Error fetching Carikarts" };

    case "ADD_Carikart_START":
      return { ...state, loading: true, error: "" };
    case "ADD_Carikart_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_Carikart_ERROR":
      return { ...state, loading: false, error: "Error adding Carikarts" };
    case "UPDATE_Carikart_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_Carikart_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((Carikart) =>
          Carikart.cariKodu === action.payload.cariKodu ? action.payload : Carikart
        ),
      };
    case "UPDATE_Carikart_ERROR":
      return { ...state, loading: false, error: "Error updating Carikart" };


      case "UPDATE_HarCarikart_START":
        return { ...state, loading: true, error: "" };
      case "UPDATE_HarCarikart_SUCCESS":
        return {
          ...state,
          loading: false,
          data: state.data.map((Carikart)=>{
            if(Carikart.cariKodu === action.payload.cid){
              if(action.payload.tur==1||action.payload.tur==4){
                Carikart.toplamBorc=Carikart.toplamBorc+action.payload.tut
                return Carikart
              }else{
                Carikart.toplamAlacak=Carikart.toplamAlacak+action.payload.tut
                return Carikart
              }
                    
            }else{
                 return Carikart;
            }
          } //=> Carikart.cariKodu === action.payload.cid?Carikart : Carikart
          ),
        };
      case "UPDATE_HarCarikart_ERROR":
        return { ...state, loading: false, error: "Error updating Carikart" };



    case "DELETE_Carikart_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_Carikart_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((Carikart) => Carikart.cariKodu !== action.payload),
      };
    case "DELETE_Carikart_ERROR":
      return { ...state, loading: false, error: "Error deleting Carikart" };
    default:
      return state;
  }
};

export default CarikartReducer;
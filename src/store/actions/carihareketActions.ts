import { Carihareket, CarihareketDispatch, CarihareketForm } from "../../types/carihareket";
import api from "../../utils/api";

export const getCariharekets = () => async (dispatch: CarihareketDispatch) => {
  dispatch({ type: "GET_Cariharekets_START" });
  try {
    const response = await api().get<Carihareket[]>("/Carhars");
    dispatch({ type: "GET_Cariharekets_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_Cariharekets_ERROR" });
  }
};

export const getdetayCariharekets = (kod:number) => async (dispatch: CarihareketDispatch) => {
  dispatch({ type: "GET_DetayCariharekets_START" });
  try {
    const response = await api().get<Carihareket[]>("/Carhars/c"+kod);
    dispatch({ type: "GET_DetayCariharekets_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_DetayCariharekets_ERROR" });
  }
};

export const getdetaysorguCariharekets = (id:number,ilk:string,son:string,aciklama:string) => async (dispatch: CarihareketDispatch) => {
  dispatch({ type: "GET_DetaySorguCariharekets_START" });
  try {
    console.log("aaa")
    console.log(ilk)
    const response = await api().get<Carihareket[]>("/Carhars/s/"+id+"/"+0+"/"+ilk+"/"+son+"/"+aciklama);
    dispatch({ type: "GET_DetaySorguCariharekets_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_DetaySorguCariharekets_ERROR" });
  }
};


export const addCarihareket =
  (form: CarihareketForm) => async (dispatch: CarihareketDispatch) => {
    dispatch({ type: "ADD_Carihareket_START" });
    try {
      const response = await api().post<Carihareket>("/Carhars", form);
      dispatch({ type: "ADD_Carihareket_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "ADD_Carihareket_ERROR" });
    }
  };

/*export const updateCarihareket =
  (form: Partial<CarihareketForm>, CarihareketId: number) =>
  async (dispatch: CarihareketDispatch) => {
    dispatch({ type: "UPDATE_Carihareket_START" });
    try {
      const response = await api().put<Carihareket>(
        "/Carhars/" + CarihareketId,
        form
      );
      dispatch({ type: "UPDATE_Carihareket_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "UPDATE_Carihareket_ERROR" });
    }
  };*/

export const deleteCarihareket =
  (CarihareketId: number) => async (dispatch: CarihareketDispatch) => {
    dispatch({ type: "DELETE_Carihareket_START" });
    try {
      await api().delete("/Carhars/" + CarihareketId);
      dispatch({ type: "DELETE_Carihareket_SUCCESS", payload: CarihareketId });
    } catch {
      dispatch({ type: "DELETE_Carihareket_ERROR" });
    }
  };
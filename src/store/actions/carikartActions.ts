import { Carikart, CarikartDispatch, CarikartForm } from "../../types/carikart";
import api from "../../utils/api";

export const getCarikarts = () => async (dispatch: CarikartDispatch) => {
  dispatch({ type: "GET_Carikarts_START" });
  try {
    const response = await api().get<Carikart[]>("/Carikarts");
    dispatch({ type: "GET_Carikarts_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_Carikarts_ERROR" });
  }
};


export const getUnvanCarikarts =   (cariunvan: string) => async (dispatch: CarikartDispatch) => {
  dispatch({ type: "GET_UnvanCarikarts_START" });
  try {
    const response = await api().get<Carikart[]>("/Carikarts/u/"+cariunvan+"/"+"1"); 
    dispatch({ type: "GET_UnvanCarikarts_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_UnvanCarikarts_ERROR" });
  }
};

export const ge =  (ilce: string) => async (dispatch: CarikartDispatch) => {
  dispatch({ type: "GET_IlceCarikarts_START" });
  try {
    const response = await api().get<Carikart[]>("/Carikarts/i/"+ilce+"/"+"1"); 
    dispatch({ type: "GET_IlceCarikarts_SUCCESS", payload: response.data });
  } catch {
    dispatch({ type: "GET_IlceCarikarts_ERROR" });
  }
};
export const addCarikart =
  (form: CarikartForm) => async (dispatch: CarikartDispatch) => {
    dispatch({ type: "ADD_Carikart_START" });
    try {
      console.log("girddii add carkartt");
      const response = await api().post<Carikart>("/Carikarts", form);
      dispatch({ type: "ADD_Carikart_SUCCESS", payload: response.data });
    } catch(e ) {
      console.log(e);
       console.log("hatac carrkart");
      dispatch({ type: "ADD_Carikart_ERROR" });
    }
  };

/*export const updateCarikart =
  (form: Partial<CarikartForm>, CarikartId: number) =>
  async (dispatch: CarikartDispatch) => {
    dispatch({ type: "UPDATE_Carikart_START" });
    try {
      const response = await api().put<Carikart>(
        "/Carikarts/" + CarikartId,
        form
      );
      dispatch({ type: "UPDATE_Carikart_SUCCESS", payload: response.data });
    } catch {
      dispatch({ type: "UPDATE_Carikart_ERROR" });
    }
  };*/
  export const Caridto= (id:number, tutar:number) => { return { id: id, tutar: tutar } }


  export class Sample {
    cid;
    tut;
    tur;

    constructor(id:number,tu:number,turu:number) {
      this.cid = id
      this.tut=tu
      this.tur=turu
    }
  }
  export const updateharCarikart =
  (cariId:number,tutar:number,tur:number) =>
  async (dispatch: CarikartDispatch) => {
    dispatch({ type: "UPDATE_HarCarikart_START" });
    try {
     
      const car = new Sample(cariId,tutar,tur)
      dispatch({ type: "UPDATE_HarCarikart_SUCCESS", payload:car });
    } catch {
      dispatch({ type: "UPDATE_HarCarikart_ERROR" });
    }
  };

export const deleteCarikart =
  (CarikartId: number) => async (dispatch: CarikartDispatch) => {
    dispatch({ type: "DELETE_Carikart_START" });
    try {
      await api().delete("/Carikarts/" + CarikartId);
      dispatch({ type: "DELETE_Carikart_SUCCESS", payload: CarikartId });
    } catch {
      dispatch({ type: "DELETE_Carikart_ERROR" });
    }
  };
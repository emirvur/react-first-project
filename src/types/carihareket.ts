import { ThunkDispatch } from "redux-thunk";

export interface CarihareketState {
  data: Carihareket[];
  loading: boolean;
  error: string;
}

export interface Carihareket {
    carHarid: number;
    cariKod: number;
    aciklama: string;
    harFlag: number;
    tutar: number;
    tarih: string;
  //  cariKodNavigation?: any;
}

export interface CarihareketForm {
  carHarid: number;
  cariKod: number;
    aciklama: string;
    harFlag: number;
    tutar: number;
    tarih: string;
 
}

interface GET_START {
  type: "GET_Cariharekets_START";
}

interface GET_SUCCESS {
  type: "GET_Cariharekets_SUCCESS";
  payload: Carihareket[];
}

interface GET_ERROR {
  type: "GET_Cariharekets_ERROR";
}

interface GET_DETAYSTART {
  type: "GET_DetayCariharekets_START";
}

interface GET_DETAYSUCCESS {
  type: "GET_DetayCariharekets_SUCCESS";
  payload: Carihareket[];
}

interface GET_DETAYERROR {
  type: "GET_DetayCariharekets_ERROR";
}



interface GET_DETAYSORGUSTART {
  type: "GET_DetaySorguCariharekets_START";
}

interface GET_DETAYSORGUSUCCESS {
  type: "GET_DetaySorguCariharekets_SUCCESS";
  payload: Carihareket[];
}

interface GET_DETAYSORGUERROR {
  type: "GET_DetaySorguCariharekets_ERROR";
}


interface ADD_START {
  type: "ADD_Carihareket_START";
}

interface ADD_SUCCESS {
  type: "ADD_Carihareket_SUCCESS";
  payload: Carihareket;
}

interface ADD_ERROR {
  type: "ADD_Carihareket_ERROR";
}

interface UPDATE_START {
  type: "UPDATE_Carihareket_START";
}

interface UPDATE_SUCCESS {
  type: "UPDATE_Carihareket_SUCCESS";
  payload: Carihareket;
}

interface UPDATE_ERROR {
  type: "UPDATE_Carihareket_ERROR";
}

interface DELETE_START {
  type: "DELETE_Carihareket_START";
}

interface DELETE_SUCCESS {
  type: "DELETE_Carihareket_SUCCESS";
  payload: number;
}

interface DELETE_ERROR {
  type: "DELETE_Carihareket_ERROR";
}

export type CarihareketAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | GET_DETAYSTART
  | GET_DETAYSUCCESS
  | GET_DETAYERROR
  | GET_DETAYSORGUSTART
  | GET_DETAYSORGUSUCCESS
  | GET_DETAYSORGUERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;
export type CarihareketDispatch = ThunkDispatch<
  CarihareketState,
  void,
  CarihareketAction
>;
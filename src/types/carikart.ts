import { ThunkDispatch } from "redux-thunk";
import { Caridto, Sample } from '../store/actions/carikartActions'
export interface CarikartState {
  data: Carikart[];
  loading: boolean;
  error: string;
}

export interface Carikart {
  cariKodu: number;
  cariUnvani: string;
  telefon: string;
  adres: string;
  ilce: string;
  vergino: string;
  aktifMi: number;
  notlar: string;
  toplamAlacak: number;
  toplamBorc: number;
  acilisTarih: string;
  sonIslemTarih: string;
 // carHar: any[];
}

export interface CarikartForm {
  cariKodu: number;
  cariUnvani: string;
  telefon: string;
  adres: string;
  ilce: string;
  vergino: string;
  aktifMi: number;
  notlar: string;
  toplamAlacak: number;
  toplamBorc: number;
  acilisTarih: string;
  sonIslemTarih: string;
 // carHar: any[];
}

interface GET_START {
  type: "GET_Carikarts_START";
}

interface GET_SUCCESS {
  type: "GET_Carikarts_SUCCESS";
  payload: Carikart[];
}

interface GET_ERROR {
  type: "GET_Carikarts_ERROR";
}
interface GET_UNVANSTART {
  type: "GET_UnvanCarikarts_START";
}

interface GET_UNVANSUCCESS {
  type: "GET_UnvanCarikarts_SUCCESS";
  payload: Carikart[];
}

interface GET_UNVANERROR {
  type: "GET_UnvanCarikarts_ERROR";
}
interface GET_ILCESTART {
  type: "GET_IlceCarikarts_START";
}

interface GET_ILCESUCCESS {
  type: "GET_IlceCarikarts_SUCCESS";
  payload: Carikart[];
}

interface GET_ILCEERROR {
  type: "GET_IlceCarikarts_ERROR";
}

interface ADD_START {
  type: "ADD_Carikart_START";
}

interface ADD_SUCCESS {
  type: "ADD_Carikart_SUCCESS";
  payload: Carikart;
}

interface ADD_ERROR {
  type: "ADD_Carikart_ERROR";
}

interface UPDATE_START {
  type: "UPDATE_Carikart_START";
}

interface UPDATE_SUCCESS {
  type: "UPDATE_Carikart_SUCCESS";
  payload: Carikart;
}

interface UPDATE_ERROR {
  type: "UPDATE_Carikart_ERROR";
}
interface UPDATEHAR_START {
  type: "UPDATE_HarCarikart_START";
}

interface UPDATEHAR_SUCCESS {
  type: "UPDATE_HarCarikart_SUCCESS";
  payload: Sample;
}

interface UPDATEHAR_ERROR {
  type: "UPDATE_HarCarikart_ERROR";
}
interface DELETE_START {
  type: "DELETE_Carikart_START";
}

interface DELETE_SUCCESS {
  type: "DELETE_Carikart_SUCCESS";
  payload: number;
}

interface DELETE_ERROR {
  type: "DELETE_Carikart_ERROR";
}

export type CarikartAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | GET_UNVANSTART
  | GET_UNVANSUCCESS
  | GET_UNVANERROR
  | GET_ILCESTART
  | GET_ILCESUCCESS
  | GET_ILCEERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR
  | UPDATE_START
  | UPDATE_SUCCESS
  | UPDATE_ERROR
  | UPDATEHAR_START
  | UPDATEHAR_SUCCESS
  | UPDATEHAR_ERROR
  | DELETE_START
  | DELETE_SUCCESS
  | DELETE_ERROR;
export type CarikartDispatch = ThunkDispatch<
  CarikartState,
  void,
  CarikartAction
>;
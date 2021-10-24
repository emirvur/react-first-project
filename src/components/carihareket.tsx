import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Space,
    Spin,
    Table,
    Tag,DatePicker
  } from "antd";
  import React, { useState } from "react";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { AppState } from "../store";
  import {useParams,BrowserRouter} from "react-router-dom"
  import {
    addCarihareket,
   // addCarihareket,
    deleteCarihareket,
    getCariharekets,
    getdetayCariharekets,
    //updateCarihareket,
  } from "../store/actions/carihareketActions";
  import { Carihareket, CarihareketForm } from "../types/carihareket";
  //import { SketchPicker } from "react-color";
  import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
  import { Mode } from "../types/general";
  import { Link, useHistory } from "react-router-dom";
import api from "../utils/api";


  function Cariharekets() {
    //const { data, loading, error } = useSelector(
   //   (state: AppState) => state.cariharekets
 //   );
  // const {carininId}:number= useParams()
    const { carininId } = useParams() as { 
      carininId: string;
    }
    const history = useHistory();
//let  date=new Date()

    const emptyForm: CarihareketForm = {
      carHarid: 0,
      cariKod:parseInt(carininId),
      aciklama: "",
      harFlag: 1,
      tutar: 0,
      tarih:"2021-10-10"
      
    };
    const { Option } = Select;
    //ismi sessiondan alma urlden id girince hatalı oluoyr
  
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form, setForm] = useState<CarihareketForm>(emptyForm);
    const [drop, setdrop] = useState("Unvan ile Sorgu");
    const[arama,setarama]=useState("");
    const[ad,setad]=useState("");
    const[tutar,settutar]=useState(0);
    const[yeniaciklama,setyeniaciklama]=useState("");
    const[sorguacik,setsorguacik]=useState(false);
    const[arandimi,setarandimi]=useState(false);
    const[hardata,sethardata]=useState<Carihareket[]>([]);
    const[sorgudata,setsorgudata]=useState<Carihareket[]>([]);
    const [acikla, setacikla] = useState("bos");
    const handleChange = (event:any) => {
      setdrop(event.target.value)
    }
    const handleyeniacikl = (event:any) => {
      setyeniaciklama(event.target.value)
    }
    const handletutar = (event:any) => {
      settutar(event.target.value)
    }
    const onsorgu = (event:any) => {
      setsorguacik(!sorguacik);
    }

    const showModal = () => {
      
      setIsModalVisible(true);

    };
    const postList=async (form:any)=> {
      const response = await api().post<Carihareket[]>("https://localhost:44338/api/carhars",form);
    }
    
    const handleOk = () => {
      console.log(form.tarih)
postList(form)
     sethardata([...hardata,form]);
      setIsModalVisible(false);
      setForm(emptyForm);
      if(form.harFlag==1||form.harFlag==4){
        settopborc(topborc+form.tutar)
      }
      else{
        settopala(topala+form.tutar)
      }
      //else if (mode === "edit" && typeof updateId === "number")
     //   dispatch(updateCarikart(form, updateId));
     // else

    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setForm(emptyForm);

    };
    const [date, setdate] = useState("");
    function onChange(d:any) {
      setdate(d);
      // return dateString;
     // console.log("vvv");
     }
    /*const handlearama = (event:any) => {
      dispatch(getUnvanCarikarts(event.target.value));
       // setarama(event.target.value)
      }*/
    const columns = [
      {
        title: "Tarih",
        dataIndex: "tarih",
        key: "tarih",
        render: ((date:string) => date.substring(0,10))
      },
      {
        title: "Tür",
        dataIndex: "harFlag",
        key: "cariUnharFlagvani",
        render: ((tur:number) => tur==1?"Borç Dekontu":tur==2?"Tahsilat":tur==3?"Alacak Dekontu":"Ödeme")
      },
      {
        title: "Açıklama",
        dataIndex: "aciklama",
        key: "aciklama",
      },  {
        title: "Tutar",
        dataIndex: "tutar",
        key: "tutar",
      },
  
    ];
  

    const aciklamafonk = (event:any) => {
  setacikla(event.target.value)
 
      }
    const dispatch = useDispatch();
    const [basl, setbasl] = useState("");
    const [bitis, setbitis] = useState("");
    const [topborc, settopborc] = useState(0);
    const [topala, settopala] = useState(0);
    function onChangebasl(d:any) {
      console.log(bitis)
      setbasl(d.format('YYYY-MM-DD'));
      // return dateString;
     // console.log("vvv");
     }
     function onChangebitis(d:any) {
       console.log("dssdsd")
      setbitis(d.format('YYYY-MM-DD'));
      // return dateString;
     // console.log("vvv");
     }
     async function buttonsorgula(e:any) {
    //  e.preventDefault();
      console.log('You clicked submit.');
      console.log(basl)
  await getsorgu(parseInt(carininId),basl,bitis,acikla);
      setarandimi(true);
    }
     

    useEffect(() => {
    var  lsad= localStorage.getItem("unvan");
    setad(lsad??"bb");
   //   dispatch(getdetayCariharekets(parseInt(carininId)));
   getList(parseInt(carininId)).then((veri) => {
    sethardata(veri);
    let topbo = 0
  let topal = 0
  for(let i = 0 ; i < veri.length ; i++)
  {
    if(veri[i].harFlag==1||veri[i].harFlag==4){
      topbo=topbo+ veri[i].tutar
    }else{
      topal=topal+ veri[i].tutar
    }
   // valueAdded += count
  }
  settopborc(topbo);
  settopala(topal);
})
.catch((error) => {
    console.log(error);
})
    }, []);
    const getList=async (id:number)=> {
      const response = await api().get<Carihareket[]>("https://localhost:44338/api/carhars/c/"+id);
      return response.data;
    }
    const getsorgu=async (id:number,ilk:string,son:string,aciklama:string)=> {
      const response = await api().get<Carihareket[]>("https://localhost:44338/api/Carhars/s/"+id+"/"+0+"/"+ilk+"/"+son+"/"+aciklama);
    //  return response.data;
    setsorgudata(response.data);
    }
    return (
      <React.Fragment>
           <div style={{display: "flex"}}>
    


    <div> <button style={{color:"red",marginLeft:"15px" }} onClick={onsorgu} >
  { sorguacik==false?"Sorguyu aç":"Sorguyu kapat"} </button></div>
        <div style={{}}> 
       <h2 style={{marginLeft:"15px"}}>{ad}</h2>
       </div>
     
    </div>
    {sorguacik==false?<h1></h1>: <>
    
      <div style={{display: "flex" ,borderStyle:"groove",padding:"10px",margin:"10px"}}>
    

    <div>
    <Form.Item label="Başl Tarihi Tarihi">
                <DatePicker  onChange={onChangebasl} />
                </Form.Item>
                <Form.Item label="Bitiş Tarihi">
                <DatePicker style={{marginLeft:"35px"}} onChange={onChangebitis} />
                </Form.Item>
    </div>
    <div>
<form  style={{padding: "0px",marginLeft:"20px",marginTop:"5px"}}>
      <label>Açıklama :
        <input style={{marginLeft:"5px"}} type="text" onChange={aciklamafonk} />
      </label>
    </form>
</div>
<div> <button onClick={buttonsorgula} style={{color:"blue",marginLeft:"20px",marginTop:"5px"}} >
    Sorgula</button></div>
    

</div>
    </>
    


    }


<Modal
            title={
            "Cari Hareket Ekle"
            }
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          //  okButtonProps={{ disabled: !(mode === "delete") && !form.cariKodu }}
          > (
              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Cari Hesap">
                  <Input
                    name="cariUnvan"
                    value={carininId} disabled
                //   onChange={(e) => setForm({ ...form, notlar:e.target.value })}
                  />
                </Form.Item>
                
                <Form.Item label="Açıklama">
                  <Input
                    name="aciklama"
                    value={form.aciklama}
                    onChange={(e) => setForm({ ...form, aciklama: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Tutar">
                  <Input type="number"
                    name="tutar"
                    value={form.tutar}
                    onChange={(e) => setForm({ ...form, tutar:parseInt(e.target.value) })}
                  />
                  <Form.Item label="">
                  <Select onChange={(e:string) => setForm({ ...form, harFlag:e=="Tahsilat yap"?2:e=="Hesaba borç ekle"?1:e=="Hesaba alacak ekle"?3:4 })}
                   defaultValue="Hesaba borç ekle" style={{ width: 315,marginTop:20 }} >
      <Option value="Tahsilat yap">Tahsilat yap</Option>
      <Option value="Hesaba borç ekle">Hesaba borç ekle</Option>
      <Option value="Hesaba alacak ekle">Hesaba alacak ekle</Option>
      <Option value="Ödeme yap">Ödeme yap</Option>
    </Select>
                  </Form.Item>
               
                </Form.Item>
                <Form.Item label="Tarih">
                <DatePicker  onChange={(e:any) =>setForm({ ...form, tarih:e as string })}
                  />
                </Form.Item>
             
                
                
                
         
              </Form>
            ) 
           
          </Modal>
        <Table
       /*   onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                let path = `/cariharekets/${record.cariKodu}`; 
                history.push(path);
            
                console.log("tiklandiii "+record.cariUnvani);
              }, // click row
            };
          }}*/
        //  loading={loading}
          columns={columns}
          dataSource={arandimi!=true? hardata:sorgudata}
          rowKey="id"
        />
        <div style={{display: "flex" }}>
    


<div style={{marginLeft:"10px"}} > <button onClick={() => showModal()} style={{color:"red",padding: "20px",height:"20px",marginRight:"25px" }} >
    Ekle</button></div>
    <div style={{marginTop:"10px"}}> 
   <h2>Bulunan kayıt {hardata.length}</h2>
   </div>
   <div>

   <form >
  <label  style={{marginLeft:"10px"}} >
    Toplam Alacak:
    <input style={{marginLeft:"5px",marginTop:"15px"}} readOnly type="text" name="name"  value={topala} disabled />
  </label>
  <label style={{marginLeft:"10px"}} >
    Toplam Borç:
    <input style={{marginLeft:"5px"}}  readOnly type="text" name="name" value={topborc} disabled />
  </label>
  <label style={{marginLeft:"10px"}} >
    Bakiye:
    <input style={{marginLeft:"5px"}}  readOnly type="text" name="name" value={topborc-topala} disabled />
  </label>
</form>
   </div>
   <div> <button onClick={() => history.goBack()} style={{color:"orange",padding: "20px",height:"20px",marginLeft:"20px" }} >
    Geri</button></div>
</div>
      </React.Fragment>
    );
  }
  export default Cariharekets;

 
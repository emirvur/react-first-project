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
  import {
    addCarikart,
    deleteCarikart,
    ge,
    getCarikarts,
    getUnvanCarikarts,
   // updateCarikart,
  } from "../store/actions/carikartActions";
  import { Carikart, CarikartForm } from "../types/carikart";
  //import { SketchPicker } from "react-color";
  import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
  import { Mode } from "../types/general";
  import { Link, useHistory } from "react-router-dom";
import ReactPDF from "@react-pdf/renderer";
import { pdf,Page, Text, View, Document, StyleSheet,PDFViewer  } from '@react-pdf/renderer';
//-yazdır-sil tusu aktif-hareket state mang.
  const emptyForm: CarikartForm = {
    cariKodu: 0,
    cariUnvani: "",
    telefon: "",
    adres: "",
    ilce: "",
    vergino: "",
    aktifMi: 1,
    notlar: "",
    toplamAlacak: 0,
    toplamBorc: 0,
    acilisTarih:"2021-09-02T13:57:00",
    sonIslemTarih: "2021-09-02T13:57:00"
  };

  function Carikarts() {
    const { data, loading, error } = useSelector(
      (state: AppState) => state.carikarts
    );
    const history = useHistory();

    /*const routeChange = () =>{ 
      let path = `/reports/reports2`; 
      history.push(path);
    }*/

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [mode, setMode] = useState<Mode>("new");
    const [form, setForm] = useState<CarikartForm>(emptyForm);
    const [updateId, setUpdateId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [date, setdate] = useState("");
    const [silisareti, setsilisareti] = useState(false);
  
    const showModal = (mode: Mode) => {
      console.log("shownoldeaal"+mode)
      if(mode=="topla"){
        let topbo = 0
        let topal = 0
        for(let i = 0 ; i < data.length ; i++)
        {
        
            topbo=topbo+ data[i].toplamBorc??0
        
            topal=topal+ data[i].toplamAlacak??0
       
        }
        settopborc(topbo);
        settopala(topal);
      }
      setMode(mode);
      setIsModalVisible(true);
     
      console.log(silisareti+"dsffsd");

    };
  
    const handleOk = () => {
      setsilisareti(false);
      // Mode degerine gore create or update action creator fonksiyonu cagir
      if (mode === "new") {dispatch(addCarikart(form));
      setIsModalVisible(false);
      setMode("new");
      setForm(emptyForm);}
      //else if (mode === "edit" && typeof updateId === "number")
     //   dispatch(updateCarikart(form, updateId));
     // else
     else if (mode === "delete" && typeof deleteId === "number"){
      dispatch(deleteCarikart(deleteId));
      setIsModalVisible(false);
      setMode("new");
      setForm(emptyForm);
     }
     
    //  setUpdateId(null);
    };
    const handlesil=(id:number)=>{
      setsilisareti(true);
      console.log("sonvv"+silisareti);
              //  console.log("delete"+Carikart.cariKodu);
      showModal("delete");
      setDeleteId(id);
    }
  
    const handleCancel = () => {
      setIsModalVisible(false);
      setMode("new");
      setForm(emptyForm);
      setUpdateId(null);
      setDeleteId(null);
      setsilisareti(false);
    };
  
    function timeout(delay: number) {
      return new Promise( res => setTimeout(res, delay) );
  }
    const [drop, setdrop] = useState("Unvan ile Sorgu");
    const[arama,setarama]=useState("");

    const handleChange = (event:any) => {
      setdrop(event.target.value)
    }
    const handlearama = (event:any) => {
      dispatch(drop=="İlçe ile Sorgu"? ge(event.target.value): getUnvanCarikarts(event.target.value));
       // setarama(event.target.value)
      }
    const columns = [
      {
        title: "cariKodu",
        dataIndex: "cariKodu",
        key: "cariKodu",
      },
      {
        title: "cariUnvani",
        dataIndex: "cariUnvani",
        key: "cariUnvani",
        //render: (text: string, Carikart: Carikart) => {
      //    return <Tag color={Carikart}>{text.toUpperCase()}</Tag>;
    //    },
      },
      {
        title: "Son İşlem",
        dataIndex: "sonIslemTarih",
        key: "sonIslemTarih",
        render: ((date:string) => date.substring(0,10))
      },  {
        title: "Toplam Borç",
        dataIndex: "toplamBorc",
        key: "toplamBorc",
      },
      {
        title: "Toplam Alacak",
        dataIndex: "toplamAlacak",
        key: "toplamAlacak",
      },
      {
        title: "Eylem",
        dataIndex: "id",
        key: "id",
        render: (text: string, Carikart: Carikart) => (
          <Space size="middle">
         
            <DeleteOutlined
              style={{ color: "#c20808" }}
              onClick={ (e:any) => {
               //  setsilisareti(true)
          e.stopPropagation();
   handlesil(Carikart.cariKodu)
   console.log("handlesildeee")
              }}
            />
          </Space>
        ),
      },
    ];
    const [topborc, settopborc] = useState(0);
    const [topala, settopala] = useState(0);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCarikarts());
    
    }, []);
  
    function onChange(d:any) {
     setdate(d);
     // return dateString;
    // console.log("vvv");
    }
    /*useEffect(() => {
      if (silisareti === true) 
      {
          console.log("effectte iff ttruee")
          handlesil(11)
      }
      else 
      {
        console.log("effectte iff falssee")

      }
  }, [!silisareti])*/


    async function yazdir() {
      //ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
      await savePdf(<MyDocument/>, "ekstre.pdf")
    //  ReactPDF.renderToStream(<MyDocument />);
     }
     const saveBlob = (blob:any, filename:any) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    };
    
     const savePdf = async (document:any, filename:any) => {
      saveBlob(await pdf(document).toBlob(), filename);
    };

    const styles = StyleSheet.create({
      page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
      },
      section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
      }
    });
    
    // Create Document Component
    const MyDocument = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Test Pdfsidir</Text>
          </View>
          <View style={styles.section}>
            <Text>Yakinda gerçek veriler eklenecek</Text>
          </View>
        </Page>
      </Document>
    );
    

    return (
     
      <React.Fragment>
<div style={{display: "flex",
justifyContent:"space-between"}}>
    
<div style={{display: "flex",
}}>

<div >
    <form className='dropcl ' >
      <label style={{marginRight:"5px"}}>Sorgu: </label>
      <select  style={{padding: "10px"}}  value={drop} onChange={handleChange}>
        <option value="Unvan ile Sorgu">Unvan ile Sorgu</option>
        <option value="İlçe ile Sorgu">İlçe ile Sorgu</option>
      </select>
    </form>
    </div>
    <div>
<form  style={{padding: "1px"}}>
      <label style={{marginLeft:"20px",marginRight:"20px"}}>{drop=="Unvan ile Sorgu"?"Unvan:":"İlçe"}
        <input style={{marginLeft:"10px",width:"350px",height:"40px"}}  type="text" onChange={handlearama} />
      </label>
    </form>
</div>

</div>
  <div style={{display: "flex",
}}>

  <div style={{marginRight:"20px"}}> <button onClick={() => showModal("topla")}
   style={{color:"red",padding: "20px",height:"20px" ,marginBottom:"10px"

}} >
   Topla</button></div>
   <div style={{marginLeft:"10px"}}> 
   <button  onClick={() => yazdir()}   
    style={{color:"green",padding: "20px",height:"20px" ,marginBottom:"10px"}} >
   Yazdır</button></div>
</div>
  </div>

<Modal
            title={
              mode === "new"
                ? "Cari Kart Ekle"
                : mode === "topla"
                ? "Toplam Bilgileri"
                : "Carikart Silme"
            }
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          //  okButtonProps={{ disabled: !(mode === "delete") && !form.cariKodu }}
          >
            {mode === "edit" || mode === "new" ? (
              <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="Cari Unvani">
                  <Input
                    name="cariUnvan"
                    value={form.cariUnvani}
                    onChange={(e) => setForm({ ...form, cariUnvani: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Telefon">
                  <Input
                    name="telefon"
                    value={form.telefon}
                    onChange={(e) => setForm({ ...form, telefon: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Ilce">
                  <Input
                    name="ilce"
                    value={form.ilce}
                    onChange={(e) => setForm({ ...form, ilce: e.target.value })}
                  />
                </Form.Item>
                
                <Form.Item label="Adres">
                  <Input
                    name="adres"
                    value={form.adres}
                    onChange={(e) => setForm({ ...form, adres: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Vergi No">
                  <Input
                    name="vergino"
                    value={form.vergino}
                    onChange={(e) => setForm({ ...form, vergino: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Toplam Alacak">
                  <Input
                    name="toplamAlacak"
                    value={form.toplamAlacak}
                    onChange={(e) => setForm({ ...form, toplamAlacak: parseFloat(e.target.value) })}
                  />
                </Form.Item>
                <Form.Item label="Toplam Borc">
                  <Input
                    name="toplamBorc"
                    value={form.toplamBorc}
                    onChange={(e) => setForm({ ...form, toplamBorc: parseFloat(e.target.value) })}
                  />
                </Form.Item>
                <Form.Item label="Açılış Tarihi">
                <DatePicker  onChange={onChange} />
                </Form.Item>
                <Form.Item label="Notlar">
                  <Input
                    name="notlar"
                    value={form.notlar}
                    onChange={(e) => setForm({ ...form, notlar:e.target.value })}
                  />
                </Form.Item>
                
                
                
         
              </Form>
            ) : mode === "delete" ? (
              <>Emin misiniz?</>
            ) : 
            <div>
      <h3>Toplam Borç:{topborc}</h3>
      <h3>Toplam Alacak:{topala}</h3>
            </div>
           }
          </Modal>
        <Table

        
          onRow= {(record, rowIndex) => {
            return {
              onClick:
              silisareti==true?
              event => {
              
                //  setsilisareti(true)
  
                  console.log("ilkk"+silisareti);
                
                //  silisareti==true?console.log("silisarti truee"):
              //    console.log("rrrr "+record.cariUnvani);
                  //localStorage.setItem("unvan",record.cariUnvani);
                // let path = `/cariharekets/${record.cariKodu}`; 
               //   history.push(path);
              
                
                }:
              event => {
              
              //  setsilisareti(true)

              //  console.log("ilkk"+silisareti);
              
         //       silisareti==true?console.log("silisarti truee"):
                console.log("rrrr "+record.cariUnvani);
                localStorage.setItem("unvan",record.cariUnvani);
               let path = `/cariharekets/${record.cariKodu}`; 
                history.push(path);
            
              
              }, // click row
            };
          }}
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
        <div style={{display: "flex"}}>
    


<div style={{marginLeft:"10px"}}> <button onClick={() => showModal("new")} style={{color:"red",padding: "20px",height:"20px",marginRight:"25px" }} >
    Ekle</button></div>
    <div style={{marginTop:"10px"}}> 
   <h2>Bulunan kayıt {data.length}</h2>
   </div>
</div>
      </React.Fragment>
    );
  }
  
  export default Carikarts;


  
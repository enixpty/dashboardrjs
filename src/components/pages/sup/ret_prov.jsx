import React, { Component } from "react";
import Moment from "moment"; 
import logo from "../../assets/media/implosa.png";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import Cargar from "../../helpers/cargar";
const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    width: "100%",
    orientation: "landscape",
    margin: "8px",
  },
  title2: {
    fontSize: 18,
    fontFamily: "Times-Roman",
    marginLeft: "2%",
  },
  title3: {
    fontSize: 18,
    fontFamily: "Times-Roman",
    marginLeft: "20%",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Roman",
    font: "ultabold",
    marginLeft: "5%",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    margin: 12,
    fontFamily: "Times-Roman",
  },
  textleft: {
    margin: 10,
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  text: {
    margin: 10,
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  textFirm: {
    margin: 12,
    fontSize: 11,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    width: 200,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  tabledetail: {
    display: "table",
    width: "80%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    margin: 3,
  },
  tableRow: {
    margin: "0px",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  textright: {
    textAlign: "right",
  },
  tableCellBold: {
    margin: "2px",
    marginTop: 2,
    fontSize: 10,
    fontFamily: "Times-Bold",
    textAlign: "right",
  },
  tableCell: {
    margin: "2px",
    marginTop: 2,
    fontSize: 10,
  },
  tableCellLeft: {
    margin: "2px",
    marginTop: 2,
    fontSize: 10,
    textAlign: "right",
  },
  obj: {
    marginLeft: "35%",
  },
  page: {
    position: "fixed",
    height: "100%",
    width: "100%",
  },
});

const TipoSoc = () => (
  <View style={styles.tableRow}>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>
        <Text style={styles.textright}>Tipo de Sociedad :</Text>
      </Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>Anónima </Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}> </Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}> </Text>
    </View>
  </View>
);
const TituloRepo = () => (
  <View>
    <Text style={styles.title3}>Importadora de Plomeria S.A.</Text>
    <Text style={styles.title2}>
      Certificado de Retenciones de Ibtms Realizadas en
    </Text>
    <Text style={styles.title3}>El Mes De Marzo del Año 2020</Text>
  </View>
);
const TextRuc = () => (
  <View style={styles.tableRow}>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>
        <Text style={styles.textright}>Ruc :</Text>
      </Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>510-302-109858 DV : 49 </Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>
        <Text style={styles.textright}>Fecha :</Text>
      </Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCell}>{Moment().format("DD/MM/YYYY")}</Text>
    </View>
  </View>
);
const TextFirmaRep = () => (
  <Text style={styles.textFirm}>
    Firma del rep. Legal o su equivalen que recibe la retencion (IMPLOSA)
  </Text>
);
const TextFirmaNot = () => (
  <Text style={styles.textFirm}>
    Firma del Notificado de Retención de Itbm/(Proveedor)
  </Text>
);

const TextDetail = () => (
  <View style={styles.tableRow}>
    <View style={styles.tableCol}>
      <Text style={styles.tableCellBold}>Factura</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCellBold}>Valor</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCellBold}>Itbms</Text>
    </View>
    <View style={styles.tableCol}>
      <Text style={styles.tableCellBold}>Itbms Ret</Text>
    </View>
  </View>
);
class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataDetails: [],
      Enc: [],
    };
  }
  async componentDidMount() {
    try {
      const data = {
        cod: this.props.match.params.cod,
        per: this.props.match.params.anio,
        mes: this.props.match.params.mes,
        nom_mes: this.props.match.params.nmes,
      };
      const requestinfo = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          Content_Type: "application/json",
        }),
      };
      await fetch("http://www.implosa.com:5000/acc/gnrc", requestinfo)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((datos) => {
          // console.log(datos)
          let data = [];
          let totvalor = 0;
          let totitbm = 0;
          let totret = 0;
          let i = 0;
          datos.map(function (obj, index) {
            if (i === 0) {
              data.push(obj[0]);
              data.push(obj[1]);
              data.push(obj[2]);
              data.push(obj[3]);
              data.push(obj[8]);
              data.push(obj[9]);
            }
            i = i + 1;
            totvalor = totvalor + parseFloat(obj[7]);
            totitbm = totitbm + parseFloat(obj[5]);
            totret = totret + parseFloat(obj[6]);
            return null;
          });
          data.push(totvalor.toFixed(2));
          data.push(totitbm.toFixed(2));
          data.push(totret.toFixed(2));
          this.setState({
            Enc: data,
            dataDetails: datos,
            loading: false,
          });
        });

      return null;
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    //console.log( this.state.dataDetails.length  )
    let lineas = this.state.dataDetails.length / 10;
    // console.log(lineas)
    let numpage1 = [];
    let numpage2 = [];
    let numpage3 = [];
    let numpage4 = [];
    let numpage5 = [];
    let numpage6 = [];
    let numpage7 = [];
    let numpage8 = [];
    let numpage9 = [];
    let numpage10 = [];
    let nump = [];
    let nump2 = [];
    let nump3 = [];
    let nump4 = [];
    let nump5 = [];
    let nump6 = [];
    let nump7 = [];
    let nump8 = [];
    let nump9 = [];
    let nump10 = [];
    if (lineas < 1 || lineas === 1) {
      nump.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
    } else if (lineas < 2 || lineas === 2) {
      nump.push(1);
      nump2.push(1);
      console.log(nump2[0]);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
    } else if (lineas < 3 || lineas === 3) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
    } else if (lineas < 4 || lineas === 4) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
    } else if (lineas < 5 || lineas === 5) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      nump5.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
      numpage5 = this.state.dataDetails.slice(41, 50);
    } else if (lineas < 6 || lineas === 6) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      nump5.push(1);
      nump6.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
      numpage5 = this.state.dataDetails.slice(41, 50);
      numpage6 = this.state.dataDetails.slice(51, 60);
    } else if (lineas < 7 || lineas === 7) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      nump5.push(1);
      nump6.push(1);
      nump7.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
      numpage5 = this.state.dataDetails.slice(41, 50);
      numpage6 = this.state.dataDetails.slice(51, 60);
      numpage7 = this.state.dataDetails.slice(61, 70);
    } else if (lineas < 8 || lineas === 8) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      nump5.push(1);
      nump6.push(1);
      nump7.push(1);
      nump8.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
      numpage5 = this.state.dataDetails.slice(41, 50);
      numpage6 = this.state.dataDetails.slice(51, 60);
      numpage7 = this.state.dataDetails.slice(61, 70);
      numpage8 = this.state.dataDetails.slice(71, 80);
    } else if (lineas < 9 || lineas === 9) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      nump5.push(1);
      nump6.push(1);
      nump7.push(1);
      nump8.push(1);
      nump9.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
      numpage5 = this.state.dataDetails.slice(41, 50);
      numpage6 = this.state.dataDetails.slice(51, 60);
      numpage7 = this.state.dataDetails.slice(61, 70);
      numpage8 = this.state.dataDetails.slice(71, 80);
      numpage9 = this.state.dataDetails.slice(81, 90);
    } else if (lineas < 10 || lineas === 10) {
      nump.push(1);
      nump2.push(1);
      nump3.push(1);
      nump4.push(1);
      nump5.push(1);
      nump6.push(1);
      nump7.push(1);
      nump8.push(1);
      nump9.push(1);
      nump10.push(1);
      numpage1 = this.state.dataDetails.slice(0, 10);
      numpage2 = this.state.dataDetails.slice(11, 20);
      numpage3 = this.state.dataDetails.slice(21, 30);
      numpage4 = this.state.dataDetails.slice(31, 40);
      numpage5 = this.state.dataDetails.slice(41, 50);
      numpage6 = this.state.dataDetails.slice(51, 60);
      numpage7 = this.state.dataDetails.slice(61, 70);
      numpage8 = this.state.dataDetails.slice(71, 80);
      numpage9 = this.state.dataDetails.slice(81, 90);
      numpage10 = this.state.dataDetails.slice(91, 100);
    }

    if (this.state.loading === true) {
      return (
        <div>
          <Cargar />
        </div>
      );
    }

    return (
      <div style={{ width: "100%", height: "100%" }}>
        {/*   {width:'100%', height:'600px'} */}
        <PDFViewer style={styles.page}>
          <Document>
            {nump.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage1.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}
                    {numpage2.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellLeft}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 2 si existe  */}
            {nump2.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage2.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {numpage3.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 3 si existe  */}
            {nump3.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage3.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {numpage4.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 4 si existe  */}
            {nump4.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage4.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {numpage5.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 5 si existe  */}
            {nump5.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage5.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Total</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[6]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[7]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 6 si existe  */}
            {nump6.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage6.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}
                    {numpage6.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellLeft}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 7 si existe  */}
            {nump7.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage7.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {numpage8.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 8 si existe  */}
            {nump8.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage8.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {numpage9.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 9 si existe  */}
            {nump9.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage9.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    {numpage10.length < 1 ? (
                      <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>Total</Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[6]}{" "}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text style={styles.tableCellBold}>
                            {this.state.Enc[8]}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
            {/* pagina 10 si existe  */}
            {nump10.map((page1) => (
              <Page orientation="landscape">
                <View style={styles.body}>
                  <Image style={styles.image} src={logo} />
                  <TituloRepo />
                </View>
                <View style={styles.body}>
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Agente de Retencion de Itbms :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Importadora de Plomería, S.A.
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Certificado No. :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[0]}
                        </Text>
                      </View>
                    </View>
                    <TextRuc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Tipo de Declarante :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Persona Juridica</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Hora :</Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {Moment().format("LT")}
                        </Text>
                      </View>
                    </View>
                    <TipoSoc />
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>A Favor de : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Código de Proveedor :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[4]}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Nombre : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[3]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>
                            Fecha de Elaboración :{" "}
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {Moment(this.state.Enc[5]).format("DD/MM/YYYY")}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textright}>Céd o Ruc : </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {" "}
                          {this.state.Enc[1]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          Dv : {this.state.Enc[2]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}>
                            Detalle del Retenido :
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}></Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          <Text style={styles.textleft}> </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <TextDetail />
                    {numpage5.map((item, index) => (
                      <View style={styles.tableRow} key={Math.random()}>
                        <View style={styles.tableCol} key={Math.random()}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[4]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[7]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[5]}
                          </Text>
                        </View>
                        <View style={styles.tableCol}>
                          <Text
                            style={styles.tableCellLeft}
                            key={Math.random()}
                          >
                            {item[6]}
                          </Text>
                        </View>
                      </View>
                    ))}

                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Total</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[6]}{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[7]}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaRep />

                <View style={styles.obj}>
                  <View style={styles.tabledetail}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}> </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          Monto de Retención :{" "}
                        </Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCellBold}>
                          {this.state.Enc[8]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <TextFirmaNot />

                <Text
                  style={styles.pageNumber}
                  render={({ pageNumber, totalPages }) =>
                    `${pageNumber} / ${totalPages}`
                  }
                  fixed
                />
              </Page>
            ))}
          </Document>
        </PDFViewer>
      </div>
    );
  }
}

export default App;

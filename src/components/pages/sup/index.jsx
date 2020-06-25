import React, { Component } from "react";
import "../../assets/font-awesome/4.5.0/css/font-awesome.min.css";
import "../../assets/css/fonts.googleapis.com.css";
import "../../assets/css/main.css";
// Basic component
import SideBar from "../../helpers/sidebar";
import Header from "../../helpers/header";
import PiePagina from "../../helpers/footer";
import Cargar from "../../helpers/cargar";
import { Redirect } from "react-router-dom";
// imagenes cards
import "bootstrap/dist/css/bootstrap.min.css";
import vta from "../../assets/media/vta.svg";
// componentes de la pagina de proyectos
//others components
import { Link } from "react-router-dom";
import { Row, Col, Table, Card, CardBody, CardTitle, Button } from "reactstrap";

class index extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      cod: null,
      username: null,
      datalist: <tr></tr>,
      monto: 0,
      auth: false,
      expanded: false,
      modal: false,
      unmountOnClose: false,
      nmes: null,
      nanio: null,
      codig: null,
      pic: null,
    };
    this.handlerList = this.handlerList.bind(this);
    this.format_USD = this.format_USD.bind(this);
    this.expand = this.expand.bind(this);
  }
  OpenWindow(mes, anio, cod, nom) {
    alert(mes + " " + anio + " " + cod);
    window.open("repo/" + mes + "/" + nom + "/" + anio + "/" + cod, "_blank");
    /*  this.setState({ 
            modal : true,
            nmes  : mes,
            nanio : anio,
            codig : cod, 
        
        }) */
  }
  async componentDidMount() {
    // let URLactual = window.location.href;
    //console.log(URLactual)
    const token = localStorage.getItem("token");
    await fetch("http://www.implosa.com:5000/acc/protected", {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error();
      })
      .then((user) => {
        //console.log(user);
        localStorage.setItem("token", user[1]);
        this.setState({
          username: user[0][0],
          cod: user[0][1],
          pic: user[0][4],
        });
      })
      .catch((e) => {
        //console.log(e)
        //  console.log('aqui redireccionar')
        localStorage.clear();
      });
    // console.log('token : ' +token)
    this.handlerList();
  }
  format_USD = (val) => {
    return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  expand(exp) {
    if (exp) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  }
  handleOpen(exp) {
    this.setState({ modal: true });
  }
  async handlerList() {
    const data = { cod: this.state.cod };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    };

    await fetch("http://www.implosa.com:5000/acc/lstret", requestInfo)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data)
        //this.state.cod
        let fila = [];
        let nTotal = 0;
        let i = 0;
        data.map((datalist) => {
          i += 1;
          nTotal += datalist[4]; // onClick={() => this.OpenWindow(datalist[1], datalist[0],datalist[2],this.state.cod)}
          fila.push(
            <tr key={Math.random() + index}>
              <th>{i}</th>
              <td align="center">{datalist[0]}</td>
              <td align="center">{datalist[2]}</td>
              <td align="right">{this.format_USD(datalist[4])}</td>
              <td align="center"> {datalist[3]}</td>
              <td>
                <Link
                  to={{
                    pathname:
                      "/repo/" +
                      datalist[1] +
                      "/" +
                      datalist[0] +
                      "/" +
                      datalist[2] +
                      "/" +
                      this.state.cod,
                  }}
                  target="_blank"
                >
                  <Button color="primary" size="sm">
                    Generar
                  </Button>
                </Link>
              </td>
            </tr>
          );
          return null;
        });
        this.setState({
          datalist: fila,
          loading: false,
          monto: nTotal,
        });
      });
    document.title = "SIC - Portal de Proveedores";
  }
  render() {
    document.title = "SIC - Portal de Proveedores";

    if (this.state.loading === true) {
      return (
        <div>
          <Cargar />
        </div>
      );
    }

    if (localStorage.getItem("token") === null) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        {" "}
        <Header logo={this.state.pic} username={this.state.username} />
        <div id="container">
          <SideBar
            id="sidebar"
            expand={this.expand}
            usu={localStorage.getItem("usu")}
          />

          <div
            style={{
              marginLeft: this.state.expanded ? 240 : 0,
              padding: "15px 20px 0 20px",
            }}
          >
            <div id="UserInfo">
              <div id="nav">
                <div className="sc-bdVaJa bWcVOO">
                  <br />
                  <Row>
                    <Col md={6} xl={4} md={{ span: 1, offset: 1 }}>
                      <div style={{ width: "19 rem" }}>
                        <Card className="card-stats mb-4 mb-lg-0 shadow card">
                          <CardBody>
                            <Row>
                              <div className="col" style={{ width: "50px" }}>
                                <CardTitle className="text-uppercase text-muted mb-0">
                                  Total de Retenciones
                                </CardTitle>
                                <span className="h2 font-weight-bold mb-0">
                                  {this.format_USD(this.state.monto)}
                                </span>
                              </div>
                              <Col className="col-auto">
                                {/* <img src={this.props.imag}   /> */}
                                <div className="icon icon-shape bg-white text-white top-right">
                                  <img
                                    alt="imagen"
                                    src={vta}
                                    className="card_img"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-muted text-sm"></p>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                    <Col xl={4} md={6} md={{ span: 1, offset: 1 }}>
                      <div className="alert alert-info shadow" role="alert">
                        <b>¡Aviso Importante!</b> Solo se mostraran los ultimos
                        6 meses de retenciones generadas, Si se requiere
                        retenciones previas a este termino favor comunicarse al
                        depto. de Contabilidad.
                      </div>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Card className="card-stats mb-4 mb-lg-0 shadow card">
                        <Table responsive style={{ backgroundColor: "white" }}>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>
                                <center>Mes</center>
                              </th>
                              <th>
                                <center>Periodo</center>
                              </th>
                              <th>
                                <center>Monto </center>
                              </th>
                              <th>
                                <center># Facturas</center>
                              </th>
                              <th> </th>
                            </tr>
                          </thead>
                          <tbody>{this.state.datalist}</tbody>
                        </Table>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PiePagina />
      </div>
    );
  }
}

export default index;

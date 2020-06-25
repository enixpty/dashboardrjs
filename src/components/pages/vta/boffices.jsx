import React, { Component } from "react";
import "../../assets/font-awesome/4.5.0/css/font-awesome.min.css";
import "../../assets/css/fonts.googleapis.com.css";
// Basic component
import SideBar from "../../helpers/sidebar";
import Header from "../../helpers/header";
import Cargar from "../../helpers/cargar";
import PiePagina from "../../helpers/footer";

// componentes de la pagina de proyectos
import MUIDataTable from "mui-datatables";
import Liquid from "../../helpers/Liguid";
import Graph from "../../helpers/graph";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Container,
  CardTitle,
} from "reactstrap";
class branchOfic extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataMeta: [],
      dataCat: [],
      dataVent: [],
      pic: null,
      expanded: false,
      options: {
        responsive: "scroll",
        viewColumns: false,
        rowsPerPage: 3,
        selectableRowsHeader: false,
        selectableRows: false,
        rowsPerPageOptions: [3, 6, 9],
      },
      columns: ["Cod.", "Vendedor", "Monto"],
    };
    this.handlerMetas = this.handlerMetas.bind(this);
    this.handlerCat = this.handlerCat.bind(this);
    this.handlerVend = this.handlerVend.bind(this);
    this.expand = this.expand.bind(this);
  }
  expand(exp) {
    if (exp) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  }
  async handlerVend() {
    await fetch("http://implosa.com:5000/vta/svcsvt")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error!  :(");
      })
      .then((data) => {
        //console.log(data)

        this.setState({
          dataVent: data,
        });
      })
      .catch((e) => console.log(e));
  }

  async handlerCat() {
    await fetch("http://implosa.com:5000/vta/svcsc")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error!  :(");
      })
      .then((data) => {
        // console.log(data)

        this.setState({
          dataCat: data,
        });
      })
      .catch((e) => console.log(e));
  }
  async handlerMetas() {
    await fetch("http://implosa.com:5000/vta/svcs")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error!  :(");
      })
      .then((data) => {
        this.setState({
          dataMeta: data,
          loading: false,
        });
      })
      .catch((e) => console.log(e));
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    fetch("http://www.implosa.com:5000/vta/protected", {
      headers: new Headers({ Authorization: `Bearer ${token}` }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("error!  :(");
      })
      .then((user) => {
        localStorage.setItem("token", user[1]);
        this.setState({
          username: user[0][0],
          cod: user[0][2],
          pic: user[0][4],
        });
      })
      .catch((e) => console.log(e));
    //console.log('token : ' +token)
    this.handlerVend();
    this.handlerCat();
    this.handlerMetas();
  }
  render() {
    document.title = "SIC - Sucursales";
    let filas = [];

    if (this.state.loading === true) {
      return (
        <div>
          <Cargar />
        </div>
      );
    }
    return (
      <div>
        <Header logo={this.state.pic} username={this.state.username} />
        <SideBar expand={this.expand} usu={localStorage.getItem("usu")} />
        <div id="container">
          <div
            style={{
              marginLeft: this.state.expanded ? 240 : 0,
              padding: "15px 20px 0 20px",
            }}
          >
            <div id="UserInfo">
              <div id="nav">
                <div className="sc-bdVaJa bWcVOO">
                  {this.state.dataMeta.map((rows, index) => {
                    let SeriesCat = [];
                    let Labeloption = [];
                    let rowtabla = [];
                    this.state.dataVent.map((rowvt) => {
                      if (rows[2] === rowvt[2]) {
                        rowtabla.push([rowvt[3], rowvt[1], rowvt[0]]);
                      }
                      return null;
                    });
                    //console.log(rowtabla)

                    this.state.dataCat.map((rowCat) => {
                      if (rows[2] === rowCat[3]) {
                        SeriesCat.push(rowCat[0]);
                        Labeloption.push(rowCat[2]);
                      }
                      return null;
                    });
                    let options = {
                      chart: {
                        width: 230,
                        type: "pie",
                      },
                      legend: {
                        show: true,
                        position: "bottom",
                      },
                      labels: Labeloption,
                      responsive: [
                        {
                          breakpoint: 250,
                          options: {
                            chart: {
                              width: 50,
                            },
                            legend: {
                              position: "bottom",
                            },
                          },
                        },
                      ],
                    };
                    let porc = Math.round((rows[0] / rows[1]) * 100);
                    filas.push(
                      <Container key={Math.random() + index}>
                        <CardTitle>
                          <i
                            className="fa fa-angle-double-right"
                            style={{ fontSize: "1.75em", color: rows[3] }}
                          >
                            {" "}
                            {rows[4]}
                          </i>
                        </CardTitle>
                        <Row key={Math.random() + index}>
                          <Col key={Math.random() + index} md={6} xl={4}>
                            <Card
                              key={Math.random() + index}
                              className="shadow card"
                            >
                              <CardHeader key={Math.random() + index}>
                                Porcentaje de Ventas Realizadas del Mes{" "}
                              </CardHeader>
                              <CardBody key={Math.random() + index}>
                                <Liquid
                                  key={Math.random() + index}
                                  porcv={porc}
                                  color={rows[3]}
                                  totmet={rows[1]}
                                  totvent={rows[0]}
                                />
                              </CardBody>
                            </Card>
                          </Col>
                          <Col key={Math.random() + index} md={6} xl={4}>
                            <Card
                              key={Math.random() + index}
                              className="shadow card"
                            >
                              <CardHeader key={Math.random() + index}>
                                Ventas por Caterigoria
                              </CardHeader>
                              <CardBody key={Math.random() + index}>
                                <Graph
                                  key={Math.random() + index}
                                  options={options}
                                  series={SeriesCat}
                                  type="pie"
                                  width={230}
                                  heigth={310}
                                />
                              </CardBody>
                            </Card>
                          </Col>
                          <Col key={Math.random() + index} md={6} xl={4}>
                            <MUIDataTable
                              key={Math.random() + index}
                              title={"Ventas por Vendedor"}
                              data={rowtabla}
                              columns={this.state.columns}
                              options={this.state.options}
                            />
                          </Col>
                        </Row>
                      </Container>
                    );
                    filas.push(<br key={Math.random() + index}></br>);
                    return null;
                  })}
                  {filas}
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

export default branchOfic;

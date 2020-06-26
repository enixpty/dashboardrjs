import React, { Component } from "react";
import "../../assets/css/ace.min.css";
import "../../assets/css/ace-skins.min.css";
import "../../assets/css/ace-rtl.min.css";
import "../../assets/font-awesome/4.5.0/css/font-awesome.min.css";
import "../../assets/css/fonts.googleapis.com.css";
import "../../assets/css/main.css";
import { Redirect } from "react-router-dom";
// imagenes cards
import cotiz from "../../assets/media/cot.svg";
import meta from "../../assets/media/meta.svg";
import vta from "../../assets/media/vta.svg";
// Basic components
import SideBar from "../../helpers/sidebar";
import Header from "../../helpers/header";
import Cargar from "../../helpers/cargar";
import PiePagina from "../../helpers/footer";
import formatDate from "../../helpers/formatDate";

//others components
import CardMont from "../../helpers/card_mont";
import Graph from "../../helpers/graph";

import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    let d = new Date();
    this.state = {
      username: "",
      pic: null,
      cod: "",
      dcot: "0.00",
      dvta: "0.00",
      dmta: "0.00",
      dcomp: null,
      loading: true,
      expanded: false,
      optionsVD : {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
        }
      },
      seriesVD: [],
      series: [],
      options: {
        chart: {
          width: 280,
          type: "bar",
        },
        labels: [
          "Team A1",
          "Team A2",
          "Team A3",
          "Team A4",
          "Team A5",
          "Team A6",
          "Team A7",
          "Team A8",
          "Team A9",
          "Team A10",
        ],
        responsive: [
          {
            breakpoint: 150,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      seriesbar: [],
      optionsbar: {
        chart: {
          type: "bar",
          height: 150,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "60%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            d.getFullYear(),
            d.getFullYear() - 1,
            d.getFullYear() - 2,
          ],
        },
        yaxis: {
          title: {
            text: "$ (Miles)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              }); //+ " Miles"
            },
          },
        },
      },
    };
    this.handlerCompCat = this.handlerCompCat.bind(this);
    this.handlerComp = this.handlerComp.bind(this);
    this.handlerMost = this.handlerMost.bind(this);
    this.expand = this.expand.bind(this);
    this.handlerVtaD = this.handlerVtaD.bind(this);
  }
  expand(exp) {
    if (exp) {
      this.setState({ expanded: true });
    } else {
      this.setState({ expanded: false });
    }
  }
  async handlerMost() {
    await fetch("http://www.implosa.com:5000/vta/svdd")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({
          dvta: data[0][1],
          dcot: data[0][0],
          dmta: data[0][2],
        });
      })
      .catch((e) => console.log(e));
  }

  async handlerComp() {
    const datos = await fetch("http://www.implosa.com:5000/vta/vsyc")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        return data;
      });
    const newSeries = [];
    datos.map(function (obj) {
      newSeries.push({ data: [obj[3], obj[2], obj[1]], name: obj[0] });
      return null;
    });

    this.setState({
      seriesbar: newSeries,
      loading: false,
    });
  }

  async handlerVtaD(){
    const datos = await fetch("http://www.implosa.com:5000/vta/rvss")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      console.log(data)
      /* let naneSeries = []; 
      let newSeries = [];
      let newLabels = [];
      data.map((obj, index)=>{
          naneSeries.push(obj[2])
          newSeries.push(obj[1])
          newLabels.push(formatDate(obj[0]) ) 
      })  */


    });
  }

  async handlerCompCat() {
    await fetch("http://www.implosa.com:5000/vta/svcc")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((datos) => {
        // return   data

        const newSeriesCat = [];
        if (datos.length > 0) {
          datos.map(function (obj) {
            newSeriesCat.push({ data: [obj[1], obj[2], obj[3]], name: obj[0] });
            return null;
          });
        }

        this.setState({
          series: newSeriesCat,
        });
      });
    //   console.log(newSeriesCat)
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
        //  console.log(user)
        localStorage.setItem("token", user[1]);
        this.setState({
          username: user[0][0],
          cod: user[0][2],
          pic: user[0][4],
        });
      })
      .catch((e) => {
        localStorage.clear();
      });
    //console.log('token : ' +token)
    this.handlerVtaD();
    this.handlerComp();

    this.handlerMost();
    this.handlerCompCat();

    const script0 = document.createElement("script");
    script0.src = "../../assets/js/ace-extra.min.js";
    script0.type = "text/jsx";
    document.body.appendChild(script0);

    const script3 = document.createElement("script");
    script3.src = "../../assets/js/jquery-2.1.4.min.js";
    script3.type = "text/jsx";
    document.body.appendChild(script3);

    const scriptboots = document.createElement("script");
    scriptboots.src = "../../assets/js/bootstrap.min.js";
    scriptboots.type = "text/jsx";
    document.body.appendChild(scriptboots);

    const script1 = document.createElement("script");
    script1.src = "../../assets/js/ace-elements.min.js";
    script1.type = "text/jsx";
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "../../assets/js/ace.min.js";
    script2.type = "text/jsx";
    document.body.appendChild(script2);

    const scriptMa = document.createElement("script");
    scriptMa.type = "text/jsx";
    scriptMa.textContent =
      "try{ace.settings.loadState('main-container')}catch(e){}";
    document.body.appendChild(scriptMa);
  }

  render() {
    document.title = "SIC - Home";

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
                  <Row>
                    <Col className="col-sm px-md-5">
                      <CardMont
                        title="Meta Mensual"
                        nMeta={this.state.dmta}
                        imag={meta}
                      />
                    </Col>

                    <Col className="col-sm px-md-5">
                      <CardMont
                        title="Ventas"
                        nMeta={this.state.dvta}
                        imag={vta}
                      />
                    </Col>

                    <Col className="col-sm px-md-5">
                      <CardMont
                        title="Cotizaciones"
                        nMeta={this.state.dcot}
                        imag={cotiz}
                      />
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col>
                      <Card className="card-stats mb-4 mb-lg-0 shadow card">
                        <CardHeader className="text-uppercase text-muted mb-0">
                          Ventas Diarias
                        </CardHeader>
                        <CardBody>  test
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Card className="card-stats mb-4 mb-lg-0 shadow card">
                        <CardHeader className="text-uppercase text-muted mb-0">
                          Comparativo de Ventas Por Periodos
                        </CardHeader>
                        <CardBody>
                          <Graph
                            options={this.state.optionsbar}
                            series={this.state.seriesbar}
                            heigth={300}
                            type="bar"
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Card className="card-stats mb-4 mb-lg-0 shadow card">
                        <CardHeader className="text-uppercase text-muted mb-0">
                          Total de Ventas por Categoria
                        </CardHeader>
                        <CardBody>
                          <Graph
                            options={this.state.optionsbar}
                            series={this.state.series}
                            heigth={300}
                            type="bar"
                          />
                        </CardBody>
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

export default Dashboard;

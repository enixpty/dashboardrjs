import React, { Component } from "react";
import "../../assets/font-awesome/4.5.0/css/font-awesome.min.css";
import "../../assets/css/fonts.googleapis.com.css";
import "../../assets/css/main.css";
// Basic component
import SideBar from "../../helpers/sidebar";
import Header from "../../helpers/header";
import Cargar from "../../helpers/cargar";
import PiePagina from "../../helpers/footer";

// componentes de la pagina de proyectos
import Liquid from "../../helpers/Liguid";
import Graph from "../../helpers/graph";
import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";

class Project extends Component {
  constructor(props) {
    super(props);
    //let d = new Date();
    this.state = {
      porcv: 1,
      totvent: 0,
      totmet: 0,
      username: "",
      cod: "",
      pic: null,
      loading: true,
      expanded: false,
      series: [90, 90],
      options: {
        chart: {
          width: 150,
          type: "pie",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 300,
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
          height: 430,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: [],
        },
      },
    };
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
  async handlerCat() {
    await fetch("http://implosa.com:5000/vta/svpct")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        //console.log(data)
        const newSeries = []; //this.state.series.slice()
        const newLabels = []; //this.state.options.labels.slice()

        data.map(function (obj) {
          newSeries.push(obj[0]);
          newLabels.push(obj[2]);
          return null;
        });
        //console.log(newLabels)
        this.setState({
          series: newSeries,
          options: {
            chart: {
              width: 150,
              type: "pie",
            },
            labels: newLabels,
            responsive: [
              {
                breakpoint: 200,
                options: {
                  chart: {
                    width: 75,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        });
      })
      .catch((e) => console.log(e));
  }

  async handlerVend() {
    await fetch("http://implosa.com:5000/vta/svmp")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data)
        const newSeries = []; //this.state.series.slice()
        const newSeriesMeta = [];
        const newLabels = []; //this.state.options.labels.slice()
        let SumMeta = 0;
        let SumVent = 0;
        data.map(function (obj) {
          SumMeta += obj[1];
          SumVent += obj[0];
          newSeries.push(obj[0]);
          newSeriesMeta.push(obj[1]);
          newLabels.push(obj[2]);
          return null;
        });

        let porcTot = (SumVent / SumMeta) * 100;

        this.setState({
          porcv: porcTot,
          totvent: Math.round(SumVent, 2),
          totmet: Math.round(SumMeta, 2),
          loading: false,
          seriesbar: [
            {
              name: "ventas",
              data: newSeries,
            },
            {
              name: "Meta",
              data: newSeriesMeta,
            },
          ],
          optionsbar: {
            chart: {
              type: "bar",
              height: 430,
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
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: "top",
                },
              },
            },
            dataLabels: {
              enabled: false,
              offsetX: -6,
              style: {
                fontSize: "12px",
                colors: ["#fff"],
              },
            },
            stroke: {
              show: true,
              width: 1,
              colors: ["#fff"],
            },
            xaxis: {
              categories: newLabels,
            },
          },
        });
      })
      .catch((e) => console.log(e));
  }
  formato(val) {
    return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
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

    this.handlerCat();
    this.handlerVend();
  }

  render() {
    document.title = "SIC - Proyectos";

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
                  <Row xs={1} md={2}>
                    <Col md={6}>
                      <Card className="card-stats mb-4 mb-lg-0 shadow card">
                        <CardHeader className="text-uppercase text-muted mb-0">
                          Ventas por Categorias
                        </CardHeader>
                        <CardBody>
                          <Graph
                            options={this.state.options}
                            series={this.state.series}
                            type="pie"
                            width={250}
                            heigth={239}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card className="card-stats mb-4 mb-lg-0 shadow card">
                        <CardHeader className="text-uppercase text-muted mb-0">
                          Porcentaje de Ventas Realizadas del Mes
                        </CardHeader>
                        <CardBody>
                          <Liquid
                            porcv={this.state.porcv}
                            color={"#E1251b"}
                            totmet={this.state.totmet}
                            totvent={this.state.totvent}
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
                          Ventas por Categorias
                        </CardHeader>
                        <CardBody>
                          <Graph
                            options={this.state.optionsbar}
                            series={this.state.seriesbar}
                            type="bar"
                            width={250}
                            heigth={380}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <br />
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

export default Project;

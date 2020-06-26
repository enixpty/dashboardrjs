import React, { useState } from "react";
import "../../../assets/font-awesome/4.5.0/css/font-awesome.min.css";
import "../../../assets/css/fonts.googleapis.com.css";
import "../../../assets/css/main.css";
 
// Basic component
import SideBar from "../../../helpers/sidebar";
import Header from "../../../helpers/header";
import Cargar from "../../../helpers/cargar";
import PiePagina from "../../../helpers/footer";
import { useEffect } from "react"; 

//others components
import Liquid from "../../../helpers/Liguid";
import Graph from "../../../helpers/graph";
import { Card, CardBody, Row, Col, CardHeader } from "reactstrap";

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month,day ].join('-');
}

export default function Suc() {
  // Declaración de una variable de estado que llamaremos "count"
  const [loading, setloading] = useState(false);
  const [username, setusername] = useState();
  const [cod_suc, setcod_suc] = useState(); 
  const [pic, setpic] = useState();
  const [scolor, setscolor] = useState();
  const [series, setdvta] = useState([90, 90]);
  const [seriesbar, setseriesbar] = useState([]);
  const [optionsbar, setoptionsbar] = useState( {
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
  });
  const [options, setoptions] = useState({
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
  });
  const [porcv, setporcv] = useState(1);
  const [totvent, setdtotvent] = useState('0');
  const [totmet, settotmet] = useState('0');

  const [expanded, setexpanded] = useState(false);
  let expand = (exp) => {
    if (exp) {
      setexpanded(true);
    } else {
      setexpanded(false);
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
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
        console.log(user);
        setusername(user[0][0]);
        setcod_suc(user[0][2]);
        setpic(user[0][4]);
        setloading(false);
        cat(user[0][1])
        metas(user[0][1])
        diary(user[0][1])
      })
      .catch((e) => console.log(e));

      async function metas(suc){
        const data = { cod: suc };
        const requestInfo = {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        };
        await fetch("http://www.implosa.com:5000/vta/cvss", requestInfo )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          }).then((data) => { 
              let porc =  Math.round((data[0][0] / data[0][1]) * 100);  
              //console.log(data)
               settotmet(data[0][0] )
               setdtotvent(data[0][1] )
               setporcv(porc)
               setscolor(data[0][3])
          })
          .catch((e) => console.log(e));
      }

      async function cat(suc){
        //console.log(suc)
        const data = { cod: suc };
        const requestInfo = {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        };
        await fetch("http://www.implosa.com:5000/vta/srsc", requestInfo )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          // console.log(data)
          // setvdata(data)
           let SeriesCat = [];
           let Labeloption = [];
           data.map((rowCat) => { 
               SeriesCat.push(rowCat[0]);
               Labeloption.push(rowCat[2]);
              
           }); 
            
           setdvta(SeriesCat) 
           setoptions ({
            chart: {
              width: 150,
              type: "pie",
            },
            labels: Labeloption,
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
          })
        })
        .catch((e) => console.log(e));
      } 
      async function diary(suc){
        //console.log(suc)
        const data = { cod: suc };
        const requestInfo = {
          method: "POST",
          body: JSON.stringify(data),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }; 
        await fetch("http://www.implosa.com:5000/vta/vdisale", requestInfo )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } 
        })
        .then((data) => {
         //console.log('aki')
          // setvdata(data)
          let newSeries = [];
          let newLabels = [];
          data.map((obj, index)=>{
              newSeries.push(obj[1])
              newLabels.push(formatDate(obj[0]) ) 
          })
          //console.log(newLabels)
          setoptionsbar({
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
              categories: newLabels,
               
            }
          }) 
          setseriesbar([{
            name: "Ventas",
            data: newSeries
        }])
        })
        .catch((e) => console.log(e));
      } 

  }, []);
  document.title = "SIC - Resumen de Sucusal";
  
  
  if (loading === true) {
    return (
      <div>
        <Cargar />
      </div>
    );
  }
  return (
    <div>
      <Header logo={pic} username={username} />
      <SideBar expand={expand} usu={localStorage.getItem("usu")} />
      <div id="container">
        <div
          style={{
            marginLeft: expanded ? 240 : 0,
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
                          options={options}
                          series={series}
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
                          porcv={porcv}
                          color={scolor}
                          totmet={totmet}
                          totvent={totvent}
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
                        Ventas Diarias
                      </CardHeader>
                      <CardBody>
                        <Graph
                          options={optionsbar}
                          series={seriesbar}
                          type="line"
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

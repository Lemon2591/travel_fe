import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";

function EChart({ series, categories, dataChart }) {
  const { Title } = Typography;

  const data = {
    series: [
      {
        name: "Lượt truy cập",
        data: [350, 40, 300, 220, 500, 250, 400, 230, 0],
      },
      {
        name: "Websites",
        data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: categories || [],
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={data.options}
          series={series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior mb-5">
        <div className="my-5">
          <Title level={5}>Thống kê số lượng người dùng</Title>
        </div>
        <Row gutter>
          <Col xs={6} xl={6} sm={6} md={6}>
            <div className="chart-visitor-count">
              <Title level={4}>Trổng số user</Title>
              <span>Người dùng: {dataChart?.totalUsers}</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default EChart;

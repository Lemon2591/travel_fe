import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

function LineChart({ series, categories, dataChart }) {
  const { Title } = Typography;

  const data = {
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },

      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: ["#8c8c8c"],
          },
        },
      },

      xaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 600,
            colors: [
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
              "#8c8c8c",
            ],
          },
        },
        categories: categories || [],
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
      <div className="linechart">
        <div>
          <Title level={5}>Thống kê lượng truy cập</Title>
          {/* <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph> */}
        </div>
        <div className="sales">
          <ul>
            <li>
              {<MinusOutlined />}
              Event
            </li>
            <li>
              {<MinusOutlined />}
              Session
            </li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={data.options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />

      <div className="chart-vistior mb-5 !mt-[0]">
        <Row gutter>
          <Col xs={6} xl={6} sm={6} md={6}>
            <div className="chart-visitor-count">
              <Title level={4}>Tổng số event</Title>
              <span>Event: {dataChart?.totalEvent}</span>
            </div>
          </Col>

          <Col xs={6} xl={6} sm={6} md={6}>
            <div className="chart-visitor-count">
              <Title level={4}>Tổng số sessions</Title>
              <span>Sessions: {dataChart?.totalSessions}</span>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default LineChart;

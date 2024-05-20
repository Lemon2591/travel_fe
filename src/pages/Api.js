import React from "react";
import { Row, Col, Card, Descriptions } from "antd";
import { CopyBlock, github } from "react-code-blocks";
import { useSelector } from "react-redux";

const Api = () => {
  const data_user = useSelector((state) => state?.user?.user_details);

  const list_api_data = [
    {
      name: "Province",
      js: `
      const type = "d" 
      // Description : 
      /*
        p: Provinces
        d: Districts
        w: Wards
      */
      // METHOD: GET
      // URL: 172.16.2.100:6688/api/province?type=&code=
      
      const headers = {
        cloud_name: YOUR_CLOUD_NAME,
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }

      `,
    },
    {
      name: "Movies",
      js: `
      // METHOD: GET
      // GET_ALL
      // URL: 172.16.2.100:6688/api/video?page=1&limit=10

      const headers = {
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      `,
    },

    {
      name: "Computer",
      js: `
      // METHOD: GET
      // GET_ALL
      // URL: 172.16.2.100:6688/api/product-computer

      const headers = {
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      `,
    },

    {
      name: "Fashion",
      js: `
      // METHOD: GET
      // GET_ALL
      // URL: 172.16.2.100:6688/api/product-fashion

      const headers = {
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      `,
    },

    {
      name: "Music",
      js: `
      // METHOD: GET
      // GET_ALL
      // URL: 172.16.2.100:6688/api/music

      const headers = {
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      `,
    },

    {
      name: "Điện thoại di động",
      js: `

      const type = 2 
      // Description : 
      /*
        2: Phụ kiện
        3: Tất cả
        4: Iphone
        5: Ipad và Tablet
        6: Laptop và Macbook
      */

      // METHOD: GET
      // GET_ALL
      // URL: 172.16.2.100:6688/api/mobile?type=1

      const headers = {
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      `,
    },
    {
      name: "Book",
      js: `
      // METHOD: GET
      // GET_ALL
      // URL: 172.16.2.100:6688/api/book

      const headers = {
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      `,
    },
  ];

  return (
    <div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            className="header-solid h-full"
            bordered={false}
            title={[
              <h6 className="font-semibold m-0">
                Free fake API for testing and prototyping.
              </h6>,
            ]}
            bodyStyle={{ paddingTop: "0" }}
          >
            <Row gutter={[24, 24]}>
              {list_api_data?.map((value, idx) => (
                <Col span={24} key={idx}>
                  <Card className="card-billing-info" bordered="false">
                    <div className="col-info">
                      <Descriptions title="">
                        <Descriptions.Item label="API Name" span={3}>
                          {value?.name}
                        </Descriptions.Item>
                      </Descriptions>

                      <div className="pt-5">
                        <CopyBlock
                          language={"js"}
                          text={value?.js}
                          showLineNumbers={false}
                          theme={github}
                          wrapLines={true}
                          codeBlock
                        />
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Api;

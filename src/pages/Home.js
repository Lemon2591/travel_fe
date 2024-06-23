import { useState, useEffect } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
  Skeleton,
  Button,
  Modal,
  message,
} from "antd";
import Echart from "../components/chart/EChart";
import { CopyBlock, github } from "react-code-blocks";
import { useSelector } from "react-redux";
import { AiOutlineCloud, AiOutlineSecurityScan } from "react-icons/ai";
import { useDispatch } from "react-redux";
import constants from "../redux/action/constant";
import { http } from "../config/http.config";
import Cookies from "universal-cookie";

const Home = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(false);
  const [code, setCode] = useState("");
  const { Title } = Typography;
  const data_user = useSelector((state) => state?.user?.user_details);
  const loading = useSelector((state) => state.loading.isLoadingElement);

  const data = {
    js: `    
    //Upload image or video
    //Javascript

    const uploadImage = async () => {
      const headers = {
        cloud_name: YOUR_CLOUD_NAME,
        api_keys: YOUR_API_KEYS
        secret_keys: YOUR_SECRET_KEYS
      }
      const data = new FormData();
      data.append("file", image);
     
      try {
        const response = await fetch(
          "http://localhost:3000/image/upload/process.env.REACT_APP_CLOUD_NAME?id_folder=YOUR_ID_FOLDER",
          {
            method: "POST",
            body: data,
            headers: {
              ...headers,
            }
          }
        );
        const res = await response.json();
      } catch (error) {
        console.log(error)
      }
    };
    `,
  };

  const handleSendCode = async () => {
    dispatch({ type: constants.HANDLE_LOADING, payload: true });
    try {
      const res = await http.post("/api/very-otp", {
        email: localStorage.getItem("user_name"),
        otp: code,
      });

      if (res?.data?.statusCode !== 200) {
        dispatch({ type: constants.HANDLE_LOADING, payload: false });
        return message.error(res?.data?.message || "Thất bại !");
      }

      localStorage.setItem("auth_t", res?.data?.data);
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      window.location.reload();
    } catch (error) {
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      return message.error("Thất bại !");
    }
  };

  const handleRetryCode = async () => {
    dispatch({ type: constants.HANDLE_LOADING, payload: true });
    try {
      const res = await http.post("/api/retry-otp", {
        email: localStorage.getItem("user_name"),
      });

      if (res?.data?.statusCode !== 200) {
        dispatch({ type: constants.HANDLE_LOADING, payload: false });
        return message.error("Thất bại !");
      }

      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      message.success("OTP đã được gửi !");

      setOtp(!otp);
    } catch (error) {
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      return message.error("Thất bại !");
    }
  };

  const handleCreateStore = async () => {
    dispatch({ type: constants.HANDLE_LOADING, payload: true });
    try {
      const res = await http.post("/api/create-store", {
        id: data_user?.id,
        email: data_user?.email,
      });
      if (res?.data?.statusCode !== 200) {
        return message.error("Khởi tạo kho lưu trữ thất bại !");
      }
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      window.location.reload();
    } catch (error) {
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
    }
  };

  return (
    <>
      <Modal centered open={otp} footer={false} onCancel={() => setOtp(!otp)}>
        <div className="modal_otp">
          <div>
            <h1>Xác minh</h1>
            <p>
              Vui lòng nhập mã xác minh đã được gửi về email{" "}
              {localStorage.getItem("user_name")}
            </p>
            <input
              value={code}
              type="text"
              maxLength={6}
              onChange={(e) => {
                setCode(
                  e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1")
                );
              }}
            />
            <div className="btn_retry">
              <button onClick={handleSendCode}>Gửi mã</button>
            </div>
            <div className="retry_otp">
              <p>
                Nếu bạn chưa nhận được mã?{" "}
                <span onClick={handleRetryCode}>Gửi lại mã</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <Skeleton active loading={false}>
        {!data_user?.is_active && (
          <Card bordered={false} className="criclebox ">
            {" "}
            <div className="create_storage">
              <div>
                <div>
                  <i>
                    <AiOutlineSecurityScan />
                  </i>
                </div>
                <div>
                  {" "}
                  <p>Tài khoản chưa được xác thực !</p>
                </div>
                <div>
                  <Button onClick={handleRetryCode}>Xác thực ngay</Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {data_user?.user_storage?.storage_name ? (
          <div className="layout-content">
            <Row className="rowgap-vbox" gutter={[24, 0]}>
              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="mb-24">
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={24}>
                        <span>Cloud Name</span>
                        <Title level={4}>
                          {" "}
                          <small className={`selector_copy`}>
                            {data_user?.user_storage?.storage_name ||
                              "Cultural Viet Nam CMS"}
                          </small>
                        </Title>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="mb-24">
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={24}>
                        <span>APIs Key</span>
                        <Title level={4}>
                          {" "}
                          <small className={`selector_copy`}>
                            {data_user?.user_storage?.api_key || "4hndsrwnsdn"}
                          </small>
                        </Title>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>

              <Col xs={24} sm={24} md={12} lg={8} xl={8} className="mb-24">
                <Card bordered={false} className="criclebox ">
                  <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                      <Col xs={24}>
                        <span>Secret Key</span>
                        <Title level={4}>
                          {" "}
                          <small className={`selector_copy`}>
                            {data_user?.user_storage?.secret_key ||
                              "amvwekgvewegmewgme"}
                          </small>
                        </Title>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>

            <div className="show_code">
              <h1 className="font-bold py-5">Code Example:</h1>
              <CopyBlock
                language={"js"}
                text={data?.js}
                showLineNumbers={false}
                theme={github}
                wrapLines={true}
                codeBlock
              />
            </div>
          </div>
        ) : (
          <Card bordered={false} className="criclebox ">
            {" "}
            <div className="create_storage">
              <div>
                <div>
                  <i>
                    <AiOutlineCloud />
                  </i>
                </div>
                <div>
                  {" "}
                  <p>Khởi tạo kho lưu trữ ngay !</p>
                </div>
                <div>
                  <Button onClick={handleCreateStore}>Khởi tạo ngay</Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Skeleton>
    </>
  );
};

export default Home;

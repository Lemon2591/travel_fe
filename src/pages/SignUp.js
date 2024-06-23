import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Modal,
  message,
} from "antd";
import { http } from "../config/http.config";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import constants from "../redux/action/constant";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [otp, setOtp] = useState(false);
  const [code, setCode] = useState("");
  const onFinish = async (values) => {
    dispatch({ type: constants.HANDLE_LOADING, payload: true });
    try {
      const res = await http.post("/api/register", {
        full_name: values?.name,
        email: values?.email,
        password: values?.password,
      });
      if (res?.data?.statusCode !== 200) {
        dispatch({ type: constants.HANDLE_LOADING, payload: false });
        return message.error("Thất bại !");
      }
      localStorage.setItem("user_name", res?.data?.data?.email);
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      setOtp(true);
    } catch (error) {
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      return message.error("Thất bại !");
    }
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
        return message.error("Thất bại !");
      }

      localStorage.setItem("auth_t", res?.data?.data);
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      navigate("/");
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
    } catch (error) {
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      return message.error("Thất bại !");
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
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>Cultural Viet Nam CMS</h5>
          </div>
        </Header>
        <Content className="p-0">
          <div className="sign-up-header">
            <div className="content">
              <Title>Đăng ký</Title>
              <p className="text-lg">
                Chào mừng đến với Cultural Viet Nam CMS.
              </p>
            </div>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0"
            title={<h5>Đăng ký</h5>}
            bordered="false"
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="row-col"
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    validator: (_, value) => {
                      const regex =
                        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

                      if (!value) {
                        return Promise.reject(
                          "Họ và tên không được để trống !"
                        );
                      }

                      if (!regex?.test(value)) {
                        return Promise.reject("Vui lòng nhập đúng định dạng !");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    validator: (_, value) => {
                      let usernameRegex =
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                      if (!value) {
                        return Promise.reject("Email không được bỏ trống !");
                      }

                      if (!usernameRegex?.test(value)) {
                        return Promise.reject("Nhập đúng định dạng email ! ");
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    validator: (_, value) => {
                      let usernameRegex =
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
                      if (!value) {
                        return Promise.reject("Mật khẩu không được bỏ trống !");
                      }

                      if (!usernameRegex?.test(value)) {
                        return Promise.reject(
                          "Mật khẩu tối thiếu 8 chữ cái, chũ hoa và chữ thường và số !"
                        );
                      }

                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input placeholder="Mật khẩu" type="password" />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject(
                          "Vui lòng đồng ý với chính sách và điều khoản !"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Checkbox>
                  Tôi đồng ý với{" "}
                  <a href="#pablo" className="font-bold text-dark">
                    chính sách và điều khoản.
                  </a>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  ĐĂNG KÝ
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Bạn đã có tài khoản?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Đăng nhập
              </Link>
            </p>
          </Card>
        </Content>
      </div>
    </>
  );
};

export default SignUp;

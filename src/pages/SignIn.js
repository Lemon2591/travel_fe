import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  message,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import { http } from "../config/http.config";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import constants from "../redux/action/constant";
import { useDispatch } from "react-redux";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const onFinish = async (values) => {
    dispatch({ type: constants.HANDLE_LOADING, payload: true });
    try {
      const res = await http.post("/api/login", {
        user_name: values?.email,
        password: values?.password,
      });
      if (res?.data?.statusCode !== 200) {
        dispatch({ type: constants.HANDLE_LOADING, payload: false });
        return message?.error(res?.data?.message);
      }
      cookies.set("auth_t", res?.data?.data, {
        path: "/",
        domain: process.env.REACT_APP_DOMAIN,
      });
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      navigate("/dashboard");
    } catch (error) {
      dispatch({ type: constants.HANDLE_LOADING, payload: false });
      return message.error(error?.message || "Đăng nhập thất bại !");
    }
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <h5>Cultural Viet Nam CMS</h5>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form onFinish={onFinish} layout="vertical" className="row-col">
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      validator: (_, value) => {
                        let usernameRegex =
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                        if (!value) {
                          return Promise.reject("Please input your email !");
                        }

                        if (!usernameRegex?.test(value)) {
                          return Promise.reject(
                            "Please input correct your email ! "
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password !",
                    },
                  ]}
                >
                  <Input placeholder="Password" type="password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;

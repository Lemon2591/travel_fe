import React, { Fragment, useEffect, useState } from "react";
import { FolderBox, FileBox } from "../components/folder/FolderBox";
import {
  Row,
  Col,
  Button,
  Input,
  Card,
  Select,
  Breadcrumb,
  Skeleton,
  message,
  Empty,
  Image,
  Divider,
  Modal,
  Upload,
  Spin,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  UploadOutlined,
  HomeOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../config/http.config";
import { useSelector, useDispatch } from "react-redux";
import constants from "../redux/action/constant";

const Folder = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [listFileUp, setListFileUp] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const state_loading = useSelector((state) => state?.loading.isLoadingElement);

 
  return (
    <div>
      <Modal
        title="Tạo thư mục mới"
        open={isModal}
        centered
        //  onOk={handleOk}
        onCancel={() => setIsModal(!isModal)}
      >
        <div className="py-3">
          <Input placeholder="Nhập tên thư mục" />
        </div>
      </Modal>
      <div className="folder_box_header py-5">
        <Row>
          <Col md={6}>
            <div className="mr-10">
              <Input placeholder="Type to search" prefix={<SearchOutlined />} />
            </div>
          </Col>
          <Col md={3}>
            <Select
              placeholder="Filter"
              style={{ width: "100%" }}
              // onChange={handleChange}
              options={[
                {
                  value: 1,
                  label: "All",
                },
                {
                  value: 2,
                  label: "File",
                },
                {
                  value: 3,
                  label: "Folder",
                },
              ]}
            />
          </Col>

          <Col md={6}>
            <div className="flex aligns-center justify-start">
              <div
                className="col-6 d-flex px-10 cursor-pointer hover:bg-gray-300 mx-5 rounded"
                style={{
                  transition: ".3s",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <i className="mr-5">
                  <PlusOutlined />
                </i>
                <p
                  style={{ width: "75px" }}
                  onClick={() => setIsModal(!isModal)}
                >
                  New Folder
                </p>
              </div>
              <div className="col-6">
                <Upload
                 
                  multiple={true}
                  showUploadList={false}
                >
                  <Button
                    icon={
                      <Spin
                        indicator={
                          <LoadingOutlined
                            style={{
                              fontSize: 16,
                            }}
                            spin
                          />
                        }
                      />
                    }
                  >
                    Upload File
                  </Button>
                </Upload>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="breadcrumb_folder py-5">
        <Breadcrumb
          items={
            breadCrumb?.length > 0
              ? [
                  {
                    title: (
                      <a onClick={() => navigate(`/folders/`)}>
                        <i>
                          <HomeOutlined />
                        </i>
                      </a>
                    ),
                  },
                  ...breadCrumb?.map((value) => {
                    return {
                      title: (
                        <a
                          onClick={() => navigate(`/folders/${value?.file_id}`)}
                        >
                          {value?.file_name}
                        </a>
                      ),
                    };
                  }),
                ]
              : []
          }
        />
      </div>

      <Card bordered={false} className="criclebox h-full">
        <div className="folder_box_content">
          <p>Thư mục của bạn</p>
          <div className="folder_box_content_list flex">
            <Skeleton active loading={isLoading}>
              {data?.folders?.length > 0 ? (
                data?.folders?.map((value, idx) => {
                  return (
                    <Fragment key={idx}>
                      <FolderBox value={value} />
                    </Fragment>
                  );
                })
              ) : (
                <div className="empty_data">
                  <Empty />
                </div>
              )}
            </Skeleton>
          </div>

          <Divider />
          <p>Tài liệu của bạn</p>
          <div className="folder_box_content_list flex">
            <Skeleton active loading={isLoading}>
              {data?.files?.length > 0 ? (
                data?.files?.map((value, idx) => {
                  return (
                    <Fragment key={idx}>
                      <FileBox value={value} />
                    </Fragment>
                  );
                })
              ) : (
                <div className="empty_data">
                  <Empty />
                </div>
              )}
            </Skeleton>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Folder;

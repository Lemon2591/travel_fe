import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Space,
  Pagination,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import { http } from "../config/http.config";
import { checkResponse } from "../helper/helper";
import moment from "moment/moment";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineRedo } from "react-icons/ai";
import { changStatusPost } from "../api/api";
import { useNavigate } from "react-router-dom";

const PostManagement = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [isB, setIsB] = useState(false);
  const [dataTable, setDataTable] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên bài viết",
      dataIndex: "title",
      key: "title",
      render: (text) => <p className="!text-[#000] truncate">{text}</p>,
      width: 200,
    },
    {
      title: "Lượt xem",
      dataIndex: "view",
      key: "view",
      width: 80,
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "url",
      width: 200,
      render: (_, row) => (
        <>
          <p className="!text-[#000] truncate">{_}</p>
        </>
      ),
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      width: 80,
      render: (_) => (
        <>
          <p className="!text-[#000] truncate">{_?.category_name}</p>
        </>
      ),
    },
    {
      title: "Người đăng",
      dataIndex: "users",
      key: "users",
      width: 80,
      render: (_) => (
        <>
          <p className="!text-[#000] truncate">{_?.full_name}</p>
        </>
      ),
    },

    {
      title: "Nguồn tham khảo",
      dataIndex: "source",
      key: "source",
      width: 150,
      render: (source) => (
        <>
          <p className="!text-[#000] truncate">{source ? source : "--"}</p>
        </>
      ),
    },
    {
      title: "Thời gian",
      dataIndex: "createAt",
      key: "createAt",
      width: 150,
      render: (time) => (
        <>
          <p className="!text-[#000] truncate">
            {moment(time).format("DD/MM/YYYY") +
              " " +
              moment(time).format("LT")}
          </p>
        </>
      ),
    },
    {
      title: "Trạng thái",
      key: "is_delete",
      dataIndex: "is_delete",
      width: 80,

      render: (is_delete) => (
        <>
          <Tag color={is_delete ? "red" : "blue"}>
            {is_delete ? "Deleted" : "Available"}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      center: true,
      render: (_, record) => (
        <>
          {!record?.is_delete ? (
            <Space size="middle">
              <Tooltip title="Sửa bài viết">
                <i
                  className="cursor-pointer text-[#4096ff] text-[18px]"
                  onClick={() => navigate(`/post-manager/${record.id}`)}
                >
                  <AiOutlineEdit />
                </i>
              </Tooltip>
              <Popconfirm
                title="Xoá bài viết"
                description="Bạn muốn xoá bài viết này ?"
                onConfirm={async () => {
                  await changStatusPost({ id: record?.id, type: "delete" });
                  await getData(currentPage, 10);
                }}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Tooltip title="Xoá bài viết" placement="bottom">
                  <i className="cursor-pointer text-[#ff4d4f] text-[18px]">
                    <AiOutlineDelete />
                  </i>
                </Tooltip>
              </Popconfirm>
            </Space>
          ) : (
            <Popconfirm
              title="Khôi phục bài viết"
              description="Bạn muốn khôi phục bài viết này ?"
              onConfirm={async () => {
                await changStatusPost({ id: record?.id, type: "restore" });
                await getData(currentPage, 10);
              }}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Khôi phục bài viết" placement="bottom">
                <i className="cursor-pointer text-[#ff4d4f] text-[18px]">
                  <AiOutlineRedo />
                </i>
              </Tooltip>
            </Popconfirm>
          )}
        </>
      ),
    },
  ];

  const getData = async (
    page = 1,
    limit = 10,
    view,
    category,
    title,
    is_delete
  ) => {
    setLoading(true);
    try {
      const res = await http.get(
        `/api/get-list-post-cms?page=${page}&limit=${limit}&view=${
          view || ""
        }&category=${category || ""}&title=${title || ""}&is_delete=${
          is_delete || ""
        }`
      );
      const obj = checkResponse(res);
      setDataTable(obj?.data?.data);
      return obj;
    } catch (error) {
      return message.error("Có lỗi xảy ra !");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getData(currentPage, 10);
    })();
  }, [currentPage]);

  const handleFilter = async (e) => {
    try {
      const { view, title, category, is_delete } =
        await ref.current.getFieldsValue();
      if (!view && !title && !category && !is_delete) {
        return;
      }
      setIsB(true);
      await getData(currentPage, 10, view, category, title, is_delete);
    } catch (error) {
      return message.error("Có lỗi xảy ra !");
    }
  };

  const handleResetFilter = async () => {
    await getData(currentPage, 10);
    setIsB(false);
    await ref?.current.resetFields();
  };

  return (
    <div className="">
      <div className="mt-[20px]">
        <Form ref={ref}>
          <div className="flex">
            <div className="w-[20%] px-[10px]">
              <div>Tìm kiếm theo tên</div>
              <Form.Item name="title">
                <Input placeholder="Nhập tên bài viết..." />
              </Form.Item>
            </div>
            <div className="w-[20%] px-[10px]">
              <div>Sắp xếp theo lượt xem</div>
              <Form.Item name="view">
                <Select
                  placeholder={"Chọn để sắp xếp..."}
                  options={[
                    {
                      label: "Từ cao đến thấp",
                      value: 1,
                    },
                    {
                      label: "Từ tấp đến cao",
                      value: 2,
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="w-[20%] px-[10px]">
              <div>Thể loại</div>
              <Form.Item name="category">
                <Select
                  placeholder={"Chọn thể loại..."}
                  options={[
                    {
                      label: "Travel",
                      value: 2,
                    },
                    {
                      label: "Food",
                      value: 1,
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="w-[20%] px-[10px]">
              <div>Trạng thái</div>
              <Form.Item name="is_delete">
                <Select
                  placeholder={"Chọn trạng thái..."}
                  options={[
                    {
                      label: "Available",
                      value: 1,
                    },
                    {
                      label: "Deleted",
                      value: 2,
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <div>
              <div>{"  "}&nbsp;</div>
              <div className="flex">
                <div className="px-[5px]">
                  <Button
                    type="primary"
                    style={{ color: "#fff" }}
                    onClick={handleFilter}
                  >
                    Tim kiếm
                  </Button>
                </div>
                {isB && (
                  <div className="px-[5px]">
                    <Button onClick={handleResetFilter}>Bỏ lọc</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div className="w-[100%]">
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={dataTable?.data || []}
          pagination={false}
          scroll={{
            x: 1000,
          }}
          loading={loading}
        />
      </div>

      {dataTable?.total > 10 && (
        <div className="text-center mt-[50px]">
          <Pagination
            current={dataTable?.page}
            total={dataTable?.total}
            pageSize={dataTable?.limit}
            onChange={async (e) => {
              setCurrentPage(e);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PostManagement;

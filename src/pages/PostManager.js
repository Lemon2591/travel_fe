import React, { useState, useRef } from "react";
import EditorCommon from "../components/Editor/Editor";
import { Button } from "antd";
import { createPost } from "../api/api";
import {
  Form,
  Input,
  Select,
  Tooltip,
  Upload,
  Image,
  message,
  Skeleton,
} from "antd";
import { AiFillCopy, AiOutlineUpload } from "react-icons/ai";
import { stringToSlug } from "../helper/helper";
import axios from "axios";
import LoadingScreen from "../components/loading/LoadingScreen";

const { TextArea } = Input;

const PostManager = () => {
  const editorRef = useRef();
  const form_ref = useRef();
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSc, setLoadingSc] = useState(false);
  const [url, setUrl] = useState("");

  const getData = async () => {
    setLoadingSc(true);
    try {
      await form_ref?.current?.validateFields();
      const content_html = editorRef.current.getContent();
      if (!content_html || content_html?.trim() === "") {
        return message.error("Vui lòng nhập nội dung bài đăng !");
      }

      if (!thumbnail) {
        return message.error("Vui lòng đăng tải ảnh !");
      }

      let data = {
        ...form_ref.current.getFieldsValue(),
        content: content_html,
        thumbnail: thumbnail,
        url: `${process.env.REACT_APP_API_URL}/post/${url}`,
        slug: url,
        author: 1,
      };
      await createPost(data);
      message.success("Tạo bài viết thành công !");
    } catch (error) {
      return message?.error("Tạo bài viết thất bại !");
      // console.log(error);
    } finally {
      setLoadingSc(false);
    }

    // console.log(form_ref.current.getFieldsValue());
  };

  const onUpload = async (blobInfo, progress, failure) => {
    try {
      let imageUpload = blobInfo.blob();
      let formData = new FormData();
      formData.append("files", imageUpload);
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload-file`,
        formData
      );
      console.log(res?.data?.data?.url);
      return res?.data?.data?.url;
    } catch (error) {}
  };

  const uploadPropImage = {
    accept: "image/png,image/jpeg,image/svg+xml,image/jpg,image/webp,image/gif",
    beforeUpload: async (file, fileList) => {
      setLoading(true);
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/svg+xml" &&
        file.type !== "image/webp" &&
        file.type !== "image/gif"
      ) {
        message.error(`${file.name} is not a image file`);
        setTimeout(() => {
          message.destroy();
        }, 2000);
        return;
      } else {
        if (file.size > 100000000) {
          message.error("Dung lượng file quá lớn !");
          setTimeout(() => {
            message.destroy();
          }, 2000);
          return;
        }
        file.newImg = URL.createObjectURL(file);
      }

      const formData = await new FormData();
      await formData.append("files", file);

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/upload-file`,
          formData
        );
        setThumbnail(res?.data?.data?.url);
        message.success("Tải ảnh thành công");
      } catch (error) {
        message.error("Tải ảnh thất bại !");
      } finally {
        setLoading(false);
      }
      return false;
    },
  };
  const handleConvertUrl = (text) => {
    const slug = stringToSlug(text);
    setUrl(slug);
  };

  return (
    <>
      {loadingSc && <LoadingScreen />}
      <Form ref={form_ref}>
        <div className="post_manager">
          <div className="post_left mr-5">
            <div>
              <div className="col-12">
                <div>Tiêu đề</div>
                <Form.Item
                  name="title"
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === "") {
                          return Promise.reject("Vui lòng nhập tiêu đề !");
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập tiêu đề cho bài viết"
                    onChange={(e) => handleConvertUrl(e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className="flex row col-12">
                <div className="w-1/2 px-5">
                  <div>Thể loại</div>
                  <Form.Item
                    name={"category_id"}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject("Vui lòng chọn thể loại !");
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Select
                      placeholder={"Chọn thể loại..."}
                      options={[
                        {
                          label: "Food",
                          value: 1,
                        },
                        {
                          label: "Travel",
                          value: 2,
                        },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div className="w-1/2 px-5">
                  <div>Từ khoá SEO</div>
                  <Form.Item
                    name={"key_seo"}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (!value || value.trim() === "") {
                            return Promise.reject(
                              "Vui lòng nhập từ khoá SEO !"
                            );
                          } else {
                            return Promise.resolve();
                          }
                        },
                      },
                    ]}
                  >
                    <Input placeholder={"Nhập các từ khoá SEO..."} />
                  </Form.Item>
                </div>
              </div>

              <div className="col-12">
                <div>Mô tả SEO</div>
                <Form.Item
                  name={"des_seo"}
                  rules={[
                    {
                      validator: (_, value) => {
                        if (!value || value.trim() === "") {
                          return Promise.reject("Vui lòng nhập mô tả SEO !");
                        } else {
                          return Promise.resolve();
                        }
                      },
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Nhập mô tả SEO..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </div>
            </div>

            <div className="py-5">
              <EditorCommon
                type={"training"}
                data={content}
                ref={editorRef}
                onUpload={onUpload}
              />
            </div>
          </div>
          <div className="post_right px-5">
            <div className=" px-5">
              <div>Website của bạn</div>
              <Form.Item
                name={"website_id"}
                rules={[
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject("Vui lòng chọn website !");
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Select
                  placeholder={"Website của bạn"}
                  options={[
                    {
                      label: "https://lemondev.id.vn",
                      value: 1,
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="px-5">
              <div>
                <div>URL dự kiến của bài viết</div>
                <div className="flex w-full">
                  <div className="mr-5" style={{ width: "calc(100% - 55px)" }}>
                    <Tooltip
                      title={
                        <>
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              window.open(
                                url
                                  ? `${process.env.REACT_APP_API_URL}/post/${url}`
                                  : ""
                              )
                            }
                          >
                            {url
                              ? `${process.env.REACT_APP_API_URL}/post/${url}`
                              : ""}
                          </span>
                        </>
                      }
                    >
                      <Input
                        disabled
                        value={
                          url
                            ? `${process.env.REACT_APP_API_URL}/post/${url}`
                            : ""
                        }
                      />
                    </Tooltip>
                  </div>
                  <div className="w-7">
                    <Button>
                      <AiFillCopy />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5">
              <div>
                <div>Thumbnail bài viết</div>
                <div className="flex w-full">
                  <div className="mr-5 w-full justify-center flex">
                    <div className="w-full upload_css">
                      <Skeleton active loading={loading}>
                        {!thumbnail ? (
                          <Upload {...uploadPropImage}>
                            <Button
                              icon={<AiOutlineUpload />}
                              style={{ width: "100%" }}
                            >
                              Chọn ảnh
                            </Button>
                          </Upload>
                        ) : (
                          <Image src={thumbnail} height={250} />
                        )}
                      </Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-10">
              <div className="w-full">
                <Button
                  type="primary"
                  style={{ width: "100%", color: "#fff" }}
                  onClick={getData}
                >
                  Đăng bài viết
                </Button>
              </div>
              <div className="w-full py-5">
                <Button style={{ width: "100%" }}>Lưu bản nháp</Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default PostManager;

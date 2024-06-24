import React, { useState, useRef, useEffect } from "react";
import EditorCommon from "../components/Editor/Editor";
import { Button } from "antd";
import { createPost, updatePost, uploadFile } from "../api/api";
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
import LoadingScreen from "../components/loading/LoadingScreen";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { http } from "../config/http.config";
import { checkResponse } from "../helper/helper";

const { TextArea } = Input;

const PostManager = () => {
  const params = useParams();

  const editorRef = useRef();
  const form_ref = useRef();
  const { user_details } = useSelector((state) => state?.user);
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
        url: `${process.env.REACT_APP_PAGE_URL}/post/${url}`,
        slug: url,
        author: 1,
      };
      if (params?.id) {
        const checkFail = await updatePost({ ...data, id: params?.id });
        if (!checkFail) {
          return message.error("Thất bại!");
        }
      } else {
        const checkFail = await createPost(data);

        if (!checkFail) {
          return message.error("Thất bại!");
        }
      }
      message.success("Thành công !");
      if (!params?.id) {
        await form_ref?.current.resetFields();
        setContent("");
        setThumbnail("");
        setUrl("");
      }
    } catch (error) {
      if (!error?.outOfDate) {
        return;
      }
      return message?.error("Thất bại !");
    } finally {
      setLoadingSc(false);
    }
  };

  const onUpload = async (blobInfo, progress, failure) => {
    try {
      let imageUpload = blobInfo.blob();
      let formData = new FormData();
      formData.append("files", imageUpload);
      formData.append(
        "data",
        JSON.stringify({
          author: user_details?.id,
        })
      );
      const res = await uploadFile(
        `${process.env.REACT_APP_API_URL}/api/upload-file`,
        formData
      );

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
      await formData.append(
        "data",
        JSON.stringify({
          author: user_details?.id,
        })
      );

      try {
        const res = await uploadFile(
          `${process.env.REACT_APP_API_URL}/api/upload-file`,
          formData
        );

        if (!res) {
          return message.error("Thất bại !");
        }

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

  useEffect(() => {
    function listener(e) {
      e.preventDefault();
      return "msg";
    }
    const content_html = editorRef?.current?.getContent();
    if (content_html) {
      window.addEventListener("beforeunload", listener);
    }

    return () => {
      window.removeEventListener("beforeunload", listener);
    };
  }, [content]);

  useEffect(() => {
    if (params?.id) {
      (async () => {
        try {
          const res = await http.get(`/api/details-post/${params?.id}`);
          const { data } = checkResponse(res);

          await form_ref?.current?.setFieldsValue({
            title: data?.data?.title,
            category_id: data?.data?.category_id,
            key_seo: data?.data?.key_seo,
            website_id: data?.data?.website_id,
            des_seo: data?.data?.des_seo,
          });
          setUrl(data?.data?.slug);
          setThumbnail(data?.data?.thumbnail);
          setContent(data?.data?.content);
        } catch (error) {}
      })();
    } else {
      form_ref?.current.resetFields();
      setContent("");
      setThumbnail("");
      setUrl("");
    }
  }, [params?.id]);

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
                      options={user_details?.category_list?.map((val) => ({
                        label: val?.category_name,
                        value: val?.id,
                      }))}
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
                setContent={setContent}
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
                  options={user_details?.websites?.map((val) => ({
                    label: val?.websites?.name_website,
                    value: val?.website_id,
                  }))}
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
                                  ? `${process.env.REACT_APP_PAGE_URL}/post/${url}`
                                  : ""
                              )
                            }
                          >
                            {url
                              ? `${process.env.REACT_APP_PAGE_URL}/post/${url}`
                              : ""}
                          </span>
                        </>
                      }
                    >
                      <Input
                        disabled
                        value={
                          url
                            ? `${process.env.REACT_APP_PAGE_URL}/post/${url}`
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
            <div className="w-full py-[10px] px-5">
              <Button
                onClick={() => message.error("Tính năng đang phát triển !")}
                style={{ width: "100%" }}
              >
                Chọn từ thư viện
              </Button>
            </div>
            <div className="px-5">
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

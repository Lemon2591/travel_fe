import React, { useState, useRef } from "react";
import EditorCommon from "../components/Editor/Editor";
import { Button } from "antd";
import axios from "axios";
import { Form, Input, Select, Tooltip, Upload, Image } from "antd";
import { AiFillCopy, AiOutlineUpload } from "react-icons/ai";

const PostManager = () => {
  const editorRef = useRef();

  const [content, setContent] = useState("");
  const getData = (content) => {
    console.log(JSON.stringify(editorRef.current.getContent()));
  };

  const onUpload = async (blobInfo, progress, failure) => {
    try {
      let imageUpload = blobInfo.blob();
      let formData = new FormData();
      formData.append("file", imageUpload);
      const res = await axios.post(
        "http://192.168.2.2:6688/api/upload-file-test",
        formData
      );
      console.log(res?.data?.data?.url);
      return res?.data?.data?.url;
    } catch (error) {}
  };

  return (
    <>
      <Form>
        <div className="post_manager">
          <div className="post_left mr-5">
            <div>
              <div className="col-12">
                <div>Tiêu đề</div>
                <Form.Item>
                  <Input placeholder="Nhập tiêu đề cho bài viết" />
                </Form.Item>
              </div>
              <div className="flex row col-12">
                <div className="w-1/2 px-5">
                  <div>Thể loại</div>
                  <Form.Item>
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
                  <Form.Item>
                    <Input placeholder={"Nhập các từ khoá SE0..."} />
                  </Form.Item>
                </div>
              </div>

              <div className="col-12">
                <div>Mô tả SEO</div>
                <Form.Item>
                  <Input placeholder="Nhập mô tả SEO..." />
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
              <Form.Item>
                <Select
                  defaultValue={1}
                  placeholder={"Website của bạn"}
                  options={[
                    {
                      label: "https://lemondev.id.vn",
                      value: 1,
                    },
                    {
                      label: "https://google.com",
                      value: 2,
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
                    <Form.Item>
                      <Tooltip
                        title={
                          <>
                            <span>
                              https://www.culturalvn.com/post/ke-la-mat-bat-coc-tre-em
                            </span>
                          </>
                        }
                      >
                        <Input
                          disabled
                          value={
                            "https://www.culturalvn.com/post/ke-la-mat-bat-coc-tre-em"
                          }
                        />
                      </Tooltip>
                    </Form.Item>
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
                      <Upload>
                        <Button
                          icon={<AiOutlineUpload />}
                          style={{ width: "100%" }}
                        >
                          Chọn ảnh
                        </Button>
                      </Upload>
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

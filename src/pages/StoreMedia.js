import React, { useEffect, useState } from "react";
import { Skeleton, Empty, message, Button, Spin, Image } from "antd";
import { http } from "../config/http.config";
import { AiOutlineDownCircle, AiOutlineCopy } from "react-icons/ai";
import moment from "moment/moment";

const StoreMedia = () => {
  const [listImage, setListImage] = useState({
    total: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [load, setLoad] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectImage, setSelectImage] = useState();

  const getInitImage = async (page = 1, limit = 12) => {
    setIsLoading(true);
    try {
      const { data } = await http.get(
        `/api/get-image?page=${page}&limit=${limit}`
      );
      const format = {
        total: data?.data?.total,
        data: [...listImage?.data, ...data?.data?.data],
      };
      setListImage(format);
    } catch (error) {
      message.error("Đã xảy ra lỗi !");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getInitImage();
    })();
  }, []);

  const handleLoadMore = async () => {
    if (listImage?.data?.length === listImage?.total) {
      return;
    }
    setLoad(true);

    try {
      const { data } = await http.get(
        `/api/get-image?page=${currentPage + 1}&limit=12`
      );
      setCurrentPage(currentPage + 1);
      const format = {
        total: data?.data?.total,
        data: [...listImage?.data, ...data?.data?.data],
      };
      setListImage(format);
    } catch (error) {
      message.error("Đã xảy ra lỗi !");
    } finally {
      setLoad(false);
    }
  };

  const handleSelectImage = (item) => {
    const dataCopy = [...listImage?.data];
    const res = dataCopy?.map((val) => {
      if (val?.id === item?.id) {
        return {
          ...val,
          isSelect: true,
        };
      }
      delete val?.isSelect;
      return { ...val };
    });

    setListImage({
      total: listImage.total,
      data: res,
    });
    setSelectImage(item);
  };

  return (
    <div className="flex ">
      <div className="w-[75%] overflow-scroll h-[80vh]">
        <Skeleton active loading={isLoading}>
          <div className="flex flex-wrap">
            {listImage?.data?.length > 0 ? (
              listImage?.data?.map((val, idx) => {
                return (
                  <div
                    className=" w-[23%] overflow-hidden px-[10px] py-[10px] bg-[#e6f3ff] rounded-[10px] cursor-pointer mx-[5px] my-[5px] hover-card"
                    key={idx}
                    onClick={() => handleSelectImage(val)}
                    style={
                      val?.isSelect
                        ? { backgroundColor: "#6eb9ff" }
                        : { backgroundColor: "#e6f3ff" }
                    }
                  >
                    <p className="font-[600] mb-[5px]">IMG-{val?.id}</p>
                    <img
                      className="w-[100%] object-cover rounded-[10px] h-[180px]"
                      src={val?.url}
                      alt=""
                    />
                  </div>
                );
              })
            ) : (
              <div className="mt-[150px] items-center justify-center w-[100%]">
                <Empty />
              </div>
            )}
          </div>
        </Skeleton>
        <div className="flex justify-center my-[20px]">{load && <Spin />}</div>
        {listImage?.data?.length === listImage?.total ? null : (
          <div className="flex justify-center my-[20px]">
            <Button onClick={() => handleLoadMore()}>
              <div className="flex items-center justify-center">
                <i className="text-[18px]">
                  <AiOutlineDownCircle />
                </i>
                <p>Xem thêm</p>
              </div>
            </Button>
          </div>
        )}
      </div>
      <div className="w-[25%]">
        <div className="bg-[#e6f3ff] rounded-[10px] h-[80vh] mt-[5px]">
          {!selectImage ? (
            <div className="pt-[150px] ">
              <p className="text-center py-[10px]">
                Chọn một ảnh để xem chi tiết
              </p>
              <Empty />
            </div>
          ) : (
            <div className="px-[10px] py-[10px]">
              <Image width={"100%"} src={selectImage?.url} height={300} />
              <div>
                <p className="py-[5px] font-[600] text-[14px]">
                  Ngày tạo: {moment(selectImage?.createdAt).format("ll")}
                </p>
                {/* <p className="py-[5px] font-[600] text-[14px]">
                  Người đăng: Anh Tuấn
                </p> */}
                <div className="flex items-center py-[5px]">
                  <p className="py-[5px] font-[500] text-[14px] m-w-[150px] truncate mr-[5px] bg-[#fff] px-[10px] rounded-[5px]">
                    Url : {selectImage?.url}
                  </p>
                  <Button>
                    <i>
                      <AiOutlineCopy />
                    </i>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreMedia;

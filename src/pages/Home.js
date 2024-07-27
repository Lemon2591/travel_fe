import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  DatePicker,
  Space,
  Tabs,
  message,
  Skeleton,
  Select,
} from "antd";
import { AiOutlineDown, AiOutlineLine } from "react-icons/ai";
import LineChart from "../components/chart/LineChart";
import EChart from "../components/chart/EChart";
import moment from "moment";
import { useSelector } from "react-redux";
import { getStatisticView } from "../redux/service/user.service";

const { RangePicker } = DatePicker;
const Home = () => {
  const dataTime = {
    week: {
      type: "week",
      startTime: moment().subtract(8, "days").toDate(),
      endTime: moment().toDate(),
    },
    month: {
      type: "month",
      startTime: moment().subtract(31, "days").toDate(),
      endTime: moment().toDate(),
    },
    year: {
      type: "year",
      startTime: moment().subtract(366, "days").toDate(),
      endTime: moment().toDate(),
    },
  };
  const { user_details } = useSelector((state) => state?.user);

  const [isModal, setIsModal] = useState(false);
  const [customTime, setCustomTime] = useState([]);
  const [currentTab, setCurrentTab] = useState("1");
  const [dataPush, setDataPush] = useState(dataTime?.week);
  const [loading, setIsLoading] = useState(false);
  const [dataChart, setDataChart] = useState();

  const handleSetCustomTime = (date, dateString) => {
    setCustomTime(date);
  };

  const handleSelectType = () => {
    let time;

    if (currentTab === "1") {
      time = dataTime?.week;
    }

    if (currentTab === "2") {
      time = dataTime?.month;
    }

    if (currentTab === "3") {
      time = dataTime?.year;
    }

    if (currentTab === "4") {
      if (customTime?.length > 0) {
        time = {
          type: "custom",
          startTime: moment(new Date(customTime[0])).format(),
          endTime: moment(new Date(customTime[1])).format(),
        };
      } else {
        return message.error("Chưa chọn ngày tháng");
      }
    }
    setDataPush(time);
    setIsModal(!isModal);
  };

  const items = [
    {
      key: "1",
      label: "7 ngày",
      children: (
        <>
          <div className="flex items-center py-[5px]">
            <div className="flex">
              <p className="font-[500]">Từ ngày:</p>
              <span className="pl-[10px]">
                {moment(dataTime?.week?.startTime).format("DD/MM/YYYY")}
              </span>
            </div>
            <i className="flex items-center px-[10px]">
              <AiOutlineLine />
            </i>
            <div className="flex">
              <p className="font-[500]">Đến ngày:</p>
              <span className="pl-[10px]">Hiện tại</span>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "30 ngày",
      children: (
        <>
          <div className="flex items-center py-[5px]">
            <div className="flex">
              <p className="font-[500]">Từ ngày:</p>
              <span className="pl-[10px]">
                {moment(dataTime?.month?.startTime).format("DD/MM/YYYY")}
              </span>
            </div>
            <i className="flex items-center px-[10px]">
              <AiOutlineLine />
            </i>
            <div className="flex">
              <p className="font-[500]">Đến ngày:</p>
              <span className="pl-[10px]">Hiện tại</span>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "365 ngày",
      children: (
        <>
          <div className="flex items-center py-[5px]">
            <div className="flex">
              <p className="font-[500]">Từ ngày:</p>
              <span className="pl-[10px]">
                {" "}
                {moment(dataTime?.year?.startTime).format("DD/MM/YYYY")}
              </span>
            </div>
            <i className="flex items-center px-[10px]">
              <AiOutlineLine />
            </i>
            <div className="flex">
              <p className="font-[500]">Đến ngày:</p>
              <span className="pl-[10px]">Hiện tại</span>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "4",
      label: "Tự chọn",
      children: (
        <>
          <Space direction="vertical" size={12}>
            <RangePicker
              value={customTime}
              onChange={(date, dateString) =>
                handleSetCustomTime(date, dateString)
              }
              format={"DD/MM/YYYY"}
              placeholder={["Từ ngày", "Đến ngày"]}
            />
          </Space>
        </>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (Object.keys(user_details)?.length > 0) {
        if (user_details?.websites?.length > 0) {
          const data = await getStatisticView(
            moment(dataPush?.startTime).format(),
            moment(dataPush?.endTime).format(),
            user_details?.user_role?.role?.role_name === "system_admin"
              ? "all"
              : user_details?.websites[0].website_id,
            dataPush?.type
          );
          setDataChart(data);
        } else {
          message.warning("Bạn chưa có website, vui lòng liên hệ admin !");
        }
      }
      setIsLoading(false);
    })();
  }, [user_details, dataPush]);

  console.log(user_details?.websites);

  return (
    <>
      <Modal
        title="Phương thức thống kê"
        open={isModal}
        centered
        onOk={handleSelectType}
        onCancel={() => setIsModal(!isModal)}
      >
        <Tabs
          items={items}
          onChange={(e) => setCurrentTab(e)}
          accessKey={currentTab}
        />
      </Modal>
      <div className="py-5 flex justify-end">
        {Object.keys(user_details)?.length > 0 && (
          <div className="inline-flex">
            {" "}
            <div className="mx-10">
              <Select
                placeholder="Chọn website của bạn"
                options={user_details?.websites?.map((val) => {
                  return {
                    label: val?.websites?.name_website,
                    value: val?.website_id,
                  };
                })}
                style={{ width: 300 }}
                defaultValue={user_details?.websites[0]?.website_id}
              />
            </div>
            <Button onClick={() => setIsModal(!isModal)}>
              <div className="flex items-center">
                <p className="font-[600] text-[14px] px-[10px]">
                  Thống kê theo tuần
                </p>
                <i className="flex items-center">
                  <AiOutlineDown />
                </i>
              </div>
            </Button>
          </div>
        )}
      </div>
      <Skeleton active loading={loading} className="my-5">
        <LineChart
          series={
            dataChart
              ? [dataChart?.series_event, dataChart?.series_session]
              : []
          }
          categories={dataChart ? dataChart?.category : []}
          dataChart={dataChart}
        />
      </Skeleton>
      <Skeleton active loading={loading} className="my-5">
        <EChart
          series={dataChart ? [dataChart?.series_user] : []}
          categories={dataChart ? dataChart?.category : []}
          dataChart={dataChart}
        />
      </Skeleton>
    </>
  );
};

export default Home;

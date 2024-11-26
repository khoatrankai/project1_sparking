/* eslint-disable react/jsx-key */
import usePostData from "@/hooks/usePostData";
import {
  ICreateWork,
  IGetActivity,
  IGetStatusActivity,
  IGetWork,
  IUpdateActivity,
} from "@/models/activityInterface";
import { PlusOutlined } from "@ant-design/icons";
import { fetchActivities } from "@/redux/store/slices/activitySlices/activity.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import activityService from "@/services/activityService";
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  SelectProps,
  Tabs,
  Tag,
  Tooltip,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import TabPane from "antd/es/tabs/TabPane";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Step, StepLabel, Stepper } from "@mui/material";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import moment from "moment";

type Props = {
  ID: string;
};

export default function ModalUpdateActivity({ ID }: Props) {
  const { datas: dataTypeActivity } = useSelector(
    (state: RootState) => state.get_type_activities
  );

  const { datas: dataUsers } = useSelector(
    (state: RootState) => state.get_users
  );

  const { datas: dataTypeWork } = useSelector(
    (state: RootState) => state.get_type_work
  );

  const { datas: dataContracts } = useSelector(
    (state: RootState) => state.get_contracts
  );

  const [optionsListUser, setOptionsListUser] = useState<
    SelectProps["options"]
  >([]);

  const [form] = useForm();
  const [formAddWork] = useForm();
  const { postdata } = usePostData();
  const dispatch = useDispatch<AppDispatch>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [tabChooseUser, setTabChooseUser] = useState<boolean>(false);
  const [dataWorks, setDataWorks] = useState<IGetWork[]>([]);
  const [tabAddWork, setTabAddWork] = useState<boolean>(false);
  const [listUsers, setListUsers] = useState<string[]>([]);
  const [typeActivity, setTypeActivity] = useState<string>("");
  const [typeWork, setTypeWork] = useState<string>("");
  const [statusActivity, setStatusActivity] = useState<IGetStatusActivity[]>(
    []
  );
  const [statusChoose, setStatusChoose] = useState<number>(-1);

  const showModal = () => {
    setIsModalVisible(true);
    fetchData();
  };
  const fetchData = async () => {
    const res = await activityService.getActivityById(ID);
    if (res.statusCode === 200) {
      const dataRes = res.data as IGetActivity;
      form.setFieldsValue(dataRes);
      setTypeActivity(res.data.type);
      setDataWorks(dataRes?.works ?? []);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitCreateWork = async (values: ICreateWork) => {
    const statusCode = await postdata(() =>
      activityService.createWork({
        ...values,
        activity: ID,
        list_users: listUsers,
      })
    );
    if (statusCode === 201) {
      setTabAddWork(!tabAddWork);
      setListUsers([]);
      formAddWork.resetFields();
      fetchData();
    }
  };

  useEffect(() => {
    if (typeActivity) {
      setStatusActivity(
        dataTypeActivity.find((dt) => dt.type_activity_id === typeActivity)
          ?.status ?? []
      );
    }
  }, [typeActivity]);

  useEffect(() => {
    if (statusActivity.length > 0) {
      const index = statusActivity.findIndex(
        (dt) => dt.status_activity_id === form.getFieldValue("status")
      );
      setStatusChoose(index);
    }
  }, [form, statusActivity]);

  useEffect(() => {
    if (dataUsers) {
      setOptionsListUser(
        dataUsers.map((dt) => {
          return { label: dt.first_name + dt.last_name, value: dt.user_id };
        })
      );
    }
  }, [dataUsers]);

  const handleSubmit = async (values: IUpdateActivity) => {
    const res = await postdata(() =>
      activityService.updateActivity(ID, values)
    );
    if (res === 200 || res === 201) {
      dispatch(fetchActivities());
      setIsModalVisible(false);
    }
  };

  const btnSubmit = async () => {
    form.submit();
  };

  const handleUpdateStatus = async (status: string) => {
    const statusCode = await postdata(() =>
      activityService.updateStatus(ID, { status })
    );
    if (statusCode === 200) {
      fetchData();
      const index = statusActivity.findIndex(
        (dt) => dt.status_activity_id === status
      );
      setStatusChoose(index);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Button
        className="  text-xs text-yellow-500 font-semibold"
        type="text"
        onClick={showModal}
      >
        Chỉnh sửa
      </Button>
      <Modal
        title="Cập nhật hoạt động"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin hoạt động" key={1}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap", columnGap: "12px" }}
            >
              <Form.Item
                name="type"
                label="Loại hoạt động"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn loại hoạt động!",
                  },
                ]}
                style={{ width: "100%", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Chọn loại"
                  onChange={(e) => {
                    setTypeActivity(e);
                  }}
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataTypeActivity?.map((dt) => (
                    <Option
                      key={dt.type_activity_id}
                      value={dt.type_activity_id}
                    >
                      {dt.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="name"
                label="Tên hoạt động"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Vui lòng nhập tên hoạt động",
                  },
                ]}
                style={{ minWidth: "100%", flex: "1 1 0%" }}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="status"
                label="Trạng thái"
                // rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Chọn loại"
                  // onChange={(e) => {
                  //   const index = statusActivity.findIndex(
                  //     (dt) => dt.status_activity_id === e
                  //   );
                  //   setStatusChoose(index);
                  // }}
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {statusActivity?.map((dt) => (
                    <Option
                      key={dt.status_activity_id}
                      value={dt.status_activity_id}
                    >
                      {dt.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="contract"
                label="Hợp động"
                // rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Chọn hợp động"
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataContracts?.map((dt) => (
                    <Option key={dt.contract_id} value={dt.contract_id}>
                      {dt.name_contract}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Mô tả"
                style={{ width: "100%" }}
              >
                <Input.TextArea
                  placeholder="Description"
                  autoSize={{ minRows: 3 }}
                />
              </Form.Item>
            </Form>
            <div className="flex justify-end w-full mt-4">
              <Button type="primary" onClick={btnSubmit}>
                Cập nhật
              </Button>
            </div>
          </TabPane>
          <TabPane tab="Trạng thái hoạt động" key={2}>
            <div>
              {/* <Steps
                type="navigation"
                size="small"
                // progressDot={customDot}
                labelPlacement="vertical"
                current={statusChoose}
                onChange={(e) => {
                  const idStatus = statusActivity.find(
                    (dt, index) => index === e
                  )?.status_activity_id;
                  handleUpdateStatus(idStatus ?? "");
                }}
                className="site-navigation-steps"
                items={
                  statusActivity?.map((dt, index) => {
                    if (index === statusChoose) {
                      return {
                        title: dt.name_tag,
                        // subTitle: dt.name,
                        // status: "process",
                      };
                    }
                    if (index < statusChoose) {
                      return {
                        title: dt.name_tag,
                        // subTitle: dt.name,
                        // status: "finish",
                      };
                    }
                    return {
                      title: dt.name_tag,
                      // subTitle: dt.name,
                      // status: "wait",
                    };
                  })

                  // {
                  //   title: 'Step 1',
                  //   status: 'finish',
                  // },
                  // {
                  //   title: 'Step 2',
                  //   status: 'process',
                  // },
                  // {
                  //   title: 'Step 3',
                  //   status: 'wait',
                  // },
                } */}

              {/* /> */}
              <Stepper alternativeLabel activeStep={statusChoose}>
                {statusActivity.map((label, index) => (
                  <Step key={label.status_activity_id}>
                    <StepLabel
                      sx={{
                        "& .MuiStepLabel-label": {
                          color:
                            index === statusChoose
                              ? "#00A9AE"
                              : "gray !important", // Đổi màu text
                        },
                        "& .MuiStepIcon-root": {
                          color:
                            index === statusChoose
                              ? "#00A9AE !important"
                              : "gray !important", // Đổi màu icon
                        },
                        "& .Mui-active": {
                          color: "#00A9AE !important",
                        },
                        "& .Mui-completed": {
                          color: "#00A9AE !important", // Màu cho bước đã hoàn thành
                        },
                      }}
                      className={
                        index > statusChoose
                          ? "!cursor-pointer"
                          : "pointer-events-none"
                      }
                      onClick={() => {
                        handleUpdateStatus(label.status_activity_id);
                      }}
                    >
                      <p className="text-sm cursor-pointer">{label.name}</p>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className="border-y-[1px] py-4 my-2 flex flex-col gap-2">
              <div
                className="flex items-center text-xs font-medium text-[#EB8823] hover:opacity-85 cursor-pointer"
                onClick={() => {
                  setTabAddWork(!tabAddWork);
                }}
              >
                <IoIosAddCircle />
                <p className="pointer-events-none">Thêm công việc</p>
              </div>
              <div
                className="hover:border-[#00A9AE] border-black/10 border-[1px]  px-1 py-2 rounded-md"
                hidden={!tabAddWork}
              >
                <div className="flex mb-2 items-center gap-1">
                  <Avatar.Group
                    max={{
                      count: 5,
                      style: {
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      },
                    }}
                  >
                    {listUsers?.map((dt) => {
                      const dataFil = dataUsers?.find(
                        (dtt) => dtt.user_id === dt
                      );
                      return (
                        <Tooltip
                          title={
                            dataFil?.first_name ?? "" + dataFil?.last_name ?? ""
                          }
                          placement="top"
                        >
                          <Avatar
                            src={dataFil?.picture_url}
                            alt={
                              dataFil?.first_name ??
                              "" + dataFil?.last_name ??
                              ""
                            }
                            style={{ backgroundColor: "#87d068" }}
                          />
                        </Tooltip>
                      );
                    })}
                  </Avatar.Group>
                  {!tabChooseUser ? (
                    <IoIosAddCircle
                      className="w-8 h-8 text-[#ED8C1F] cursor-pointer"
                      onClick={() => {
                        setTabChooseUser(!tabChooseUser);
                      }}
                    />
                  ) : (
                    <>
                      <Select
                        mode="multiple"
                        onBlur={() => {
                          setTabChooseUser(!tabChooseUser);
                        }}
                        allowClear
                        maxTagCount={"responsive"}
                        style={{ width: "220px" }}
                        value={listUsers}
                        placeholder="Please select"
                        onChange={(e) => {
                          setListUsers(e);
                        }}
                        options={optionsListUser}
                      />
                      <IoIosCloseCircle
                        className="w-8 h-8 text-red-500 cursor-pointer"
                        onClick={() => {
                          setTabChooseUser(!tabChooseUser);
                        }}
                      />
                    </>
                  )}
                </div>
                <Form
                  form={formAddWork}
                  onFinish={handleSubmitCreateWork}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <Form.Item
                    name="name"
                    rules={[
                      { required: true, message: "Please enter the Work Name" },
                    ]}
                    className="flex-1 mb-0 min-w-full"
                  >
                    <Input type="none" placeholder="Tên công việc" />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    rules={[
                      { required: true, message: "Please enter the Work Name" },
                    ]}
                    className="flex-1 mb-0 min-w-80"
                  >
                    <Select
                      placeholder="Chọn loại"
                      onChange={(e) => {
                        setTypeWork(e);
                      }}
                      showSearch
                      filterOption={(input, option) => {
                        return (option?.children?.join("") ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                    >
                      {dataTypeWork?.map((dt) => (
                        <Option key={dt.type_work_id} value={dt.type_work_id}>
                          {dt.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="status"
                    rules={[
                      { required: true, message: "Please enter the Work Name" },
                    ]}
                    className="flex-1 mb-0 min-w-80"
                  >
                    <Select
                      placeholder="Trạng thái"
                      showSearch
                      filterOption={(input, option) => {
                        return (option?.children?.join("") ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                    >
                      {dataTypeWork
                        .find((dt) => dt.type_work_id === typeWork)
                        ?.status?.map((dt) => (
                          <Option
                            key={dt.status_work_id}
                            value={dt.status_work_id}
                          >
                            {dt.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="time_start"
                    className=" mb-0"
                    // rules={[{ required: true }]}
                    style={{ minWidth: "320px", flex: "1 1 0%" }}
                    getValueProps={(value) => ({
                      value: value ? moment(value) : null,
                    })}
                  >
                    <DatePicker
                      placeholder="Chọn ngày bắt đầu"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    className=" mb-0"
                    name="time_end"
                    rules={[{ required: true }]}
                    style={{ minWidth: "320px", flex: "1 1 0%" }}
                    getValueProps={(value) => ({
                      value: value ? moment(value) : null,
                    })}
                  >
                    <DatePicker
                      placeholder="Chọn ngày kết thúc"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    style={{ width: "100%" }}
                    className=" mb-0"
                  >
                    <Input.TextArea
                      placeholder="Description"
                      autoSize={{ minRows: 3 }}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                      margin: "0",
                    }}
                  >
                    <Button
                      className=" text-white font-semibold"
                      style={{ background: "#00A9AE" }}
                      // onClick={handleAddProduct}
                      htmlType="submit"
                    >
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {dataWorks.map((dt) => {
                  return (
                    <>
                      <div className="flex flex-wrap gap-2 justify-between shadow-md bg-gray-400/5 p-4 rounded-sm">
                        <div className="flex flex-col justify-between gap-1">
                          <p className="text-[#00A9AE] font-semibold text-lg">
                            {dt.name}
                          </p>
                          <p className="text-black/60 text-xs">
                            {dt.description}
                          </p>
                          <div className="flex text-xs font-medium gap-2">
                            <p>{dt.time_start.toLocaleString("vi-VN")}</p>
                            <span>-</span>
                            <p>{dt.time_end.toLocaleString("vi-VN")}</p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <Tag color="green">{dt.status.name}</Tag>
                          <div className="max-h-6">
                            <Avatar.Group
                              max={{
                                count: 2,
                                style: {
                                  color: "#f56a00",
                                  backgroundColor: "#fde3cf",
                                },
                              }}
                            >
                              {dt?.list_user?.map((dtt) => {
                                const dataFil = dataUsers?.find(
                                  (dttt) => dttt.user_id === dtt.user_id
                                );
                                return (
                                  <Tooltip
                                    title={
                                      dataFil?.first_name ??
                                      "" + dataFil?.last_name ??
                                      ""
                                    }
                                    placement="top"
                                  >
                                    <Avatar
                                      src={dataFil?.picture_url}
                                      alt={
                                        dataFil?.first_name ??
                                        "" + dataFil?.last_name ??
                                        ""
                                      }
                                      style={{ backgroundColor: "#87d068" }}
                                    />
                                  </Tooltip>
                                );
                              })}
                            </Avatar.Group>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="mb-2 border-b-[1px] pb-2">
              <div className="flex items-center text-xs font-medium text-[#EB8823] hover:opacity-85 cursor-pointer mb-2">
                <p className="pointer-events-none">Ảnh đầu hoạt động</p>
              </div>
              <Form.Item
                // valuePropName="fileList"
                // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                className="!m-0"
                // rules={[{ required: false, message: "Vui lòng chọn loại thuế!" }]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Upload
                  action=""
                  listType="picture-card"
                  // fileList={fileList}
                  // onPreview={handlePreview}
                  // onChange={handleChange}
                  multiple
                >
                  {false ? null : uploadButton}
                </Upload>
                {/* {previewImage && (
              <Image
                alt="ha"
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )} */}
              </Form.Item>
            </div>
            <div>
              <div className="flex items-center text-xs font-medium text-[#EB8823] hover:opacity-85 cursor-pointer mb-2">
                <p className="pointer-events-none">Ảnh sau hoạt động</p>
              </div>
              <Form.Item
                // valuePropName="fileList"
                // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                className="!m-0"
                // rules={[{ required: false, message: "Vui lòng chọn loại thuế!" }]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Upload
                  action=""
                  listType="picture-card"
                  // fileList={fileList}
                  // onPreview={handlePreview}
                  // onChange={handleChange}
                  multiple
                >
                  {false ? null : uploadButton}
                </Upload>
                {/* {previewImage && (
              <Image
                alt="ha"
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )} */}
              </Form.Item>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
}

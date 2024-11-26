import usePostData from "@/hooks/usePostData";
import { ICreateActivity } from "@/models/activityInterface";
import { fetchActivities } from "@/redux/store/slices/activitySlices/activity.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import activityService from "@/services/activityService";
import { Button, Form, Input, Modal, Select, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// type Props = {}

export default function ModalAddActivity() {
  const { datas: dataTypeActivity } = useSelector(
    (state: RootState) => state.get_type_activities
  );

  const { datas: dataContracts } = useSelector(
    (state: RootState) => state.get_contracts
  );

  const [form] = useForm();
  const { postdata } = usePostData();
  const dispatch = useDispatch<AppDispatch>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [typeActivity, setTypeActivity] = useState<string>("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: ICreateActivity) => {
    const res = await postdata(() => activityService.createActivity(values));
    if (res === 200 || res === 201) {
      dispatch(fetchActivities());
      setIsModalVisible(false);
    }
  };

  const btnSubmit = async () => {
    form.submit();
  };

  return (
    <>
      <Button
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
      >
        Thêm hoạt động
      </Button>
      <Modal
        title="Tạo hoạt động"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin hoạt đồng" key={1}>
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
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataTypeActivity
                    .find((dt) => dt.type_activity_id === typeActivity)
                    ?.status?.map((dt) => (
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
                label="Hợp đồng"
                // rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Chọn hợp đồng"
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
          </TabPane>
        </Tabs>

        <div className="flex justify-end w-full mt-4">
          <Button type="primary" onClick={btnSubmit}>
            Tạo
          </Button>
        </div>
      </Modal>
    </>
  );
}

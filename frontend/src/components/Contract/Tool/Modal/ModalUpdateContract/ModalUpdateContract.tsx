import usePostData from "@/hooks/usePostData";
import { ICreateContract } from "@/models/contractInterface";

import { fetchContracts } from "@/redux/store/slices/contractSlices/contract.slide";
import { AppDispatch, RootState } from "@/redux/store/store";
import contractService from "@/services/contractService.";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Tabs,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import TabPane from "antd/es/tabs/TabPane";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

type Props = {
  ID: string;
};

export default function ModalUpdateContract({ ID }: Props) {
  const { datas: dataTypeContract } = useSelector(
    (state: RootState) => state.get_type_contract
  );
  const { datas: dataCustomers } = useSelector(
    (state: RootState) => state.infos_customer
  );

  const [form] = useForm();
  const { postdata } = usePostData();
  const dispatch = useDispatch<AppDispatch>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
    fetchData();
  };
  const fetchData = async () => {
    const res = await contractService.getContract(ID);
    if (res.statusCode === 200) {
      form.setFieldsValue(res.data);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: ICreateContract) => {
    const res = await postdata(() =>
      contractService.updateContract(ID, values)
    );
    if (res === 200 || res === 201) {
      dispatch(fetchContracts());
      setIsModalVisible(false);
    }
  };

  const btnSubmit = async () => {
    form.submit();
  };

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
        title="Cập nhật hợp đồng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin hợp đồng" key={1}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap", columnGap: "12px" }}
            >
              <Form.Item
                name="customer"
                label="Khách hàng"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn khách hàng!",
                  },
                ]}
                style={{ width: "100%", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Chọn khách hàng"
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataCustomers?.map((dt) => (
                    <Option key={dt.info_id} value={dt.info_id}>
                      {dt.name_company}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="name_contract"
                label="Tên hợp đồng"
                rules={[
                  {
                    required: true,
                    type: "string",
                    message: "Vui lòng nhập tên hợp đồng",
                  },
                ]}
                style={{ minWidth: "100%", flex: "1 1 0%" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="Giá trị hợp đồng(vnđ)"
                // rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <InputNumber
                  placeholder="Price"
                  className="w-full"
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                  }
                />
              </Form.Item>
              <Form.Item
                name="type_contract"
                label="Loại hợp đồng"
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
                  {dataTypeContract?.map((dt) => (
                    <Option key={dt.type_id} value={dt.type_id}>
                      {dt.name_type}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="type"
                label="Loại thanh toán"
                rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select placeholder="Select status">
                  <Option value="default">Cố định</Option>
                  <Option value="time">Chu kì</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="date_start"
                label="Ngày bắt đầu"
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
                name="date_expired"
                label="Ngày kết thúc"
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
            Chỉnh sửa
          </Button>
        </div>
      </Modal>
    </>
  );
}

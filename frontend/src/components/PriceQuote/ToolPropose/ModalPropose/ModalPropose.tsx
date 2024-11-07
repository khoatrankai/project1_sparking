import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import { CustomerInfo } from "@/models/customerInterface";
import { CreatePropose } from "@/models/proposeInterface";
import { Province } from "@/models/systemInterface";
import { InfoUser } from "@/models/userInterface";
import customerService from "@/services/customerService";
import proposeService from "@/services/proposeService";
import systemService from "@/services/systemService";
import userService from "@/services/userService";
import { Button, Form, Input, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { IoAddOutline } from "react-icons/io5";

// type Props = {}

export default function ModalPropose() {
  const { data: dataProvinces } = useFetchData<Province[]>(
    systemService.getProvinces
  );

  const { data: dataCustomer } = useFetchData<CustomerInfo[]>(
    customerService.getAllCustomer
  );
  const { postdata } = usePostData();

  const { data: dataUsers } = useFetchData<InfoUser[]>(userService.getUsers);
  const [dataRelate, setDataRelate] = useState();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: CreatePropose) => {
    const res = await postdata(() => proposeService.createPropose(values));
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
      >
        Thêm đề xuất
      </Button>
      <Modal
        title="Tạo đề xuất"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Form
          // layout="inline"
          onFinish={handleSubmit}
          style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          <Form.Item
            name="name_propose"
            label="Tên đề xuất"
            rules={[
              { required: true, message: "Please input the proposal name!" },
            ]}
            style={{ width: "100%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type_related"
            label="Liên quan đến"
            rules={[{ required: true }]}
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <Select
              placeholder="Select a type"
              onChange={(value) => {
                setDataRelate(value);
              }}
            >
              <Option value={"OP"}>Cơ hội</Option>
              <Option value={"CT"}>Khách hàng</Option>
            </Select>
          </Form.Item>
          {dataRelate && (
            <Form.Item
              name="related_id"
              label={`${dataRelate === "CT" ? "ID Khách hàng" : "ID Cơ hội"}`}
              rules={[{ required: true }]}
              style={{ minWidth: "320px", flex: "1 1 0%" }}
            >
              {dataRelate === "CT" && (
                <Select
                  placeholder="Select a related_id"
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataCustomer?.map((dt) => (
                    <Option key={dt.info_id} value={dt.info_id}>
                      {dt?.infoContacts?.[0]?.customer.full_name}(
                      {dt.name_company})
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          )}

          <Form.Item
            name="date_start"
            label="Ngày bắt đầu"
            rules={[{ required: true }]}
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="date_end"
            label="Ngày kết thúc"
            rules={[{ required: true }]}
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select placeholder="Select status">
              <Option value="draff">Draff</Option>
              <Option value="send">Send</Option>
              <Option value="open">Open</Option>
              <Option value="edit">Edit</Option>
              <Option value="refuse">Refuse</Option>
              <Option value="accept">Accept</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="type_discount"
            label="Loại thuế"
            rules={[{ required: true }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select placeholder="Select discount type">
              <Option value="none">None</Option>
              <Option value="before">Before</Option>
              <Option value="after">After</Option>
            </Select>
          </Form.Item>

          {/* <Form.Item
            name="price"
            label="Giá trị"
            rules={[{ required: false }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Input type="number" />
          </Form.Item> */}
          <Form.Item
            name="type_money"
            label="Đơn vị tiền"
            rules={[{ required: true }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select placeholder="Select a currency type">
              <Option value="vnd">VND</Option>
              <Option value="usd">USD</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="staff_support"
            label="Người phụ trách"
            rules={[{ required: true }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select
              placeholder="Chọn nhân viên"
              showSearch
              filterOption={(input, option) => {
                return (option?.children?.join("") ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {dataUsers?.map((dt) => (
                <Option key={dt.user_id} value={dt.user_id}>
                  {dt.first_name} {dt.last_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Please enter a valid phone number!" },
            ]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="send_to"
            label="Gửi đến"
            rules={[{ required: true }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="province"
            label="Khu vực"
            rules={[{ required: true }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select placeholder="Chọn khu vực">
              {dataProvinces?.map((dt) => (
                <Option key={dt.province_id} value={dt.province_id}>
                  {dt.name_province}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

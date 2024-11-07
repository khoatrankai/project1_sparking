import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import { GroupInfo, IUpdateCustomerInfo } from "@/models/customerInterface";
import { Province } from "@/models/systemInterface";
import { InfoUser } from "@/models/userInterface";
import customerService from "@/services/customerService";
import systemService from "@/services/systemService";
import userService from "@/services/userService";
import { Button, Form, Input, Menu, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import SubMenu from "antd/es/menu/SubMenu";
import React, { useState } from "react";

type Props = {
  info_id: string;
};

export default function ModalAddCustomer({ info_id }: Props) {
  const [form] = useForm();
  const { data: dataProvinces } = useFetchData<Province[]>(
    systemService.getProvinces
  );

  const { postdata } = usePostData();

  const { data: dataUsers } = useFetchData<InfoUser[]>(userService.getUsers);
  const { data: dataGroup } = useFetchData<GroupInfo[]>(
    customerService.getGroupCustomer
  );

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const fetchData = async () => {
    const res = await customerService.getCustomerID(info_id);
    if (res.statusCode === 200) {
      form.setFieldsValue({
        ...res.data,
        group_customer: res.data.group_customer.group_id,
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    fetchData();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: IUpdateCustomerInfo) => {
    // console.log(values);
    const res = await postdata(() =>
      customerService.updateCustomerInfo(info_id, values)
    );
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
    }
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
        title="Tạo khách hàng"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Form
          // layout="inline"
          form={form}
          onFinish={handleSubmit}
          style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
        >
          <Menu
            mode="inline"
            style={{ width: "100%" }}
            defaultOpenKeys={["info"]}
          >
            <SubMenu title="Thông tin khách hàng" key="info">
              <div className="flex flex-wrap gap-2 h-fit w-fit rounded-lg p-1">
                <Form.Item
                  name="name_company"
                  className="!m-0"
                  label="Tên công ty"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên công ty!" },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="group_customer"
                  label="Nhóm khách hàng"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập nhóm khách hàng!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Select
                    placeholder="Chọn nhóm"
                    showSearch
                    filterOption={(input, option) => {
                      return (option?.children?.join("") ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase());
                    }}
                  >
                    {dataGroup?.map((dt) => (
                      <Option key={dt.group_id} value={dt.group_id}>
                        {dt.name_group}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="tax_code"
                  label="Mã số thuế"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã số thuế!" },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="province"
                  label="Tỉnh/Thành phố"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉnh/thành phố!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
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
                  name="phone_number"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="website"
                  label="Website"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ website!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="type_money"
                  label="Loại tiền tệ"
                  rules={[
                    { required: true, message: "Vui lòng nhập loại tiền tệ!" },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Select placeholder="Select a currency type">
                    <Option value="vnd">VND</Option>
                    <Option value="usd">USD</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="staff_support"
                  label="Nhân viên hỗ trợ"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên nhân viên hỗ trợ!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
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
              </div>
            </SubMenu>
            <SubMenu title="Thông tin giao hàng" key="info_address">
              <div className="flex flex-wrap gap-2 h-fit w-fit rounded-lg p-1">
                <Form.Item
                  name="address_payment"
                  label="Địa chỉ thanh toán"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ thanh toán!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="province_payment"
                  label="Tỉnh/Thành phố thanh toán"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉnh/thành phố thanh toán!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
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
                  name="address_delivery"
                  label="Địa chỉ giao hàng"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ giao hàng!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="province_delivery"
                  label="Tỉnh/Thành phố giao hàng"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉnh/thành phố giao hàng!",
                    },
                  ]}
                  style={{ minWidth: "320px", flex: "1 1 0%" }}
                >
                  <Select placeholder="Chọn khu vực">
                    {dataProvinces?.map((dt) => (
                      <Option key={dt.province_id} value={dt.province_id}>
                        {dt.name_province}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </SubMenu>
          </Menu>

          <Form.Item
            style={{ width: "100%", display: "flex", justifyContent: "end" }}
          >
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

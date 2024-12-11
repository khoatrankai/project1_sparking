"use client";
import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  DatePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { IoAddOutline } from "react-icons/io5";
import usePostData from "@/hooks/usePostData";
import { ICreateProject } from "@/models/projectInterface";
import projectService from "@/services/projectService";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";

const ModalAddProject = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { datas: dataUsers } = useSelector(
    (state: RootState) => state.get_users
  );

  const { datas: dataTypes } = useSelector(
    (state: RootState) => state.type_projects
  );
  const { datas: dataCustomer } = useSelector(
    (state: RootState) => state.infos_customer
  );
  const { postdata } = usePostData();

  const [form] = useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: ICreateProject) => {
    try {
      console.log(values);
      const statusCode = await postdata(() =>
        projectService.createProject(values)
      );
      if (statusCode === 201) {
        dispatch(fetchProjects());
        form.resetFields();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
      >
        Tạo dự án
      </Button>
      <Modal
        title="Điền form dự án"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}
        >
          <Form.Item
            name="name"
            label="Tên dự án"
            style={{ minWidth: "320px", flex: "1 1 0%" }}
            rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
          >
            <Input placeholder="Tên dự án" />
          </Form.Item>
          <Form.Item
            name="customer"
            label="Khách hàng"
            style={{ minWidth: "320px", flex: "1 1 0%" }}
            rules={[
              { required: true, message: "Vui lòng nhập tên khách hàng" },
            ]}
          >
            <Select placeholder="Chọn khách hàng">
              {dataCustomer?.map((item) => (
                <Select.Option key={item.info_id} value={item.info_id}>
                  {item.name_company}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            label="Loại dự án"
            style={{ minWidth: "320px", flex: "1 1 0%" }}
            rules={[{ required: true, message: "Vui lòng chọn loại dự án" }]}
          >
            <Select placeholder="Chọn loại">
              {dataTypes?.map((item) => (
                <Select.Option key={item.type_id} value={item.type_id}>
                  {item.name_type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            style={{ minWidth: "220px", flex: "1 1 0%" }}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="waiting">Đang chờ</Select.Option>
              <Select.Option value="start">Bắt đầu</Select.Option>
              <Select.Option value="pause">Tạm dừng</Select.Option>
              <Select.Option value="cancel">Hủy</Select.Option>
              <Select.Option value="completed">Hoàn thành</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá trị (vnđ)"
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <InputNumber
              placeholder="Giá trị"
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
            name="time_job"
            label="Thời gian (giờ)"
            style={{ minWidth: "220px", flex: "1 1 0%" }}
          >
            <InputNumber placeholder="Thời gian công việc" className="w-full" />
          </Form.Item>

          <Form.Item
            name="user_support"
            label="Nhân viên hỗ trợ"
            style={{ minWidth: "220px", flex: "1 1 0%" }}
          >
            <Select placeholder="Chọn nhân viên">
              {dataUsers?.map((item) => (
                <Select.Option key={item.user_id} value={item.user_id}>
                  {item.first_name} {item.last_name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="start_date"
            label="Ngày bắt đầu"
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <DatePicker
              placeholder="Chọn ngày bắt đầu"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="end_date"
            label="Ngày kết thúc"
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <DatePicker
              placeholder="Chọn ngày kết thúc"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item name="description" label="Mô tả" style={{ width: "100%" }}>
            <Input.TextArea
              placeholder="Mô tả dự án"
              autoSize={{ minRows: 3 }}
            />
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
};

export default ModalAddProject;

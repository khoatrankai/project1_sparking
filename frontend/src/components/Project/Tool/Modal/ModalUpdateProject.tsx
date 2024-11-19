"use client";
import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import moment from "moment";
import { useForm } from "antd/es/form/Form";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import projectService from "@/services/projectService";
import usePostData from "@/hooks/usePostData";
import { IUpdateProject } from "@/models/projectInterface";
import { fetchProjects } from "@/redux/store/slices/projectSlices/get_all_project.slice";

type Props = {
  ID: string;
};

const ModalUpdateProject = ({ ID }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { datas: dataCustomer } = useSelector(
    (state: RootState) => state.infos_customer
  );
  const [form] = useForm();
  const dispatch = useDispatch<AppDispatch>();

  const { datas: dataUsers } = useSelector(
    (state: RootState) => state.get_users
  );
  const { postdata } = usePostData();

  const fetchData = async () => {
    const res = await projectService.getProject(ID);
    if (res.statusCode === 200) {
      console.log(res.data);
      form.setFieldsValue(res.data);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    fetchData();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: IUpdateProject) => {
    try {
      const statusCode = await postdata(() =>
        projectService.updateProject(ID, values)
      );
      if (statusCode === 200) {
        dispatch(fetchProjects());
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <>
      <Button
        type="text"
        className="text-xs text-yellow-500 font-semibold"
        onClick={showModal}
      >
        Chỉnh sửa
      </Button>
      <Modal
        title="Cập nhật dự án"
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
            getValueProps={(value) => ({ value: value ? moment(value) : null })}
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
            getValueProps={(value) => ({ value: value ? moment(value) : null })}
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
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalUpdateProject;

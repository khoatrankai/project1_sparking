import usePostData from "@/hooks/usePostData";
import { CreateUser } from "@/models/userInterface";
import { fetchUserInfo } from "@/redux/store/slices/userSlices/get_users.slice";
import { AppDispatch } from "@/redux/store/store";
import userService from "@/services/userService";
import CustomFormData from "@/utils/CustomFormData";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Tabs,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TabPane from "antd/es/tabs/TabPane";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  ID: string;
};

export default function ModalUpdateUser({ ID }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = useForm();

  const { postdata } = usePostData();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [filePicture, setFilePicture] = useState<UploadFile>();

  const showModal = async () => {
    setIsModalVisible(true);
    fetchData();
  };

  const fetchData = async () => {
    const res = await userService.getUserIDAdmin(ID);
    if (res.statusCode === 200) {
      form.setFieldsValue(res.data);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange: UploadProps["onChange"] = ({ file: newFileList }) => {
    setFilePicture(newFileList);
  };

  const handleSubmit = async (values: CreateUser) => {
    const formdata = CustomFormData({
      ...values,
      picture_url: [filePicture?.originFileObj as File],
    });
    const res = await postdata(() => userService.createUser(formdata));
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
      dispatch(fetchUserInfo());
      form.resetFields();
    }
  };

  const btnSubmit = async () => {
    form.submit();
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
        title="Tạo nhân viên"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin nhân viên" key={1}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap", columnGap: "12px" }}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email hợp lệ!",
                  },
                  {
                    max: 50,
                    message: "Email không được vượt quá 50 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  {
                    min: 1,
                    max: 50,
                    message: "Mật khẩu phải từ 1 đến 50 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                name="first_name"
                label="Họ"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ!",
                  },
                  {
                    min: 1,
                    max: 20,
                    message: "Họ phải từ 1 đến 20 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập họ" />
              </Form.Item>

              <Form.Item
                name="last_name"
                label="Tên"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên!",
                  },
                  {
                    min: 1,
                    max: 20,
                    message: "Tên phải từ 1 đến 20 ký tự!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>

              <Form.Item
                name="phone_number"
                label="Số điện thoại"
                rules={[
                  {
                    type: "string",
                    required: false,
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item
                name="link_facebook"
                label="Facebook"
                rules={[
                  {
                    type: "url",
                    message: "URL Facebook không hợp lệ!",
                    required: false,
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập URL Facebook" defaultValue={""} />
              </Form.Item>

              <Form.Item
                name="link_in"
                label="LinkedIn"
                rules={[
                  {
                    type: "url",
                    message: "URL LinkedIn không hợp lệ!",
                    required: false,
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập URL LinkedIn" defaultValue={""} />
              </Form.Item>

              <Form.Item
                name="link_skype"
                label="Skype"
                rules={[
                  {
                    type: "url",
                    required: false,
                    message: "URL Skype không hợp lệ!",
                  },
                ]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập URL Skype" defaultValue={""} />
              </Form.Item>
              <Form.Item
                // valuePropName="fileList"
                // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                name="picture_url"
                label="Ảnh đại diện"
                className="!m-0"
                // rules={[{ required: false, message: "Vui lòng chọn loại thuế!" }]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Upload
                  maxCount={1}
                  action=""
                  listType="picture-card"
                  // fileList={fileList}
                  // onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {uploadButton}
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
              {/* <Form.Item
                name="sign_name"
                style={{ minWidth: "320px", flex: "1 1 0%" }}
              >
                <Input placeholder="Nhập chữ ký" />
              </Form.Item> */}
            </Form>
          </TabPane>
        </Tabs>
        <div className="flex justify-end w-full mt-4">
          <Button type="primary" onClick={btnSubmit}>
            Cập nhật
          </Button>
        </div>
      </Modal>
    </>
  );
}

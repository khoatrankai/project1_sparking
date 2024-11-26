"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { ProductInfo } from "@/models/productInterface";
import productService from "@/services/productService";
import CustomFormData from "@/utils/CustomFormData";
import usePostData from "@/hooks/usePostData";
import { IoAddOutline } from "react-icons/io5";
import { useForm } from "antd/es/form/Form";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { fetchProductInfos } from "@/redux/store/slices/productSlices/get_products";
import { useDispatch } from "react-redux";
import { fetchProductAbout } from "@/redux/store/slices/productSlices/get_about.slice";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ModalAddProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { postdata } = usePostData();
  const { datas: dataTypes } = useSelector(
    (state: RootState) => state.type_product
  );
  const { datas: dataProfits } = useSelector(
    (state: RootState) => state.get_profits
  );
  const { datas: dataSupplier } = useSelector(
    (state: RootState) => state.get_supplier
  );
  const { datas: dataUnits } = useSelector(
    (state: RootState) => state.unit_product
  );
  const { datas: dataVats } = useSelector(
    (state: RootState) => state.vat_system
  );
  const [form] = useForm();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleSubmit = async (values: ProductInfo) => {
    const dataImg = fileList.map((dt) => dt.originFileObj as File);
    console.log(dataImg);
    const data = { ...values, images: dataImg };
    const formData = CustomFormData(data);
    try {
      const statusCode = await postdata(() =>
        productService.createProduct(formData)
      );
      if (statusCode === 201) {
        dispatch(fetchProductInfos());
        dispatch(fetchProductAbout());
        form.resetFields();
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
        className="bg-blue-400 border-0 text-white font-semibold"
        icon={<IoAddOutline />}
        onClick={showModal}
      >
        Thêm sản phẩm
      </Button>
      <Modal
        title="Tạo sản phẩm"
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
            className="!m-0"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
          <Form.Item
            name="supplier_product"
            className="!m-0"
            label="Nhà cung cấp"
            // rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            style={{ minWidth: "245px", flex: "1 1 0%" }}
          >
            <Select
              placeholder="Chọn nhà cung cấp"
              showSearch
              filterOption={(input, option) => {
                return (option?.children?.join("") ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {dataSupplier?.map((dt) => (
                <Option key={dt.supplier_id} value={dt.supplier_id}>
                  {dt.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="type"
            className="!m-0"
            label="Loại sản phẩm"
            // rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
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
              {dataTypes?.map((dt) => (
                <Option key={dt.type_product_id} value={dt.type_product_id}>
                  {dt.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            className="!m-0 flex"
            label="Giá trị"
            rules={[{ required: true, message: "Vui lòng nhập giá trị!" }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <InputNumber defaultValue={0} className="w-full" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thông tin mô tả",
              },
            ]}
            style={{ width: "100%", margin: "0" }}
          >
            <TextArea placeholder="Mô tả" autoSize={{ minRows: 3 }} />
          </Form.Item>
          <Form.Item
            name="vat"
            className="!m-0"
            label="Thuế"
            // rules={[{ required: true, message: "Vui lòng chọn loại thuế!" }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select
              placeholder="Chọn loại thuế"
              showSearch
              filterOption={(input, option) => {
                return (option?.children?.join("") ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {dataVats?.map((dt) => (
                <Option key={dt.vat_id} value={dt.vat_id}>
                  {dt.type_vat}%
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="profit"
            className="!m-0"
            label="Lợi nhuận"
            // rules={[{ required: true, message: "Vui lòng chọn loại thuế!" }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select
              placeholder="Chọn loại lợi nhuận"
              showSearch
              filterOption={(input, option) => {
                return (option?.children?.join("") ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {dataProfits?.map((dt) => (
                <Option key={dt.profit_id} value={dt.profit_id}>
                  {dt.type_profit}%
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="unit_product"
            className="!m-0"
            label="Đơn vị sản phẩm"
            // rules={[{ required: true, message: "Vui lòng chọn loại thuế!" }]}
            style={{ minWidth: "240px", flex: "1 1 0%" }}
          >
            <Select
              placeholder="Chọn loại đơn vị"
              showSearch
              filterOption={(input, option) => {
                return (option?.children?.join("") ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }}
            >
              {dataUnits?.map((dt) => (
                <Option key={dt.unit_id} value={dt.unit_id}>
                  {dt.name_unit}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            // name="images"
            label="Ảnh sản phẩm"
            // valuePropName="fileList"
            // getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            className="!m-0"
            // rules={[{ required: false, message: "Vui lòng chọn loại thuế!" }]}
            style={{ minWidth: "320px", flex: "1 1 0%" }}
          >
            <Upload
              action=""
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              multiple
            >
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
            {previewImage && (
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
            )}
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

export default ModalAddProduct;

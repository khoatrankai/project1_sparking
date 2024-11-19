"use client";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tabs,
  Upload,
} from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import useFetchData from "@/hooks/useFetchData";
import systemService from "@/services/systemService";
import { Vat } from "@/models/systemInterface";
import { Option } from "antd/es/mentions";
import {
  ICodeProduct,
  IPictureUrl,
  ITypeProduct,
  IUnitProduct,
  ProductInfo,
} from "@/models/productInterface";
import productService from "@/services/productService";
import CustomFormData from "@/utils/CustomFormData";
import usePostData from "@/hooks/usePostData";
import { useForm } from "antd/es/form/Form";
import TabPane from "antd/es/tabs/TabPane";
import { ColumnsType } from "antd/es/table";
// import ModalQrScanner from "./ModalQrScanner";
import ModalGenerateQr from "./ModalGenerateQr";
import { AppDispatch } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { fetchProductInfos } from "@/redux/store/slices/productSlices/get_products";
import { fetchProductAbout } from "@/redux/store/slices/productSlices/get_about.slice";

type Props = {
  productID: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const ModalUpdateProduct = (props: Props) => {
  const [dataSource, setDataSource] = useState<ICodeProduct[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { postdata } = usePostData();
  const dispatch = useDispatch<AppDispatch>();
  const fetchListCode = async () => {
    const data = await productService.getProductsID(props.productID);
    if (data.statusCode === 200) {
      dispatch(fetchProductInfos());
      dispatch(fetchProductAbout());
      setDataSource(data.data);
    }
  };
  const columns: ColumnsType<ICodeProduct> = [
    {
      title: "ID sản phẩm",
      dataIndex: "code_product_id",
      key: "code_product_id",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "stored":
            color = "bg-blue-500";
            text = "Lưu kho";
            break;
          case "ordered":
            color = "bg-purple-500";
            text = "Đã đặt hàng";
            break;
          case "hired":
            color = "bg-orange-500";
            text = "Đã thuê";
            break;
          case "error":
            color = "bg-red-500";
            text = "Lỗi";
            break;
          default:
            color = "bg-gray-500";
            text = "Không xác định";
        }

        return (
          <div
            className={`flex items-center gap-1 ${color} text-white px-2 font-bold justify-center rounded-md`}
          >
            {text}
          </div>
        );
      },
    },
  ];
  const { data: dataTypes } = useFetchData<ITypeProduct[]>(
    productService.getTypes
  );
  const [form] = useForm();
  const { data: dataVats } = useFetchData<Vat[]>(systemService.getVats);
  const { data: dataUnits } = useFetchData<IUnitProduct[]>(
    productService.getUnits
  );

  const fetchData = async () => {
    const res = await productService.getProductID(props.productID);
    if (res.statusCode === 200) {
      form.setFieldsValue({
        ...res.data,
        type: res.data?.type?.type_product_id,
        unit_product: res.data?.unit_product?.unit_id,
      });
      setFileList(
        res.data?.picture_urls?.map((dt: IPictureUrl) => {
          return {
            uid: dt?.picture_id,
            name: "",
            status: "done",
            url: dt?.url,
          };
        })
      );
    }
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [listImgRemove, setListImgRemove] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
    fetchData();
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
    const data = {
      ...values,
      images: dataImg.filter((dt) => dt !== undefined),
    };

    const formData = CustomFormData(data);
    // console.log(formData.getAll("images"));
    try {
      const statusCode = await postdata(() =>
        productService.updateProductInfo(
          props.productID,
          formData,
          listImgRemove
        )
      );
      if (statusCode === 200) {
        dispatch(fetchProductInfos());
        dispatch(fetchProductAbout());
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleRemove = (value: { uid: string }) => {
    setListImgRemove([...listImgRemove, value.uid]);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    fetchListCode();
  }, []);
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
        title="Tạo sản phẩm"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin sản phẩm" key={1}>
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
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
                style={{ width: "100%" }}
              >
                <Input placeholder="Tên sản phẩm" />
              </Form.Item>
              <Form.Item
                name="type"
                className="!m-0"
                label="Loại sản phẩm"
                // rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
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
                style={{ minWidth: "320px", flex: "1 1 0%" }}
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
                style={{ minWidth: "320px", flex: "1 1 0%" }}
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
                name="unit_product"
                className="!m-0"
                label="Đơn vị sản phẩm"
                // rules={[{ required: true, message: "Vui lòng chọn loại thuế!" }]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
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
                  onRemove={handleRemove}
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
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </Form.Item>
              <Form.Item
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Số lượng sản phẩm" key={2}>
            <ModalGenerateQr
              productID={props.productID}
              fetchListCode={fetchListCode}
            />
            <Table<ICodeProduct>
              columns={columns}
              // rowSelection={rowSelection}
              dataSource={dataSource}
              pagination={{
                pageSize: 10,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`,
              }}
              showSorterTooltip={{ target: "sorter-icon" }}
            />
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default ModalUpdateProduct;

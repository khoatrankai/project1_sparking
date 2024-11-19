import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import { ICreatePriceQuote } from "@/models/priceQuoteInterface";
import { IGetProductInfo } from "@/models/productInterface";

import { Vat } from "@/models/systemInterface";
import { InfoUser } from "@/models/userInterface";
import { RootState } from "@/redux/store/store";
import priceQuoteService from "@/services/priceQuoteService";
import systemService from "@/services/systemService";
import userService from "@/services/userService";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tabs,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Option } from "antd/es/mentions";
import { ColumnsType } from "antd/es/table";
import TabPane from "antd/es/tabs/TabPane";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

type Props = {
  ID: string;
};

export default function ModalUpdatePriceQuote({ ID }: Props) {
  const { data: dataVats } = useFetchData<Vat[]>(systemService.getVats);
  const { datas: dataProjects } = useSelector(
    (state: RootState) => state.get_projects
  );
  const { datas: dataProducts } = useSelector(
    (state: RootState) => state.info_products
  );
  const [tabFormProduct, setTabFormProduct] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<IGetProductInfo[] | []>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [typeDiscount, setTypeDiscount] = useState<string | undefined>(
    "percent"
  );
  const [typeVat, setTypeVat] = useState<string | undefined>("none");
  const [priceTotal, setPriceTotal] = useState<number>(0);
  const [priceDiscount, setPriceDiscount] = useState<number>(0);
  const [priceVat, setPriceVat] = useState<number>(0);
  const selectAfter = (
    <Select
      defaultValue="percent"
      onChange={(e) => {
        setTypeDiscount(e);
      }}
    >
      <Option value="percent">%</Option>
      <Option value="money">vnđ</Option>
    </Select>
  );
  const columns: ColumnsType<IGetProductInfo> = [
    {
      title: "Loại sản phẩm",
      dataIndex: ["type", "name"],
      key: "type",
      render: (value) => <div className="flex gap-1 items-center">{value}</div>,
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "product_id",
      key: "product_id",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (value, record) => {
        const maxQuantity = dataProducts.find(
          (dt) => dt.product_id === record.product_id
        )?.quantity;
        console.log(maxQuantity);
        return (
          <>
            <InputNumber
              onChange={(e) => {
                setDataSource((preValue) => {
                  return preValue.map((dt) => {
                    if (dt.product_id === record.product_id) {
                      return { ...dt, quantity: e };
                    }
                    return dt;
                  });
                });
              }}
              min={1}
              disabled={maxQuantity === 0}
              value={value}
              max={maxQuantity}
            />
          </>
        );
      },
    },
    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Thuế VAT",
      dataIndex: "vat",
      key: "vat",
      render: (value) => (
        <>
          {
            dataVats?.find((dt) => {
              return dt.vat_id === value;
            })?.type_vat
          }
          %
        </>
      ),
    },

    {
      title: "Giá sản phẩm (VNĐ)",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return `${price.toLocaleString("vi-VN")}đ`;
      }, // Định dạng số thành VNĐ
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (value, record) => (
        <div className="flex gap-2 items-center">
          {/* <Button type="primary" className="bg-yellow-500" icon={<MdEdit />} /> */}
          <Button
            type="primary"
            onClick={() => {
              setDataSource((preValue) => {
                return preValue.filter(
                  (dt) => dt.product_id !== record.product_id
                );
              });
            }}
            className="bg-red-500"
            icon={<MdDelete />}
          />
        </div>
      ), // Định dạng số thành VNĐ
    },
  ];
  const [form] = useForm();
  const [formProduct] = useForm();
  const { postdata } = usePostData();

  const { data: dataUsers } = useFetchData<InfoUser[]>(userService.getUsers);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values: ICreatePriceQuote) => {
    const res = await postdata(() =>
      priceQuoteService.createPriceQuote({
        ...values,
        products: dataSource.map((dt) => {
          return {
            price: dt.price,
            product: dt.product_id,
            quantity: dt.quantity,
            vat: dt.vat,
          };
        }),
      })
    );
    if (res === 200 || res === 201) {
      setIsModalVisible(false);
    }
  };

  const handleAddProduct = () => {
    formProduct.submit();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await priceQuoteService.getPriceQuoteID(ID);
      if (res.statusCode === 200) {
        setDataSource(res.data.products);
        form.setFieldsValue({
          ...res.data,
          date_start: "2024-11-04T01:45:00.000Z",
        });
      }
    };
    if (ID) {
      fetchData();
    }
  }, [ID]);

  useEffect(() => {
    if (dataSource) {
      const total = dataSource.reduce((preValue, currValue) => {
        return currValue.price * currValue.quantity + preValue;
      }, 0);

      setPriceTotal(total);

      if (typeVat === "before") {
        const totalDiscount =
          typeDiscount === "percent"
            ? dataSource.reduce((preValue, currValue) => {
                return (
                  (currValue.price * currValue.quantity * discount) / 100 +
                  preValue
                );
              }, 0)
            : discount;
        const totalVat =
          typeDiscount === "percent"
            ? dataSource.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    (currValue.price * currValue.quantity * discount) / 100) *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0)
            : dataSource.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    ((currValue.price * currValue.quantity) / total) *
                      discount) *
                    (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                      ?.type_vat ?? 0)) /
                    100 +
                  preValue
                );
              }, 0);
        setPriceVat(totalVat);
        setPriceDiscount(totalDiscount);
      } else {
        // const totalDiscount = typeDiscount === "percent"? dataSource.reduce((preValue, currValue) => {
        //   return currValue.price * currValue.quantity * discount/100 + preValue;
        // }, 0) : discount
        const totalVat = dataSource.reduce((preValue, currValue) => {
          return (
            (currValue.price *
              currValue.quantity *
              (dataVats?.find((dt) => dt.vat_id === currValue.vat)?.type_vat ??
                0)) /
              100 +
            preValue
          );
        }, 0);
        const totalDiscount =
          typeDiscount === "percent"
            ? dataSource.reduce((preValue, currValue) => {
                return (
                  ((currValue.price * currValue.quantity -
                    (currValue.price *
                      currValue.quantity *
                      (dataVats?.find((dt) => dt.vat_id === currValue.vat)
                        ?.type_vat ?? 0)) /
                      100) *
                    discount) /
                    100 +
                  preValue
                );
              }, 0)
            : discount;
        setPriceVat(totalVat);
        setPriceDiscount(totalDiscount);
      }
    }
  }, [dataSource, typeDiscount, typeVat, discount]);

  const handlePush = async (data?: IGetProductInfo) => {
    if (data) {
      setDataSource((prevDataSource) => {
        const check = prevDataSource.find(
          (dt) => dt.product_id === data.product_id
        );
        const quantityMax =
          dataProducts.find((dt) => dt.product_id === check?.product_id)
            ?.quantity ?? 0;
        if (check) {
          if (quantityMax > check.quantity)
            return prevDataSource.map((dt) => {
              if (dt.product_id === data.product_id) {
                return { ...dt, quantity: dt.quantity + 1 };
              }
              return dt;
            });
          return prevDataSource;
        } else {
          return [...prevDataSource, { ...data, quantity: 1 }];
        }
      });
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
        title="Tạo báo giá"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={"100%"}
        style={{ maxWidth: "800px" }}
      >
        <Tabs defaultActiveKey="1" style={{ width: "100%" }} type="line">
          <TabPane tab="Thông tin báo giá" key={1}>
            <Form
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              style={{ display: "flex", flexWrap: "wrap", columnGap: "12px" }}
            >
              <Form.Item
                name="project"
                label="Dự án báo giá"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn dự án!",
                  },
                ]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Chọn dự án"
                  showSearch
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataProjects?.map((dt) => (
                    <Option key={dt.project_id} value={dt.project_id}>
                      {dt.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="reference_code"
                label="Mã tham chiếu"
                // rules={[
                //   {
                //     required: true,
                //     type: "string",
                //     message: "Vui lòng nhập mã tham chiếu",
                //   },
                // ]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="type_vat"
                label="Loại thuế"
                // rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select
                  placeholder="Select discount type"
                  defaultValue={"none"}
                  onChange={(e) => {
                    setTypeVat(e);
                  }}
                >
                  <Option value="none">None</Option>
                  <Option value="before">Before</Option>
                  <Option value="after">After</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="type_money"
                label="Đơn vị tiền"
                // rules={[{ required: true }]}
                style={{ minWidth: "240px", flex: "1 1 0%" }}
              >
                <Select placeholder="Select a currency type">
                  <Option value="vnd">VND</Option>
                  <Option value="usd">USD</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="user_support"
                label="Người phụ trách"
                // rules={[{ required: true }]}
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
                name="date_start"
                label="Ngày bắt đầu"
                // rules={[{ required: true }]}
                style={{ minWidth: "320px", flex: "1 1 0%" }}
                getValueProps={(value) => ({
                  value: value ? moment(value) : null,
                })}
              >
                <DatePicker
                  placeholder="Select date"
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
                  placeholder="Select date"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Thông tin sản phẩm" key={2}>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Select
                  placeholder="Chọn sản phẩm cần thêm"
                  showSearch
                  onSelect={(e) => {
                    const data = dataProducts.find((dt) => dt.product_id === e);
                    handlePush(data);
                  }}
                  filterOption={(input, option) => {
                    return (option?.children?.join("") ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                >
                  {dataProducts?.map((dt) => (
                    <Option key={dt.product_id} value={dt.product_id}>
                      {dt.name}
                    </Option>
                  ))}
                </Select>
                {/* <Button
                  type="primary"
                  onClick={() => {
                    formProduct.resetFields();
                    setTabFormProduct(!tabFormProduct);
                  }}
                >
                  Thêm khác
                </Button> */}
              </div>
              {/* <div
                className="bg-slate-200 px-1 py-2 rounded-md"
                hidden={!tabFormProduct}
              >
                <Form
                  form={formProduct}
                  onFinish={handlePush}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <Form.Item
                    name="code_product"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    style={{ minWidth: "200px", flex: "1 1 0%", margin: "0" }}
                  >
                    <Input placeholder="Mã sản phẩm" />
                  </Form.Item>
                  <Form.Item
                    name="name_product"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin sản phẩm",
                      },
                    ]}
                    style={{ minWidth: "240px", flex: "1 1 0%", margin: "0" }}
                  >
                    <Input placeholder="Tên sản phẩm" />
                  </Form.Item>

                  <Form.Item
                    name="quantity_product"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin số lượng",
                      },
                    ]}
                    style={{ minWidth: "150px", flex: "1 1 0%", margin: "0" }}
                  >
                    <InputNumber className="w-full" placeholder="Số lượng" />
                  </Form.Item>
                  <Form.Item
                    name="price_product"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin giá trị",
                      },
                    ]}
                    style={{ minWidth: "150px", flex: "1 1 0%", margin: "0" }}
                  >
                    <InputNumber className="w-full" placeholder="Giá trị" />
                  </Form.Item>
                  <Form.Item
                    name="type"
                    rules={[{ required: false }]}
                    style={{ minWidth: "100px", flex: "1 1 0%", margin: "0" }}
                  >
                    <Select placeholder="Chọn loại sản phẩm">
                      <Option key={"TB"} value={"TB"}>
                        Thiết bị
                      </Option>
                      <Option key={"VT"} value={"VT"}>
                        Vật tư
                      </Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="description"
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
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                      margin: "0",
                    }}
                  >
                    <Button
                      className="bg-green-500 text-white font-semibold"
                      onClick={handleAddProduct}
                    >
                      Thêm
                    </Button>
                  </Form.Item>
                </Form>
              </div> */}
              <div className="border-t-2 w-full overflow-x-auto">
                <div className="min-w-fit">
                  <Table<IGetProductInfo>
                    columns={columns}
                    // rowSelection={rowSelection}
                    dataSource={dataSource}
                    pagination={{
                      pageSize: 10,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{ x: "max-content", y: 200 }}
                    showSorterTooltip={{ target: "sorter-icon" }}
                  />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <div className="flex flex-col items-end gap-2 p-2 w-full bg-slate-100 rounded-sm">
          <div className="flex items-center">
            <p className="w-80 flex justify-end">Tổng:</p>
            <span className="min-w-32 flex justify-end">
              {priceTotal.toLocaleString("vi-VN")}đ
            </span>
          </div>
          <div>
            <div className="flex items-center justify-end">
              <div className="w-80 flex items-center justify-end gap-2">
                Chiết khấu{" "}
                <div className="w-60">
                  <InputNumber
                    addonAfter={selectAfter}
                    defaultValue={0}
                    onChange={(e) => {
                      setDiscount(e ?? 0);
                    }}
                  />
                </div>
              </div>

              <span className="min-w-32 flex justify-end">
                -{priceDiscount.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <p className="w-80 flex justify-end">Thuế:</p>
            <span className="min-w-32 flex justify-end">{priceVat}đ</span>
          </div>
          <div className="flex items-center text-xl text-red-500">
            <p className="w-80 flex justify-end">Thành tiền:</p>
            <span className="min-w-32 flex justify-end">
              {(priceTotal - priceDiscount + priceVat).toLocaleString("vi-VN")}đ
            </span>
          </div>
        </div>
        <div className="flex justify-end w-full mt-4">
          <Button type="primary" onClick={btnSubmit}>
            Tạo
          </Button>
        </div>
      </Modal>
    </>
  );
}

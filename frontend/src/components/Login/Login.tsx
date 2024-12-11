"use client";
import React, { useEffect } from "react";
import "./styles.scss";
// import Image from "next/image";
import { Button, Form, Image, Input } from "antd";
import Link from "next/link";
import { useForm } from "antd/es/form/Form";
import usePostData from "@/hooks/usePostData";
import userService from "@/services/userService";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "@/redux/store/slices/userSlices/get_profile.slice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// type Props = {}

export default function Login() {
  const [form] = useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { datas: dataProfile } = useSelector(
    (state: RootState) => state.get_profile
  );
  const { postdata } = usePostData();
  const handleSubmit = async (values: { email: string; password: string }) => {
    const statusCode = await postdata(() => userService.loginUser(values));
    if (statusCode === 200) {
      dispatch(fetchUserProfile());
      router.push("/admin");
    }
  };
  useEffect(() => {
    if (!dataProfile) {
      dispatch(fetchUserProfile());
    } else {
      router.push("/admin");
    }
  }, [dataProfile]);
  return (
    <div className="w-screen h-screen bg-login flex justify-center items-center">
      <div className="px-32">
        <Image
          preview={false}
          alt=""
          src="/logo.png"
          className=" h-full"
          height={80}
        />
      </div>
      <div className="border-l-2 flex flex-col px-32 gap-16 py-16 justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="font-medium text-white capitalize text-4xl">Welcome</p>
          <p className="uppercase text-base text-white font-medium">
            Please login to admin dashboard
          </p>
        </div>
        <Form
          //   layout="vertical"
          form={form}
          onFinish={handleSubmit}
          style={{}}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng nhập tài khoản",
              },
            ]}
            style={{ minWidth: "100%", flex: "1 1 0%", marginBottom: "6px" }}
          >
            <Input placeholder="Tài khoản" className="!bg-white/95" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
            style={{ minWidth: "100%", flex: "1 1 0%", margin: "0px" }}
          >
            <Input.Password placeholder="Mật khẩu" className="!bg-white/95" />
          </Form.Item>
        </Form>
        <div className="flex flex-col items-center gap-4">
          <Button
            className="w-11/12 uppercase font- bg-[#ED8A21] "
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Login
          </Button>
          <Link
            href={"#"}
            className="uppercase text-white text-sm font-medium underline "
          >
            Forgetten your password?
          </Link>
        </div>
      </div>
    </div>
  );
}

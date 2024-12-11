"use client";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { fetchUserProfile } from "@/redux/store/slices/userSlices/get_profile.slice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: React.ReactNode }) {
  const isOpen = useSelector((state: RootState) => state.status_tab_menu);
  const router = useRouter();
  const { datas: dataProfile, loading } = useSelector(
    (state: RootState) => state.get_profile
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!dataProfile && !loading) {
      dispatch(fetchUserProfile())
        .unwrap()
        .then((dt) => {
          if (dt.statusCode === 400) {
            router.push("/login");
          }
        })
        .catch(() => {
          router.push("/login");
        });
    }
  }, [dataProfile, loading, dispatch, router]);
  return (
    <>
      <Header />
      {dataProfile && (
        <>
          <div className=" flex h-screen">
            <div
              className={`h-full relative z-50 transition-all   ${
                isOpen.isOpen ? "min-w-52" : "w-0 "
              }`}
            >
              <Sidebar />
            </div>
            <div
              className={` transition-all  flex-1  ${
                isOpen.isOpen ? "max-w-[calc(100%-13rem)] " : ""
              }`}
            >
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
}

import React from "react";
import { IStu } from "../../interface/students";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axios";
import { message } from "antd";
import { IRegister } from "../../interface/auth";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();
  const queryclient = useQueryClient();
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: async (stu: IRegister) => {
      try {
        const { data } = await api.post("register", stu);
        return data;
      } catch (error) {
        throw new Error("Dang ky that bai")
      }
    },
    onSuccess: (res) => {
      message.success("Them thanh cong");
      queryclient.invalidateQueries({ queryKey: ["students"] });
      console.log(res);
      nav("/dashboard/login");
    },
    onError:(err)=>{
      message.error("Dang ky that bai")
      console.log(err);
      
    }
  });
  const onsubmit = (stu: IRegister) => {
    mutation.mutate(stu);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Dang ky
        </h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Nhập tên"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("email", {
              required: "Khong duoc bo trong",
              minLength: {
                value: 6,
                message: "Toi thieu 6 ky tu",
              },
            })}
          />
          {errors.email?.message && (
            <span className="text-red-500">{errors?.email?.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            password
          </label>
          <input
            type="text"
            id="password"
            placeholder="Nhập tên"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("password", {
              required: "Khong duoc bo trong",
              minLength: {
                value: 6,
                message: "Toi thieu 6 ky tu",
              },
            })}
          />
          {errors.password?.message && (
            <span className="text-red-500">{errors?.password?.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Thêm
        </button>
      </form>
    </div>
  );
}

export default Register;

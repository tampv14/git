import React from "react";
import { IStu } from "../../interface/students";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../config/axios";
import { message } from "antd";

function Add() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IStu>();
  const queryclient = useQueryClient();
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn: async (stu: IStu) => {
      try {
        const { data } = await api.post("students", stu);
        return data;
      } catch (error) {
        return [];
      }
    },
    onSuccess: (res) => {
      message.success("Them thanh cong");
      queryclient.invalidateQueries({ queryKey: ["students"] });
      console.log(res);
      nav("/dashboard/students");
    },
  });
  const onsubmit = (stu: IStu) => {
    mutation.mutate(stu);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Thêm Thông Tin
        </h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên
          </label>
          <input
            type="text"
            id="name"
            placeholder="Nhập tên"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("name", {
              required: "Khong duoc bo trong",
              minLength: {
                value: 6,
                message: "Toi thieu 6 ky tu",
              },
            })}
          />
          {errors.name?.message && (
            <span className="text-red-500">{errors?.name?.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Tuổi
          </label>
          <input
            type="number"
            id="age"
            placeholder="Nhập tuổi"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("age", {
              required: "Khong duoc bo trong",
              min: {
                value: 0,
                message: "Khong am",
              },
            })}
          />
          {errors.age?.message && (
            <span className="text-red-500">{errors?.age?.message}</span>
          )}
        </div>
        <div>
          <label
            htmlFor="emaiL"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="emaiL"
            id="emaiL"
            placeholder="Nhập email"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("emaiL")}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Nhập số điện thoại"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("phone")}
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            anh
          </label>
          <input
            type="text"
            id="image"
            placeholder="Nhập số điện thoại"
            className="mt-1 block w-full rounded-xl border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register("image")}
          />
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

export default Add;

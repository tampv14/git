import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import { api } from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { Button, Input, message, Popconfirm, Table } from 'antd';

function ListSt() {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      try {
        const { data: stu } = await api.get('students')
        return stu
      } catch (error) {
        return []
      }
    }
  })
  console.log('data', data);
  

  const queryClient = useQueryClient()
  const nav = useNavigate()

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await api.delete(`students/${id}`)
      } catch (error) {
        return []
      }
    },
    onSuccess: () => {
      message.success("Xóa thành công");
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })

  const Del = (id: string) => {
    mutation.mutate(id);
  };

  const filteredData = data?.filter((item: any) =>{
    console.log(item);
    
   return item.name?.toLowerCase().includes(searchText.toLowerCase())
});

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_: any, __: any, index: number) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'emaiL',
      dataIndex: 'emaiL',
      key: 'emaiL',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <img src={image} width={90} alt="student" />
    },
    {
      title: 'action',
      dataIndex: 'id',
      key: 'action',
      render: (id: string) => <>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => Del(id)}
        >
          <Button danger>Delete</Button>
        </Popconfirm>
        <Button type='primary' onClick={() => nav(`/dashboard/students/edit/${id}`)}>Sửa</Button>
      </>
    },
  ];

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <Input
        placeholder='Tìm kiếm'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className='mb-4'
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey={(data) => data.id}
        loading={isLoading}
      />
    </div>
  )
}

export default ListSt

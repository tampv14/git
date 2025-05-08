import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { api } from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { Button, message, Popconfirm, Table } from 'antd';

function ListSt() {
  const {data} = useQuery({
    queryKey:['students'],
    queryFn:async()=>{
      try {
        const {data:stu} = await api.get('students')
        return stu
      } catch (error) {
return []        
      }
    }
  })
  const queryclient = useQueryClient()
  const nav = useNavigate()
  const muation = useMutation({
    mutationFn:async(id:string)=>{
      try {
        await api.delete(`students/${id}`)
      } catch (error) {
        return []
        
      }
    },
    onSuccess:()=>{
      message.success("Xoa thanh cong");
      queryclient.invalidateQueries({queryKey:['students']})

    }
  })
  const Del = (id:string)=>{
    muation.mutate(id);

  }

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render:(_:any,__:any,index :number)=>index+1
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
      title: 'email',
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
      render:(image:string)=><img src={image} width={90} />
    },
    {
      title: 'action',
      dataIndex: 'id',
      key: 'action',
      render:(id:string)=><>
      <Popconfirm
    title="Delete the task"
    description="Are you sure to delete this task?"
    okText="Yes"
    cancelText="No"
    onConfirm={()=>Del(id)}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
  <Button type='primary' onClick={()=>nav(`/dashboard/students/edit/${id}`)}>Sua</Button>
      </>
    },
  ];
  return (
    <div>
      <h1>Danh sach san pham</h1>
      <Table dataSource={data} columns={columns} rowKey={(data)=>data.id} />;
    </div>
  )
}

export default ListSt

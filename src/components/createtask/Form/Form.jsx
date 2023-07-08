import React, { useEffect, useState } from 'react';
import './form.scss';
import { auth, firestore } from '../../../firebase';
import { doc, setDoc, addDoc, collection } from "firebase/firestore"; 
import { Input, Button, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import { isOpen } from '../../../redux/slices/drawerslice';

const CustomForm = () => {
  const { TextArea } = Input;
  const [uid, setUid] = useState('');
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onFinish = async (values) => {
    const db = firestore;
    try {
      const userDocRef = doc(db, "users", uid);
      await setDoc(userDocRef, { User_Id: uid });
      const tasksCollectionRef = collection(userDocRef, "tasks");
      await addDoc(tasksCollectionRef, { 
        Title: values.title,
        Description: values.description
      });
      message.success("Tasks Created Successfully");
      dispatch(isOpen(false));

      form.resetFields();
    } catch (error) {
      console.error('Error adding data to the document:', error);
    }
  };
  
  return (
    <Form className='form' onFinish={onFinish} form={form}> {/* Assign the form instance */}
      <Form.Item name='title' className='margin'>
        <Input type='text' placeholder='Title' required />
      </Form.Item>
      <Form.Item name='description' className='margin'>
        <TextArea rows={4} placeholder='Task Description' required />
      </Form.Item>
      <Form.Item>
        <Button className='margin btn' htmlType='submit'>
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;

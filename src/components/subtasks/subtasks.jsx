import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import './subtasks.scss';
import { addDoc, collection, query, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../../firebase';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSubtasks } from '../../redux/slices/subtasksslice';

const Subtasks = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = auth.currentUser;
  const uid = user?.uid;
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchSubtasks = useCallback(async () => {
    try {
      const subtasksRef = collection(firestore, 'users', uid, 'tasks', id, 'subtasks');
      const subtasksQuery = query(subtasksRef);

      // Listen for real-time updates to subtasks
      const unsubscribe = onSnapshot(subtasksQuery, (snapshot) => {
        const subtasks = [];
        snapshot.forEach((doc) => {
          subtasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        dispatch(getSubtasks(subtasks));
      });

      // Unsubscribe from real-time updates when component unmounts
      return () => unsubscribe();
    } catch (error) {
      console.error('Error fetching subtasks:', error);
    }
  }, [dispatch, uid, id]);

  useEffect(() => {
    fetchSubtasks();
  }, [fetchSubtasks]);

  const onFinish = async (values) => {
    try {
      const subtaskData = {
        title: values.Title,
        description: values.Description,
      };

      const subtasksRef = collection(firestore, 'users', uid, 'tasks', id, 'subtasks');
      await addDoc(subtasksRef, subtaskData);
      message.success("Subtask Created Successfully");
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating subtask:', error);
    }
  };

  return (
    <div className='subtasks'>
      <Modal title="Create Subtasks" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
        <Form onFinish={onFinish}>
          <Form.Item name='Title' className='margin'>
            <Input type='text' placeholder='Title' required />
          </Form.Item>
          <Form.Item name='Description' className='margin'>
            <TextArea rows={4} placeholder='Task Description' required  />
          </Form.Item>
          <Form.Item>
            <Button className='margin btn' htmlType='submit'>
              Create Subtask
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        Create Subtask
      </Button>
    </div>
  );
};

export default Subtasks;

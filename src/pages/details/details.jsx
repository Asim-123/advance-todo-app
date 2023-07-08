import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { AppHeader } from '../../components/header/AppHeader';
import { Button, message, Modal, Form, Input, List } from 'antd';
import { DeleteFilled } from '@ant-design/icons'
import './detail.scss';
import { firestore, auth } from '../../firebase';
import { BackwardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Subtasks from '../../components/subtasks/subtasks';
import { getSubtasks } from '../../redux/slices/subtasksslice';

const Details = () => {
  const subtasks = useSelector((state) => state.subtasks.values);
  const dispatch = useDispatch();
  console.log("subtasks", subtasks);
  const { id } = useParams();
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const uid = user?.uid;
  const [selectedItem, setSelectedItem] = useState(null);

  if (!uid) {
    navigate('/');
  }
  useEffect(() => {
    const fetchSelectedItem = async () => {
      try {
        const taskDocRef = doc(firestore, 'users', uid, 'tasks', id);
        const taskDocSnap = await getDoc(taskDocRef);
        if (taskDocSnap.exists()) {
          setSelectedItem(taskDocSnap.data());
        } else {
          setSelectedItem(null);
        }
      } catch (error) {
        console.error('Error fetching selected item:', error);
        setSelectedItem(null);
      }
    };

    fetchSelectedItem();
  }, [id, uid]);

  useEffect(() => {
    dispatch(getSubtasks([])); // Initialize subtasks with an empty array
  }, [dispatch]);

  const handleDeleteTask = async () => {
    try {
      // Delete the main task
      const taskDocRef = doc(firestore, 'users', uid, 'tasks', id);
      await deleteDoc(taskDocRef);

      message.success('Task deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
      message.error('Failed to delete task');
    }
  };

  const handleDeleteSubtask = async (subtaskId) => {
    try {
      // Delete the subtask
      const subtaskDocRef = doc(firestore, 'users', uid, 'tasks', id, 'subtasks', subtaskId);
      await deleteDoc(subtaskDocRef);

      message.success('Subtask deleted successfully');
    } catch (error) {
      console.error('Error deleting subtask:', error);
      message.error('Failed to delete subtask');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      const taskDocRef = doc(firestore, 'users', uid, 'tasks', id);
      await updateDoc(taskDocRef, values);
      message.success('Task updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
      message.error('Failed to update task');
    }
    setLoading(false);
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <>
      <AppHeader />
      <div className='details'>
        <BackwardOutlined className='back-btn' onClick={goBack} />
        <h1>Details Page</h1>
        <Subtasks className="ml" />
        {selectedItem ? (
          <div>
            <p><b>Title: </b> {selectedItem.Title}</p>
            <p><b>Description: </b> {selectedItem.Description}</p>
          </div>
        ) : (
          <p>No data found for the selected item.</p>
        )}
        <h1>Subtasks</h1>
        <List
          itemLayout="horizontal"
          dataSource={subtasks}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.title}
                description={item.description}
              />
              <DeleteFilled className='del-btn' onClick={() => handleDeleteSubtask(item.id)} />
            </List.Item>
          )}
        />
        <Modal title="Edit Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer="">
          <Form onFinish={handleFormSubmit}>
            <Form.Item name='Title' className='margin'>
              <Input type='text' defaultValue={selectedItem?.Title} placeholder='Title' required />
            </Form.Item>
            <Form.Item name='Description' className='margin'>
              <TextArea rows={4} defaultValue={selectedItem?.Description} placeholder='Task Description' required />
            </Form.Item>
            <Form.Item>
              <Button className='margin btn' htmlType='submit' loading={loading}>
                Update Task
              </Button>
            </Form.Item>
          </Form>
          <ul>
          </ul>
        </Modal>
        <Button className='details-btn' type='primary' onClick={showModal}>
          Edit
        </Button>
        <Button className='details-btn ml' type='primary' danger onClick={handleDeleteTask}>
          Delete
        </Button>
      </div>
    </>
  );
};

export default Details;

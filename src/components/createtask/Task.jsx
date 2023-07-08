import React from 'react';
import './task.scss';
import { Button, Drawer } from 'antd';
import Form from './Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { isOpen } from '../../redux/slices/drawerslice';

const Task = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector((state) => state.drawer.open);

  const showDrawer = () => {
    dispatch(isOpen(true));
  };

  const onClose = () => {
    dispatch(isOpen(false));
  };

  return (
    <div className='container'>
      <Button className='btn' onClick={showDrawer}>+Create Task</Button>
      <Drawer title='Create Task' placement='top' onClose={onClose} open={isDrawerOpen}>
        <Form />
      </Drawer>
    </div>
  );
};

export default Task;

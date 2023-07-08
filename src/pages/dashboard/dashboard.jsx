import React from 'react'
import { AppHeader } from '../../components/header/AppHeader'
import Task from '../../components/createtask/Task'
import CustomList from '../../components/createtask/tasklist/CustomList'
const Dashboard = () => {
  return (
    <div className='dashboard'>
        <AppHeader />
        <Task />
        <CustomList />
        
    </div>
  )
}

export default Dashboard
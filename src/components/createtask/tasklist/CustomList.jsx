import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './list.scss';
import { Avatar, List, Spin, message } from 'antd';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore, auth } from '../../../firebase';
import { getData } from '../../../redux/slices/dataslice';

const CustomList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = auth.currentUser;
  const uid = user.uid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksCollectionRef = collection(firestore, 'users', uid, 'tasks');
        const querySnapshot = await getDocs(tasksCollectionRef);
        const tasks = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          };
        });
        setData(tasks);
        dispatch(getData(tasks));
        setLoading(false);

        // Listen for real-time updates to the tasks collection
        const unsubscribe = onSnapshot(tasksCollectionRef, (snapshot) => {
          const updatedTasks = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(updatedTasks);
          dispatch(getData(updatedTasks));
        });

        // Unsubscribe from real-time updates when component unmounts
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        setError('Failed to fetch data from Firestore');
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, uid]);

  if (loading) {
    return (
      <div className='spin'>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>{message.error('Something wrong, try again later')}</div>;
  }

  return (
    <List
      className='list'
      itemLayout="horizontal"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 8,
        align: "center"
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel`} />}
            title={
              <Link to={`/details/${item.id}`}>
                {item?.Title || ''}
              </Link>
            }
            description={item?.Description || ''}
          />
        </List.Item>
      )}
    />
  );
};

export default CustomList;

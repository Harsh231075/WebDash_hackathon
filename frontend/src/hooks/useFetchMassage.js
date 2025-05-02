import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages ,clearMessages} from '../Redux/messageSlice';



const useFetchMessages = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
 const selectedUser=useSelector((state)=>state.selectedUser.selectedUser);

  const fetchMessages = async (userId) => {
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    
    setLoading(true);
    try {
      console.log(selectedUser);
      // console.log("id mili =>",userId);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_FRONTEND_URL}/api/message/get/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    // console.log("reponse=>",response)
      if (response.status === 200) {
        dispatch(clearMessages(''));
        dispatch(setAllMessages(response.data?.conversation?.message));
      } else if (response.status === 404) {
        dispatch(clearMessages(''));
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error.response?.status === 404) {
        dispatch(clearMessages(''));
      }
    } finally {
      setLoading(false);
    }
  };

  return { fetchMessages, loading };
}

export default useFetchMessages;

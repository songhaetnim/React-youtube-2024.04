import React, { useState, useEffect } from "react";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { useChannelInfo } from "../api/youtube";

export default function ChannelInfo({ id, name }) {
  const { url } = useChannelInfo(id);

  const [subscriberCount, setSubscriberCount] = useState(null);
  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&part=statistics`);
        const { data } = response;
        const { items } = data;
        const subscriberCount = items[0].statistics.subscriberCount;
        setSubscriberCount(subscriberCount);
      } catch (error) {
        console.error('Error fetching subscriber count:', error);
      }
    };

    fetchSubscriberCount();
  }, [id]);

  return (
    <Stack direction={'row'} sx={{alignItems: 'center'}} spacing={1} >
      <a href={`https://www.youtube.com/channel/${id}`}>
        {url && <img src={url} alt={name} height={64} width={64} style={{borderRadius: 50}}/>}
      </a>
      <Stack spacing={2}>
        <h3>{name}</h3>
        {subscriberCount && <p style={{fontSize:15}}>구독자: {subscriberCount >= 10000 ? `${(subscriberCount / 10000).toFixed(0)}만명` : subscriberCount >= 1000 ? `${(subscriberCount / 1000).toFixed(1)}천명` : subscriberCount+'명'}</p>}
      </Stack>
    </Stack>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './API.module.scss';

// Display one video at a time on screen, and navigate to next video on scroll.
// Only the video which in viewport should autoplay and rest should be paused.
// Neha Kumari4:02 PM
// neha.k@thesilverlabs.com


const API = () => {

    const [data, setData] = useState('');
    const [error, setError] = useState('');

    const url = 'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json';
    const getData = async () => {
        try {
            const url = 'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json';
            const res = await axios.get(url);
            setData(res.data);
        }
        catch (e) {
            setError(e.message);
        }

    }

    useEffect(() => {
        getData();
        // return () => {};    //it's not necessary, but we can put when we recieved such errors like destroy is not a fuction
    }, []);


    return (
        <div className={style.container}>
            {
                error !== '' && <h2> {error}</h2>
            }
            <div>
                {
                    Array.isArray(data) ? data?.map((item) => {
                        const { author, description, duration, id, isLive, subscriber, thumbnailUrl, uploadTime, videoUrl, views } = item;
                        return <div>
                            <h3>Title: {author}</h3>
                            <p>{description}</p>
                            <p>Duration: {duration}</p>
                            {/* <p>{isLive}</p> */}
                            <p>Subscribers: {subscriber}</p>
                            <p>Upload Time: {uploadTime}</p>
                            <video width="320" height="240" controls>
                                <source src={videoUrl} type="video/ogg" />
                            </video>
                            <a href={thumbnailUrl} target="_blank">Click here for thumbnail Url</a>
                            <p>Views: {views}</p>
                        </div>
                    }) : []
                }
            </div>
        </div>
    )
}

export default API;

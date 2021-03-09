import React, { useEffect, useState } from 'react';
import './app.css';
import Header from './components/header/header';
import VideoPlayer from './components/videoPlayer/videoPlayer';
import VideoList from './components/videoList/videoList';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=US&key=AIzaSyBqo7QpWz1NEVymWe2a2SfQ1_Hzk1veklA',
      requestOptions
    )
      .then(response => response.json())
      .then(json => setVideos(json.items))
      .catch(console.error);
  }, []);

  const onSubmit = inputValue => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${inputValue}&regionCode=US&type=video&key=AIzaSyBqo7QpWz1NEVymWe2a2SfQ1_Hzk1veklA`,
      requestOptions
    )
      .then(response => response.json())
      .then(json => setVideos(json.items))
      .catch(console.error);
  };

  const onSelect = id =>
    setVideos(videos =>
      videos.map(video => {
        if (video.id.videoId === id || video.id === id) {
          return { ...video, selected: true };
        } else {
          return { ...video, selected: false };
        }
      })
    );

  const selectedVideo = videos.filter(video => video.selected)[0];

  return (
    <>
      <Header onSubmit={onSubmit} />
      <main>
        {selectedVideo && (
          <VideoPlayer
            id={selectedVideo.id.videoId || selectedVideo.id}
            snippet={selectedVideo.snippet}
          />
        )}
        <VideoList
          videos={videos}
          onSelect={onSelect}
          toBeSide={Boolean(selectedVideo)}
        />
      </main>
    </>
  );
}

export default App;

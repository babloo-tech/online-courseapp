

import { BACKEND_URL } from '../utils/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToSavedList } from '../slicers/video-slicer';
import { RootState } from '../store/store';
import { VideoContract } from '../contracts/VideoContract';
import './user-dashboard.css';
import './cart.css';

export function UserDashboard() {
  const dispatch = useDispatch();
  const videosCount = useSelector((state: RootState) => state.video.videosCount);
  const saveVideo = useSelector((state: RootState) => state.video.videos);

  const [showWatchLater, setShowWatchLater] = useState(false);

  const [cookie, , removeCookie] = useCookies(['userid']);
  const navigate = useNavigate();

  const [allVideos, setAllVideos] = useState<VideoContract[]>([]);
  const [videos, setVideos] = useState<VideoContract[]>([]);
  const [searchTerm, setSearchTerm] = useState('');


  const videosToRender = showWatchLater ? saveVideo : videos;



  useEffect(() => {
    if (!cookie['userid']) {
      navigate('/user-login');
    } else {
      loadVideos();
    }
  }, []);

  const loadVideos = () => {
    axios.get(`${BACKEND_URL}/get-videos`).then((response) => {
      setAllVideos(response.data);
      setVideos(response.data);
    });
  };

  const handleSaveClick = (videos: VideoContract) => { // parameter event
    dispatch(addToSavedList(videos));
  };


  const handleClickSearch = (e: any) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setVideos(allVideos);
    } else if (searchTerm.trim().length >= 5) {
      const result = allVideos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVideos(result);
    }
  };

  const userSignout = () => {
    if (confirm("Are you sure you want to logout?")) {
      removeCookie('userid');
      navigate('/');
    }
  };

  return (
    <div>
      <header className="d-flex justify-content-between p-2 fixed-top">
        <h5 className="ms-5 bi bi-person-fill">
          {cookie['userid']}-Dashboard
          <form method="get" className="input-group mt-3 ms-" style={{ paddingTop: '23px', width: '280px' }}>
            <input onKeyUp={handleClickSearch}
              placeholder="Search video...."
              name="search"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
              type="text"
            />
            <button
              onClick={handleClickSearch}
              className="bi bi-search btn btn-warning">
             </button>
          </form>
        </h5>
        <div>
          <button style={{ marginLeft: '900px' }} type="submit" onClick={userSignout}
            className="btn tbn-link btn-lg btn-primary ">
            <img
              id="logout-set"
              src="./logout.jpg"
              width="30"
              height="30"
              className="mt-3"
            />
          </button>
        </div>

        <h2  className="mt-3 ">
          <button
          id='watch'
          onClick={() => setShowWatchLater(!showWatchLater)}
          className="btn btn-warning me-5  p-1">
          {showWatchLater ? `All Videos` : ` Watch Later ${videosCount}`}
        </button>
        </h2>
      </header>

 <section className="z-0 d-flex flex-wrap gap-2 mt-5 mx-4">
        {videosToRender?.map((video) => (
          <div key={video.category_id} className="card m-2" style={{ maxWidth: '340px' }}>
            <iframe src={video.url} height="200" className="rounded"></iframe>
            <div className="card-header text-center">
              <h2>{video.title}</h2>
            </div>
            <div className="card-body text-center">{video.description}</div>
            <div className="card-footer">
              <span style={{ marginLeft: '75px' }} className="bi bi-hand-thumbs-up">
                {video.likes}
              </span>
              <span className="bi bi-eye mx-4">{video.views}</span>
              <button
                onClick={() => handleSaveClick(video)}
                className="btn btn-success mt-1"
                style={{ marginLeft: '75px' }}
              >
                <span className="bi bi-floppy me-2"></span>
                Watch Later
              </button>
            </div>
          </div>
        ))}
  </section>
    </div>
  );
}




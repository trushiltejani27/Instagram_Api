import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiCommand } from 'react-icons/fi';
import './Css/Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [comments, setComments] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [showArticlePopup, setShowArticlePopup] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [activeTab, setActiveTab] = useState('posts');


  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));

    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.log(error));

    axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((response) => setAlbums(response.data))
      .catch((error) => console.log(error));

    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const toggleImagePopup = (imageUrl) => {
    setShowImagePopup(!showImagePopup);
    setSelectedImage(imageUrl);
  };
  
  
  const toggleArticlePopup = (index) => {
    setShowArticlePopup(!showArticlePopup);
    setSelectedArticle(index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const randomFollowers = Math.floor(Math.random() * 1000) + 500;
  const randomFollowings = Math.floor(Math.random() * 500) + 100;

  return (
    <div className='body'>
      <div className='container'>
        <div className='profile'>
          <div className='profile-dp'>
            <img
              src={require(`../image/profile${id}.jpg`)}
              width={100}
              alt=''
              onClick={toggleProfilePopup}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className='user'>
            <div className='profile-info'>
              <h2>{profile.name}</h2>
              <p>@{profile.username}</p>
              <p>{profile.email}</p>
              <p>{profile.phone}</p>
              <p>{profile.website}</p>
            </div>
          </div>
        </div>
        <div className='stats'>
          <div className='stat'>
            <h5>Posts</h5>
            <p>{albums.length}</p>
          </div>
          <div className='stat'>
            <h5>Followers</h5>
            <p>{randomFollowers}k</p>
          </div>
          <div className='stat'>
            <h5>Following</h5>
            <p>{randomFollowings}</p>
          </div>
        </div>
        <div className='profile-section'>
          <div className='tab-buttons'>
            <button className={activeTab === 'posts' ? 'active' : ''} onClick={() => handleTabChange('posts')}>
              Posts
            </button>
            <button className={activeTab === 'articles' ? 'active' : ''} onClick={() => handleTabChange('articles')}>
              Articles
            </button>
          </div>
          <div className='tab-content'>
            {activeTab === 'posts' && (
              <div>
                <h3>Posts</h3>
                <div className="posts">
                  {albums.map((post, index) => (
                    <img key={index} src={post.url} width={180} alt="" onClick={() => toggleImagePopup(post.url)} />
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'articles' && (
              <div>
                <h3>Articles</h3>
                <div className="articles">
                  {posts.map((article, index) => (
                    <div key={index} className='article' onClick={() => toggleArticlePopup(index)}>
                      <h4>{article.title}</h4>
                      <p>{article.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showProfilePopup && (
        <div className='popup-container'>
          <div className='popup'>
            <span className='close-button' onClick={toggleProfilePopup}>
              &times;
            </span>
            <img
              src={require(`../image/profile${id}.jpg`)}
              alt='Profile Picture'
              className='popup-image'
            />
          </div>
        </div>
      )}

      {showImagePopup && (
        <div className='popup-container'>
          <span className='close-button' onClick={() => toggleImagePopup()}>
            &times;
          </span>
          <div className='popup popup-image'>
            <img src={selectedImage} alt='Selected Image' className='popup-image' />
            <div className='comments'>
              <h3>Comments</h3>
              {comments.map((comment) => (
                <div key={comment.id} className='comment'>
                  <h4>{comment.name}</h4>
                  <p>{comment.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showArticlePopup && (
        <div className='popup-container'>
          <div className='popup popup-article'>
            <span className='close-button' onClick={() => toggleArticlePopup(null)}>
              &times;
            </span>
            <h1>{posts[selectedArticle]?.title}</h1>
            <p>{posts[selectedArticle]?.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

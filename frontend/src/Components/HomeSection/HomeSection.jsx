import React, { useState } from 'react';
import { Avatar, Button, IconButton, Divider, Paper } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ImageIcon from '@mui/icons-material/Image';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const validationSchema = Yup.object().shape({
  content: Yup.string().required('Content is required')
});

// Sample posts data
const samplePosts = [
  {
    id: 1,
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
    content: 'Just finished implementing a new feature using React and Material UI. The component library makes responsive design so much easier!',
    timestamp: '2h ago',
    likes: 24,
    comments: 5,
    isLiked: false
  },
  {
    id: 2,
    username: 'janedoe',
    displayName: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Working on a new project with NextJS and Tailwind CSS. The developer experience is amazing! Anyone else tried this combination?',
    timestamp: '5h ago',
    likes: 42,
    comments: 8,
    isLiked: true
  },
  {
    id: 2,
    username: 'janedoe',
    displayName: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Working on a new project with NextJS and Tailwind CSS. The developer experience is amazing! Anyone else tried this combination?',
    timestamp: '5h ago',
    likes: 42,
    comments: 8,
    isLiked: true
  },
  {
    id: 2,
    username: 'janedoe',
    displayName: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Working on a new project with NextJS and Tailwind CSS. The developer experience is amazing! Anyone else tried this combination?',
    timestamp: '5h ago',
    likes: 42,
    comments: 8,
    isLiked: true
  },
  {
    id: 2,
    username: 'janedoe',
    displayName: 'Jane Doe',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    content: 'Working on a new project with NextJS and Tailwind CSS. The developer experience is amazing! Anyone else tried this combination?',
    timestamp: '5h ago',
    likes: 42,
    comments: 8,
    isLiked: true
  }
];

const HomeSection = () => {
  const [posts, setPosts] = useState(samplePosts);
  
  const handleSubmit = (values, { resetForm }) => {
    console.log("values", values);
    // Add the new post to the posts array
    const newPost = {
      id: posts.length + 1,
      username: 'currentuser',
      displayName: 'Current User',
      avatar: 'https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0',
      content: values.content,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      isLiked: false
    };
    
    setPosts([newPost, ...posts]);
    resetForm();
  };

  const formik = useFormik({
    initialValues: {
      content: "",
      image: ""
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const toggleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { 
          ...post, 
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className='space-y-5'>
        <section>
          <h1 className='py-5 text-xl font-bold opacity-90'>
            Home
          </h1>
        </section>

        {/* Post Creation Section */}
        <Paper elevation={1} className="p-4 rounded-xl mb-6">
          <form onSubmit={formik.handleSubmit}>
            <div className='flex gap-3'>
              <Avatar 
                alt='username'
                src='https://images.unsplash.com/photo-1502685104226-e9df14d4d9d0'
                className="mt-1"
              />

              <div className='w-full space-y-4'>
                <div>
                  <textarea 
                    placeholder="What's on your mind?" 
                    className="w-full border-none outline-none text-xl bg-transparent resize-none min-h-[80px]"
                    {...formik.getFieldProps('content')}
                  />
                  {formik.touched.content && formik.errors.content && (
                    <div className="text-red-500 text-sm">{formik.errors.content}</div>
                  )}
                </div>
                
                <Divider />
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <IconButton color="primary" size="small">
                      <ImageIcon />
                    </IconButton>
                    <IconButton color="primary" size="small">
                      <EmojiEmotionsIcon />
                    </IconButton>
                  </div>
                  <Button 
                    type="submit"
                    variant="contained" 
                    sx={{ 
                      bgcolor: "#0cc0df", 
                      borderRadius: "20px",
                      '&:hover': {
                        bgcolor: "#0aa0c0"
                      }
                    }}
                    disabled={!formik.values.content}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Paper>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Paper key={post.id} elevation={1} className="p-4 rounded-xl">
              <div className="flex gap-3">
                <Avatar alt={post.username} src={post.avatar} />
                <div className="w-full">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{post.displayName}</h3>
                    <span className="text-gray-500">@{post.username}</span>
                    <span className="text-gray-500 text-sm">· {post.timestamp}</span>
                  </div>
                  
                  <div className="my-3">
                    <p>{post.content}</p>
                  </div>
                  
                  <div className="flex justify-between mt-4 text-gray-500">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                      <ChatBubbleOutlineIcon fontSize="small" />
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-green-500">
                      <RepeatIcon fontSize="small" />
                    </div>
                    <div 
                      className={`flex items-center gap-1 cursor-pointer ${post.isLiked ? 'text-red-500' : 'hover:text-red-500'}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      {post.isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500">
                      <BookmarkBorderIcon fontSize="small" />
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
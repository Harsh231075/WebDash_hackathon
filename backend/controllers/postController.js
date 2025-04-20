// controllers/postController.js
import Post from '../models/Post.js';
import Profile from '../models/Profile.js';
import cloudinary from 'cloudinary';
import moment from 'moment';
const { v2 } = cloudinary;


export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    let photoUrl = '';

    // Check if file is present (photo is optional)
    if (req.image) {
      console.log("image", req.image);
      const result = await v2.uploader.upload(req.image.path, {
        folder: 'posts', // Cloudinary folder name
      });
      photoUrl = result.secure_url;
    }

    const newPost = new Post({
      title,
      description,
      userId,
      photo: photoUrl, // empty string if no photo
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.error('Post creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const profile = await Profile.findOne({ user: post.userId });

        return {
          author: profile?.hero?.name || 'Anonymous',
          avatar: profile?.hero?.avatar || 'https://via.placeholder.com/150',
          content: post.description,
          time: moment(post.createdAt).fromNow(),
          likes: post.likes.length,
          comments: post.comments.length,
          id: post._id
        };
      })
    );

    res.status(200).json({
      success: true,
      posts: formattedPosts,
    });
  } catch (error) {
    console.error('Error while fetching posts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch posts',
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Create comment object
    const comment = {
      text: content,
      user: userId,
      createdAt: new Date()
    };

    // Push the comment into the post's comments array
    post.comments.push(comment);

    await post.save();

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      comment,
    });

  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while adding comment',
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    // Step 1: Find post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Step 2: Extract unique userIds from comments
    const userIds = [...new Set(post.comments.map(c => c.user.toString()))];

    // Step 3: Fetch profiles for all commenters
    const profiles = await Profile.find({ user: { $in: userIds } });

    // Step 4: Create a map for quick lookup
    const profileMap = {};
    profiles.forEach(profile => {
      profileMap[profile.user.toString()] = {
        name: profile.hero.name,
        avatar: profile.hero.avatar,
      };
    });

    // Step 5: Attach user details to each comment
    const commentsWithUser = post.comments.map(comment => {
      const userInfo = profileMap[comment.user.toString()] || {};
      return {
        _id: comment._id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          _id: comment.user,
          name: userInfo.name || 'Unknown',
          avatar: userInfo.avatar || '',
        }
      };
    });

    res.status(200).json({
      success: true,
      message: 'Comments fetched successfully',
      comments: commentsWithUser,
    });

  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching comments',
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id; // Assuming user is authenticated

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike: remove userId from likes array
      post.likes = post.likes.filter(id => id.toString() !== userId.toString());
    } else {
      // Like: add userId to likes array
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: alreadyLiked ? 'Post unliked' : 'Post liked',
      likesCount: post.likes.length,
    });

  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while liking the post',
    });
  }
};

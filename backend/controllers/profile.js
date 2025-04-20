import Profile from '../models/Profile.js'
import cloudinary from 'cloudinary';
const { v2 } = cloudinary;
import mongoose from "mongoose";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const sectionName = req.body.section;
    console.log('name = ', sectionName);
    const fieldPath = req.body.keyPath; // e.g., 'hero.avatar' or 'basic.avatar'
    console.log(fieldPath);
    const { section, keyPath, ...restData } = req.body;
    console.log("ha ha ", req.body);
    if (!sectionName) {
      return res.status(400).json({ message: "Section is required" });
    }

    let profile = await Profile.findOne({ user: userId });
    let gallery;
    if (!profile) {
      profile = new Profile({ user: userId });
    }
    console.log(req.files);
    // 🖼️ Handle file upload if any
    if (req.files && req.files.file) {
      const file = req.files.file;
      try {
        const uploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "profile_uploads",
        });

        const imageUrl = uploadResult.secure_url;
        gallery = imageUrl

        // 📌 If keyPath like hero.avatar is provided, update it dynamically
        if (fieldPath) {
          const keys = fieldPath.split(".");
          let current = profile;

          // Traverse to last key except final one
          for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
          }

          // Set image URL to final field
          current[keys[keys.length - 1]] = imageUrl;
        }

      } catch (err) {
        console.error("❌ Image Upload Error:", err);
        return res.status(500).json({ message: "File upload failed" });
      }
    }

    console.log("baisc =", gallery);
    // 💾 Handle normal data update
    if (sectionName === "photos") {
      const { caption } = restData;
      console.log(gallery);
      profile.photos.push({ url: gallery, caption });
    } else if (Array.isArray(profile[sectionName])) {
      if (sectionName === "certificates") {
        const file = gallery
        profile[sectionName].push({ file, ...restData });
      } else if (sectionName === "achievements") {
        console.log("achievements");
        profile[sectionName].push({ ...restData });
      }
    } else {
      if (sectionName === "hero") {
        console.log("check-hero = ", gallery);
        restData.coverImage = gallery;
        profile[sectionName] = { ...profile[sectionName], ...restData, };
      }
      console.log("check-baisc last");
      restData.avatar = gallery;
      profile[sectionName] = { ...profile[sectionName], ...restData, };
    }

    const saved = await profile.save();
    res.status(200).json(saved);

  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllUserBasicDetails = async (req, res) => {
  try {
    const profiles = await Profile.find({});
    console.log(profiles.user)
    const formattedUsers = profiles.map(profile => ({
      id: profile.user,
      name: profile.hero?.name || 'No Name',
      graduation: profile.education?.year || 'N/A',
      major: profile.education?.stream || 'N/A',
      company: 'N/A', // Not available in doc
      location: profile.hero?.location || 'N/A',
      image: profile.hero?.avatar || 'https://i.pravatar.cc/300' // Default fallback
    }));

    res.status(200).json({
      success: true,
      users: formattedUsers
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user details'
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const profiles = await Profile.findOne({ user: userId });
    res.status(200).json(profiles);

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user details'
    });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;
    const userId = req.user.id; // middleware se aata h

    if (!mongoose.Types.ObjectId.isValid(photoId)) {
      return res.status(400).json({ message: "Invalid photo ID" });
    }

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Filter out photo by ID
    profile.photos = profile.photos.filter(
      (photo) => photo._id.toString() !== photoId
    );

    await profile.save();

    res.status(200).json({ message: "Photo deleted successfully", photos: profile.photos });
  } catch (error) {
    console.error("Error deleting photo:", error);
    res.status(500).json({ message: "Server error" });
  }
};






import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Bas reference ke liye, User model ka structure yahan nahi banate
    required: true
  },
  hero: {
    name: String,
    role: String,
    quote: String,
    avatar: String,
    coverImage: String,
    location: String
  },
  basic: {
    avatar: String,
    name: String,
    email: String,
    phone: String,
    location: String,
    bio: String
  },
  education: {
    university: String,
    course: String,
    stream: String,
    year: String,
    cgpa: String
  },
  professional: {
    company: String,
    role: String,
    experience: String,
    skills: [String],
    linkedin: String
  },
  achievements: [
    {
      title: String,
      description: String,
      year: String
    }
  ],
  certificates: [
    {
      title: String,
      issuer: String,
      year: String,
      file: String
    }
  ],
  photos: [
    {
      url: String,
      caption: String
    }
  ]
}, { timestamps: true });

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
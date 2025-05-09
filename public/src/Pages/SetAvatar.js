
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../Utils/APIRoutes";
import { Buffer } from "buffer";

const SetAvatar = () => {
  const api = "https://api.dicebear.com/7.x/adventurer/svg?seed=";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [avatars, setAvatar] = useState([]);

  const ToastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === null) {
      toast.error("Please select an avatar", ToastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const url = `${setAvatarRoute}/${user._id}`;
      const { data } = await axios.post(url, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", ToastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 0; i < 4; i++) {
          const randomSeed = Math.floor(Math.random() * 1000);
          const image = await axios.get(`${api}${randomSeed}`, {
            responseType: "text", // <- THIS IS IMPORTANT
          });
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        }
        setAvatar(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching avatars:", error);
        toast.error("Error fetching avatars. Please try again later.", ToastOptions);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`avatar-${index}`}
                />
              </div>
            ))}
          </div>
          <button className="submit-btn" onClick={setProfilePicture}>
            Set as Profile
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};


const Container = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
  padding:0.4rem;
  border-radius:5rem;
  display:flex;
  justify-content:center;
  align-items:center;
  transition:0.5s ease-in-out;
    img {
      height: 6rem;
    }
  }
    .selected{
    border :0.4rem solid orange;
    }
    
}
    .submit-btn{
    background-color:#FF4500;
color:white;
padding:1rem 2rem;
border:none;
font-weight: bold;
cursor:pointer;
border-radius:0.4rem;
font-size:1rem;
text-transform:uppercase;
transition:0.5s ease-in-out;
&:hover{
background-color:orange;}}
    }
}
`;
export default SetAvatar;

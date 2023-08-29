import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import RecCard from "../components/main/RecCard";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  dislike,
  like,
  fetchSuccess,
  view,
  fetchFailure,
} from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Comments from "../components/main/Comments";

const Container = styled.div`
  display: flex;
  gap: 24px;

  @media (max-width: 868px) {
    flex-direction: column;
    max-width: 100vw;
  }
`;

const Content = styled.div`
  flex: 5;
  margin-left: 20px;

  @media (max-width: 868px) {
    padding: 10px;
  }
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  height: 520px;
  width: 100%;
  object-fit: cover;

  @media (max-width: 868px) {
    height: 350px;
    width: 100%;
  }
`;

const Video = () => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  const fetchViewCount = async () => {
    try {
      await axios.put(`/videos/view/${currentVideo && currentVideo._id}`);
      dispatch(view());
    } catch (error) {
      fetchFailure();
    }
  };
  const handleVideoPlay = () => {
    if (!hasStartedPlaying) {
      fetchViewCount();
      setHasStartedPlaying(true);
    }
  };

  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        fetchFailure();
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    if(currentUser){
      await axios.put(`/users/like/${currentVideo && currentVideo._id}`);
      dispatch(like(currentUser._id));
    }
  };

  const handleDislike = async () => {
    if(currentUser) {
      await axios.put(`/users/dislike/${currentVideo && currentVideo._id}`);
      dispatch(dislike(currentUser._id));
    }
  };

  const handleSub = async () => {
    if(currentUser){
      currentUser.subscribedUsers.includes(channel && channel._id)
      ? await axios.put(`/users/unsub/${channel && channel._id}`)
      : await axios.put(`/users/sub/${channel && channel._id}`);

      dispatch(subscription(channel && channel._id));
    }
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame
            src={currentVideo && currentVideo.videoUrl}
            onPlay={handleVideoPlay}
            controls
          />
        </VideoWrapper>

        <Title>{currentVideo && currentVideo.title}</Title>
        <Details>
          <Info>
            {currentVideo && currentVideo.views} views • {format(currentVideo && currentVideo.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo && currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo && currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo && currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>

        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel && channel.img} />
            <ChannelDetail>
              <ChannelName>{channel && channel.name} </ChannelName>
              <ChannelCounter>{channel && channel.subscribers}</ChannelCounter>
              <Description>{currentVideo && currentVideo.desc} </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser && channel && currentUser.subscribedUsers?.includes(channel._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo && currentVideo._id} />
      </Content>
      <>
        <RecCard tags={currentVideo && currentVideo.tags} />
      </>
    </Container>
  );
};

export default Video;

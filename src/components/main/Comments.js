import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommentCard from "./CommentCard";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const addComment = async () => {
    await axios.post(`/comments`, {
      desc: comment,
      videoId: currentVideo._id
    })
  }


  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser && currentUser.img} />
        <Input placeholder="Add a comment..." onChange={(e) => setComment(e.target.value)}/>
        <Button onClick={addComment} >Comment</Button>
      </NewComment>
      {comments.map(comment=>(
        <CommentCard key={comment._id} comment={comment}/>
      ))}
    </Container>
  );
};

export default Comments;
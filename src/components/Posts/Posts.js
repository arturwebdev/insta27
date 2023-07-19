import React, { useEffect, useMemo } from "react";
import IMAGES from "../../images";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../store/slices/post/postSlice";
import { fetchPosts } from "../../store/slices/post/postApi";
import Spinner from "../Spinner/Spinner";
import { selectSearch } from "../../store/slices/search/searchSlice";
function Posts() {
  const { data: posts, isLoading } = useSelector(selectPosts);
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, []);

  const filteredPosts = useMemo(() => {
    if (search) {
      return posts
        .filter((el) => el.name.includes(search))
        .sort((a, b) => a.name.indexOf(search) - b.name.indexOf(search));
    }
    return posts;
  }, [posts, search]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        filteredPosts.map((el) => (
          <Post
            key={el.id}
            id={el.id}
            img={el.img}
            name={el.name}
            comments={el.comments}
            likesCount={el.likesCount}
            postText={el.postText}
            timeAgo={el.timeAgo}
          />
        ))
      )}
    </>
  );
}

export default Posts;

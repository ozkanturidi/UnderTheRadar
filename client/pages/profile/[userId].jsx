import { Avatar } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Follower from "../../components/followers";
import UserContext from "../../context/userContext";
import LoopIcon from "@mui/icons-material/Loop";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import CommentContext from "../../context/commentContext";
import UserProfileComment from "../../components/userProfileComment";
import newRequest from "../../utils/makerequest";
import AuthContext from "../../context/authContext";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
const Profile = (props) => {
  const router = useRouter();
  const { userId } = router.query;

  const [isFollowing, setIsFollowing] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const userCtx = useContext(UserContext);
  const authCtx = useContext(AuthContext);
  const commentCtx = useContext(CommentContext);

  const userShowButton = () => {
    if (authCtx.userId === userId) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  };
  const userFollowButton = () => {
    if (
      userCtx.user.followers?.some(
        (follower) => follower._id === authCtx.userId
      )
    ) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  };

  const followHandler = async () => {
    await newRequest.put(`user/follow/${userId}`);
    userCtx.userHandler(userId);
  };
  const unfollowHandler = async () => {
    await newRequest.put(`user/unfollow/${userId}`);
    userCtx.userHandler(userId);
  };

  useEffect(() => {
    //bu ksıımların da contexte taşınması gerekiyor
    userShowButton();
    userFollowButton();
  }, [userId, authCtx.userId]);

  const {} = useQuery({
    queryKey: ["profileFollowing", props.userId],
    queryFn: () => {
      console.log(userCtx.user.followers);
      if (
        userCtx.user.followers?.some(
          (follower) => follower._id === authCtx.userId
        )
      ) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    },
  });
  const {} = useQuery({
    queryKey: ["profileFollow", props.userId],
    queryFn: () => followHandler,
  });
  const {} = useQuery({
    queryKey: ["profileUnfollow", props.userId],
    queryFn: () => unfollowHandler,
  });

  const {} = useQuery({
    queryKey: ["profile", props.userId],
    queryFn: () => userCtx.userHandler(userId),
  });
  const {} = useQuery({
    queryKey: ["profilecomments", props.userId],
    queryFn: () => commentCtx.getUserComments(userId),
  });

  return (
    <div className="min-h-screen bg-gradient-to-t from-emerald-200 from-10% via-emerald-400 via-30% to-emerald-500 to-90%">
      <Head>
        <title>
          {userCtx.user.firstName} (@{userCtx.user.username})
        </title>
      </Head>
      {userCtx.isLoading && (
        <div className="">
          <LoopIcon className="animate-spin" />
        </div>
      )}
      {!userCtx.isLoading && (
        <div className=" mx-auto pt-10  flex  flex-col max-w-7xl gap-4 px-10 md:flex-row  ">
          <div className=" bg-gray-200 h-4/5  flex flex-col space-y-2 items-center  max-w-2xl py-10 px-20 rounded-lg ">
            <Avatar src={userCtx.user.img} sx={{ width: 200, height: 200 }} />
            <div className="flex space-x-1 md:space-x-1">
              <span className="text-2xl">{userCtx.user.firstName}</span>
              <span className="text-2xl">{userCtx.user.lastName}</span>
            </div>
            <p className="font-medium">@{userCtx.user.username}</p>
            <div>
              <div className="flex space-x-1 md:space-x-1">
                <CakeIcon />
                <p>
                  {new Date(userCtx.user.birthDate).getDate()}{" "}
                  {new Date(userCtx.user.birthDate).toLocaleString("default", {
                    month: "long",
                  })}
                </p>
              </div>
              <div className="flex space-x-1 md:space-x-1">
                <EmailIcon />
                <p>{userCtx.user.email}</p>
              </div>
            </div>
            {showButton && (
              <div className="flex flex-col space-y-2 md:flex-row space-x-2 md:space-y-0">
                {!isFollowing && (
                  <div className="flex space-x-1 md:space-x-1">
                    <button
                      onClick={followHandler}
                      className="bg-blue-400 text-white rounded-lg px-2 py-2 max-w-md"
                    >
                      <PersonAddIcon />
                      Follow
                    </button>
                  </div>
                )}
                {isFollowing && (
                  <button
                    onClick={unfollowHandler}
                    className="bg-blue-400 text-white rounded-lg px-2 py-2 max-w-md justify-center items-center "
                  >
                    <div className="flex space-x-5 md:space-x-5">
                      <PersonRemoveIcon />
                      Unfollow
                    </div>
                  </button>
                )}
              </div>
            )}
            <div>
              <div className="flex flex-col items-center justify-center">
                <span className="font-bold">Followers</span>
                <div className="flex ">
                  {userCtx.user.followers &&
                    userCtx.user.followers.map((follower) => (
                      <Follower key={follower} id={follower} />
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="font-bold">Followings</span>
              <div className="flex ">
                {userCtx.user.followings &&
                  userCtx.user.followings.map((followings) => (
                    <Follower key={followings} id={followings} />
                  ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-200 rounded-lg items-center justify-center max-w-4xl w-full pt-10 px-10 ">
            <span className="font-bold text-4xl mb-10 flex justify-center">
              COMMENTS
            </span>
            {commentCtx.isLoading && <LoopIcon className="animate-spin" />}
            {!commentCtx.isLoading &&
              commentCtx.usercomments.map((comment) => (
                <UserProfileComment key={comment._id} comment={comment} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
export async function getServerSideProps(context) {
  const { userId } = context.query;

  return {
    props: {
      userId: userId,
    },
  };
}

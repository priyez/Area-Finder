"use client"

import React, { FormEventHandler, useState, useCallback, useEffect } from "react"


import { useAuthState } from "react-firebase-hooks/auth";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, updateDoc, query, getDocs, where, collection } from "firebase/firestore";
import db from "../../firebase-config";
import { auth } from "../../firebase-config";
import Drawer from 'react-modern-drawer'
//import styles 👇
import 'react-modern-drawer/dist/index.css'
import { v4 as uuidv4 } from "uuid";
import { any } from "zod";
import Comments from "./ReviewCard/Comments";
import Icon from "./Icon";

// import ImageFallback from "@/helpers/ImageFallback";
// import { options } from "marked";

interface Comment {
    id: string;
    text: string;
    commentId: string | any;
    comment: string;
    userName: string;
    displayPic: string;
    createdAt: any;
    user: string;
    upvotes: string[] | undefined;
    downvotes: string[] | undefined;
}
interface UserPost {
    id: string;
    upVotesUsers?: string[] | any;
    downVotesUsers?: string[] | any;
}

const Reactions: React.FC<{ id: string, upvotes: string[], expandedReviewId: any, review: any, downvotes: string[], userReview: UserPost }> = ({ id, expandedReviewId, review, userReview }) => {
    const [comment, setComment] = useState<string>("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [currentlyLoggedinUser] = useAuthState(auth); // Assuming `auth` is defined somewhere
    const commentRef = doc(db, "reviews", id);


    const [toggleUpVote, setToggleUpVote] = useState<boolean>(false);
    const [toggleDownVote, setToggleDownVote] = useState<boolean>(false);
    const [fillUpColor, setFillUpColor] = useState<boolean>(false);
    const [fillDownColor, setFillDownColor] = useState<boolean>(false);
    const [hasUserUpVoted, setHasUserUpvoted] = useState<boolean>(false);
    const [hasUserDownVoted, setHasUserDownVoted] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false);



    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }


    useEffect(() => {
        checkIfUserUpVoted();
        checkIfUserDownVoted();
    }, []);

    const handleClick = async (type: string) => {


        const userId = auth.currentUser?.uid;
        if (!userId) return; // Return early if currentUser is null

        const postsRef = doc(db, 'reviews', id);

        if (type === 'upvote') {
            await updateDoc(postsRef, {
                upVotesUsers: toggleUpVote ? arrayRemove(userId) : arrayUnion(userId)
            });
            setToggleUpVote((toggleUpVote) => !toggleUpVote);
        } else {
            await updateDoc(postsRef, {
                downVotesUsers: toggleDownVote ? arrayRemove(userId) : arrayUnion(userId)
            });
            setToggleDownVote((toggleDownVote) => !toggleDownVote);
        }
    };

    const checkIfUserUpVoted = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const q = query(collection(db, "reviews"), where("upVotesUsers", "array-contains", userId));
        const result = await getDocs(q);
        const userArray = (result.docs.map((item) => (item.data().upVotesUsers)));

        if (userArray.length > 0) {
            setFillUpColor(true);
            setHasUserUpvoted(true);
        }
    };

    const checkIfUserDownVoted = async () => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;
        const q = query(collection(db, "reviews"), where("downVotesUsers", "array-contains", userId));
        const result = await getDocs(q);
        const userArray = (result.docs.map((item) => (item.data().downVotesUsers)));

        if (userArray.length > 0) {
            setFillDownColor(true);
            setHasUserDownVoted(true);
        }
    };




    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const docRef = doc(db, "reviews", id); // Assuming `db` is your Firestore instance
        onSnapshot(docRef, (snapshot) => {
            setComments(snapshot.data()?.comments || []); // Added type assertion and default value
        });
    }, [id]); // Added `id` to dependency array


    const handleChangeComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!currentlyLoggedinUser) {
                // Handle the case where the user is not logged in
                // You can show an error message or redirect to the login page
                return;
            }

            updateDoc(commentRef, {
                comments: arrayUnion({
                    user: currentlyLoggedinUser.uid,
                    userName: currentlyLoggedinUser.displayName,
                    displayPic: currentlyLoggedinUser.photoURL,
                    comment: comment,
                    createdAt: new Date(),
                    commentId: uuidv4(),
                }),
            }).then(() => {
                setComment("");
            });
        }
    };


    const handleDeleteComment = (comment: Comment) => {
        console.log(comment);
        updateDoc(commentRef, {
            comments: arrayRemove(comment),
        })
            .then((e) => {
                console.log(e);
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (

        <div>
            <ul className="h-8 my-2 mb-0">

                <li className="mr-4 inline-flex text-[10px]">

                    <button onClick={() => handleClick('upvote')} className="mr-1" disabled={hasUserDownVoted && (userReview.downVotesUsers?.includes(auth.currentUser?.uid))}>
                        {fillUpColor && (userReview.upVotesUsers?.includes(auth.currentUser?.uid)) ? <Icon icon="upVote" width={20} height={20} fill="none" />
                            : <Icon icon="upVote" width={20} height={20} fill="#9ca3af" />}
                    </button>
                    <p className="mt-1"> {userReview.upVotesUsers ? userReview.upVotesUsers.length : 0}</p>
                </li>

                <li className="mr-7 inline-flex text-[10px]">
                    <button onClick={() => handleClick('downvote')} className="mr-2" disabled={hasUserUpVoted && (userReview.upVotesUsers?.includes(auth.currentUser?.uid))}>
                        {fillDownColor && (userReview.downVotesUsers?.includes(auth.currentUser?.uid)) ? (
                            <Icon icon="downVote" width={20} height={20} fill="none" />
                        ) : (
                            <Icon icon="downVote" width={20} height={20} fill="#3265fc" />
                        )}
                    </button>
                    <p className="mt-1">  {userReview.downVotesUsers ? userReview.downVotesUsers.length : 0}</p>
                </li>
                <li className="mr-4 inline-flex  text-[10px]" onClick={toggleDrawer}>
                    <button className="mr-2">
                        <Icon icon="comment" width={18} height={20} fill="#aeb8c4" />
                    </button>


                    <p className="mt-1">  {comments.length} </p>
                </li>
                <li className="inline-block ml-[22.5rem]">

                </li>
            </ul>


            {expandedReviewId === id && (
                <div>
                    {currentlyLoggedinUser && (
                        <div className="my-2 border-solid border-gray-300 border-t-2">
                            <ul className="my-3">
                                <li className="mr-10 w-[72%] md:w-[76%]  inline-block text-[10px]">
                                    <input placeholder="Write a comment"
                                        className="searchInput border-none border-b border-gray-400 px-2 w-full md:px-4 py-1"
                                        type="input"
                                        value={comment}
                                        onChange={(e) => {
                                            setComment(e.target.value);
                                        }}
                                        onKeyUp={(e) => {
                                            handleChangeComment(e);
                                        }}
                                    />
                                </li>
                                <li className="inline-block ml-[0.5rem] leading-10 uppercase text-white md:leading-8 md:ml-[1.5rem] text-[9px] w-[50px] md:w-[60px] h-[28px] md:h-[30px] rounded-[5px] items-center text-center bg-[#3265fc]">
                                    post
                                </li>
                            </ul>

                        </div>

                    )}
                </div>
            )}
            {isMobile ?
                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='bottom'
                    lockBackgroundScroll={true}
                    className={`rounded-t-xl px-3 py-6 drawer-mobile h-drawer overflow-y-auto`}
                >
                    <div className="w-full bg-white flex justify-center" >   {comments.length} comments</div>
                    {comments.length === 0 ? (
                        <div className="p-24">
                            <div>
                                <Icon icon="commentEmptyState" width={180} height={160} fill="none" />
                                <p className="text-center">No comment <br />
                                    Drop a comment
                                </p>
                            </div>

                        </div>
                    ) : (

                        comments.map(({ commentId, user, comment, userName, displayPic, createdAt }) => (
                            <Comments
                                key={commentId}
                                commentId={commentId}
                                user={user}
                                comment={comment}
                                displayPic={displayPic}
                                userName={userName}
                                createdAt={createdAt}
                                currentlyLoggedinUser={currentlyLoggedinUser}
                            />
                        ))
                    )}
                    {/* </div> */}

                </Drawer>
                :


                <Drawer
                    open={isOpen}
                    onClose={toggleDrawer}
                    direction='right'

                    lockBackgroundScroll={true}
                    className={`rounded-t-xl px-3 py-6 drawer-desktop h-drawer overflow-y-auto`}
                >
                    <div className="w-full bg-white flex justify-center" >   {comments.length} comments</div>
                    {comments.length === 0 ? (
                        <div className="p-32">
                            <div>
                                <Icon icon="commentEmptyState" width={180} height={160} fill="none" />
                                <p className="text-center">No comment <br />
                                    Drop a comment
                                </p>
                            </div>

                        </div>
                    ) : (

                        comments.map(({ commentId, user, comment, userName, displayPic, createdAt }) => (
                            <Comments
                                key={commentId}
                                commentId={commentId}
                                user={user}
                                comment={comment}
                                displayPic={displayPic}
                                userName={userName}
                                createdAt={createdAt}
                                currentlyLoggedinUser={currentlyLoggedinUser}
                            />
                        ))
                    )}
                    {/* </div> */}

                </Drawer>
            }
        </div>

    );
};


export default Reactions;








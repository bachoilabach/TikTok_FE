import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleGetCommentsApi } from '../api/comment';
import { handleGetUserByIdApi } from '../api/user';
import { Avatar, Typography } from '@material-tailwind/react';
import Comment from './Comment';

interface CommentModal {
	_id: string;
	userId: string;
	commentContent: string;
	commentLeft: number;
	commentRight: number;
	commentParentId: string | null;
}

interface UserProfile {
	username: string;
	photoProfile: string;
}

function CommentModal() {
	const { videoId } = useParams();
	const [comments, setComments] = useState<CommentModal[]>([]);
	const [commentParentId, setCommentParentId] = useState<string | null>(null);
	const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>(
		{}
	);

	const [commentsReply, setCommentsReply] = useState<CommentModal[]>([]);

	const getUserProfile = async (response: {
		metadata: { userId: string }[];
	}) => {
		// Lấy thông tin người dùng cho mỗi bình luận
		const profiles: Record<string, UserProfile> = {};
		await Promise.all(
			response.metadata.map(async (comment: { userId: string }) => {
				if (!profiles[comment.userId]) {
					const userResponse = await handleGetUserByIdApi(comment.userId);
					profiles[comment.userId] = {
						username: userResponse.metadata.username,
						photoProfile: userResponse.metadata.photoProfile,
					};
				}
			})
		);
		setUserProfiles(profiles);
	};
	const getComments = async () => {
		if (!videoId) return;
		const response = await handleGetCommentsApi(videoId, commentParentId);
		setComments(response.metadata);
		getUserProfile(response);
	};

	const getCommentsReply = async (commentParentId: string | null) => {
		if (!videoId) return;
		const response = await handleGetCommentsApi(videoId, commentParentId);
		setCommentsReply(response.metadata);
		getUserProfile(response);
	};

	useEffect(() => {
		getComments();
	}, [commentsReply]);

	return (
		<div className="text-white bg-[#1B1B1B] min-w-[495px] px-5 py-3 rounded-xl flex flex-col space-y-5 overflow-auto">
			{comments.map((comment) => (
				<div key={comment._id}>
					<Comment
						photoProfile={userProfiles[comment.userId]?.photoProfile}
						username={userProfiles[comment.userId]?.username}
						commentContent={comment.commentContent}
					/>
					<div className="flex items-center ml-14 space-x-5 text-[15px] mt-1 text-[#757575] font-semibold">
						<p>1h</p>
						<p className=" hover:cursor-pointer">Reply</p>
					</div>
					{comment.commentRight - comment.commentLeft > 1 && (
						<div>
							<div
								className="text-[#757575] flex items-center space-x-2 cursor-pointer"
								onClick={() => getCommentsReply(comment._id)}>
								<div className="text-[15px] font-semibold ml-14 mt-1">
									View more replies
								</div>
								<svg
									width="1em"
									data-e2e=""
									height="1em"
									viewBox="0 0 48 48"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M21.8788 33.1213L7.58586 18.8284C7.19534 18.4379 7.19534 17.8047 7.58586 17.4142L10.4143 14.5858C10.8048 14.1953 11.438 14.1953 11.8285 14.5858L24.0001 26.7574L36.1716 14.5858C36.5622 14.1953 37.1953 14.1953 37.5859 14.5858L40.4143 17.4142C40.8048 17.8047 40.8048 18.4379 40.4143 18.8284L26.1214 33.1213C24.9498 34.2929 23.0503 34.2929 21.8788 33.1213Z"></path>
								</svg>
							</div>
							{commentsReply.map((comment) => (
								<div className='ml-14  py-2'>
									<Comment
										key={comment._id}
										photoProfile={userProfiles[comment.userId]?.photoProfile}
										username={
											userProfiles[comment.userId]?.username
										}
										commentContent={comment.commentContent}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default CommentModal;

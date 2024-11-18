import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleCreateCommentApi, handleGetCommentsApi } from '../api/comment';
import { handleGetUserByIdApi } from '../api/user';
import Comment from './Comment';
import { useUser } from '../context/UserContext';

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
	const { user } = useUser();
	const { videoId } = useParams();
	const [comments, setComments] = useState<CommentModal[]>([]);
	const [commentParentId, setCommentParentId] = useState<string | null>(null);
	const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>(
		{}
	);

	const [commentsReply, setCommentsReply] = useState<CommentModal[]>([]);
	const [content, setContent] = useState<string>('');

	const [replies, setReplies] = useState<Record<string, CommentModal[]>>({});
	const [clickReply, setClickReply] = useState<boolean>(false);

	const getCommentsReply = async (parentId: string) => {
		if (!videoId || !parentId) return;
		// Lấy các reply cho comment cụ thể
		const response = await handleGetCommentsApi(videoId, parentId);
		setReplies((prevReplies) => ({
			...prevReplies,
			[parentId]: response.metadata,
		}));
	};

	// Khi bấm nút "Reply" và gửi bình luận
	const handleReply = async () => {
		const userId = user?._id;
		if (!videoId || !userId || !content || !commentParentId) return;

		// Gửi comment mới lên server
		await handleCreateCommentApi(videoId, userId, content, commentParentId);

		// Lấy lại danh sách reply của bình luận được trả lời
		await getCommentsReply(commentParentId);

		// Reset trạng thái sau khi trả lời
		setContent('');
		setCommentParentId(null);
	};

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
		const response = await handleGetCommentsApi(videoId, null);
		setComments(response.metadata);
		getUserProfile(response);
	};

	const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	const handleComment = async () => {
		const userId = user?._id;
		if (!videoId || !userId) return;
		const response = await handleCreateCommentApi(
			videoId,
			userId,
			content,
			null
		);
		setContent('')
		getComments();
		console.log(response);
	};

	const handlePostComment = () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		clickReply === false ? handleComment() : handleReply();
	};

	useEffect(() => {
		getComments();
	}, [commentsReply]);

	return (
		<div className="text-white bg-[#1B1B1B] min-w-[495px] px-5 py-3 rounded-xl flex flex-col space-y-5 h-full">
			{/* Danh sách bình luận */}
			<div className="scroll-smooth overflow-x-hidden scroll-login flex-grow">
				{comments.map((comment) => (
					<div key={comment._id}>
						<Comment
							photoProfile={userProfiles[comment.userId]?.photoProfile}
							username={userProfiles[comment.userId]?.username}
							commentContent={comment.commentContent}
						/>
						<div className="flex items-center ml-14 space-x-5 text-[15px] mt-1 text-[#757575] font-semibold">
							<p>1h</p>
							<p
								className="hover:cursor-pointer"
								onClick={() => {
									setCommentParentId(comment._id);
									setClickReply(true);
								}}>
								Reply
							</p>
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
								{/* Hiển thị reply từ trạng thái replies */}
								{replies[comment._id]?.map((reply) => (
									<div className="ml-14 py-2" key={reply._id}>
										<Comment
											photoProfile={userProfiles[reply.userId]?.photoProfile}
											username={userProfiles[reply.userId]?.username}
											commentContent={reply.commentContent}
										/>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
			{/* Dòng phân cách */}
			<span className="w-full h-[1px] bg-[#ffffff1f]"></span>
			{/* Ô nhập bình luận */}
			<div className="flex gap-x-4 items-center">
				<input
					className="flex-1 bg-[#2F2F2F] border-none outline-none placeholder-[#ffffffe6] text-base text-[#ffffffe6] font-medium w-full p-3 rounded-xl"
					placeholder="Add comment..."
					value={content}
					onChange={handleChangeContent}
				/>
				<button
					onClick={handlePostComment}
					className={`font-semibold h-[100%] ${
						content !== '' ? 'text-[#FF3B5C]' : 'text-[#636363]'
					}`}>
					Post
				</button>
			</div>
		</div>
	);
}

export default CommentModal;

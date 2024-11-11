import { useParams } from 'react-router-dom';

function Comment() {
	const { userId, videoID } = useParams();
	console.log('User ID:', userId);
	console.log('Video ID:', videoID);
	return (
        <div className='text-white bg-[#1B1B1B] '>
            Comment
        </div>
    )
}

export default Comment;

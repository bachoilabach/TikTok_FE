import { Link } from 'react-router-dom';
type button = {
	icon?: JSX.Element;
	name: string;
	to: string;
};

const listBtn: button[] = [
	{
		icon: (
			<svg
				fill="currentColor"
				data-tt="Sidebar_index_IconTabHome"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
				className="w-7 h-7">
				<path d="M23.05 7.84a1.5 1.5 0 0 1 1.9 0l16.1 13.2a1.5 1.5 0 0 1-.95 2.66h-2.33l-1.2 13.03A2.5 2.5 0 0 1 34.1 39H13.9a2.5 2.5 0 0 1-2.49-2.27L10.23 23.7H7.9a1.5 1.5 0 0 1-.95-2.66l16.1-13.2Zm.95 3.1L12.1 20.7h.87l1.4 15.3h8.13v-7.69a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V36h8.13l1.4-15.3h.87L24 10.94Z"></path>
			</svg>
		),
		name: 'Home',
		to: '/',
	},
	{
		icon: (
			<svg
				fill="currentColor"
				data-tt="Sidebar_index_IconLinesHorizontalDecreaseAlt"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6">
				<path d="M6 10a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6Zm0 12a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H6ZM5 35a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-2Zm11-25a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H16Zm0 12a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H16Zm-1 13a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H16a1 1 0 0 1-1-1v-2Z"></path>
			</svg>
		),
		name: 'Posts',
		to: '/',
	},
	{
		icon: (
			<svg
				fill="currentColor"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6">
				<path d="M24 7.5C14.62 7.5 7.5 13.79 7.5 21S14.62 34.5 24 34.5h3.5v3.98a35.74 35.74 0 0 0 7.67-5.9c3.1-3.21 5.33-7.1 5.33-11.58 0-7.21-7.12-13.5-16.5-13.5ZM4.5 21c0-9.36 9-16.5 19.5-16.5S43.5 11.64 43.5 21c0 5.53-2.77 10.13-6.17 13.67a40.15 40.15 0 0 1-10.66 7.67A1.5 1.5 0 0 1 24.5 41v-3.5H24C13.5 37.5 4.5 30.36 4.5 21Z"></path>
				<path d="M17 21.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM27 21.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM37 21.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"></path>
			</svg>
		),
		name: 'Comments',
		to: '/',
	},
	{
		icon: (
			<svg
				fill="currentColor"
				data-tt="Sidebar_index_IconLineChart"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6">
				<path d="M8.72 30.47a1 1 0 0 1 0-1.42l9.45-9.45a1 1 0 0 1 1.42 0l2.12 2.12 3.74 3.75 5.58-5.58-2.4-2.4a.6.6 0 0 1 .34-1.03l8.78-1.4a.82.82 0 0 1 .94.93l-1.4 8.79a.6.6 0 0 1-1.03.33l-2.4-2.4-7.7 7.71a1 1 0 0 1-1.42 0l-5.87-5.86-7.32 7.32a1 1 0 0 1-1.41 0l-1.42-1.41Z"></path>
				<path d="M2 18.2c0-3.92 0-5.88.76-7.38a7 7 0 0 1 3.06-3.06C7.32 7 9.28 7 13.2 7h21.6c3.92 0 5.88 0 7.38.76a7 7 0 0 1 3.06 3.06c.76 1.5.76 3.46.76 7.38v11.6c0 3.92 0 5.88-.76 7.38a7 7 0 0 1-3.06 3.06c-1.5.76-3.46.76-7.38.76H13.2c-3.92 0-5.88 0-7.38-.76a7 7 0 0 1-3.06-3.06C2 35.68 2 33.72 2 29.8V18.2ZM13.2 11c-2.03 0-3.3 0-4.27.08-.92.08-1.2.2-1.3.25a3 3 0 0 0-1.3 1.3c-.05.1-.17.38-.25 1.3C6 14.9 6 16.17 6 18.2v11.6c0 2.03 0 3.3.08 4.27.08.92.2 1.2.25 1.3a3 3 0 0 0 1.3 1.3c.1.05.38.17 1.3.25.96.08 2.24.08 4.27.08h21.6c2.03 0 3.3 0 4.27-.08a3.6 3.6 0 0 0 1.3-.25 3 3 0 0 0 1.3-1.3c.05-.1.17-.38.25-1.3.08-.96.08-2.24.08-4.27V18.2c0-2.03 0-3.3-.08-4.27-.08-.92-.2-1.2-.25-1.3a3 3 0 0 0-1.3-1.3c-.1-.05-.38-.17-1.3-.25-.96-.08-2.24-.08-4.27-.08H13.2Z"></path>
			</svg>
		),
		name: 'Analytics',
		to: '/',
	},
	{
		icon: (
			<svg
				fill="currentColor"
				color="inherit"
				font-size="inherit"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6">
				<path d="M14.8 9.68a1.2 1.2 0 0 1-1.63-.44l-1.8-3.12a1.2 1.2 0 0 1 .44-1.64l1.38-.8a1.2 1.2 0 0 1 1.64.44l1.8 3.12c.33.58.14 1.3-.44 1.64l-1.38.8Zm-2.54 17.18a11.6 11.6 0 1 1 20.63-1.06l2.5 4.33a2 2 0 0 1-.73 2.73l-8.32 4.8a2 2 0 0 1-2.73-.73l-2.5-4.33a11.59 11.59 0 0 1-8.85-5.74Zm6.24-12.38a7.6 7.6 0 0 0 3.8 14.18 2 2 0 0 1 1.73 1l2.05 3.54 4.85-2.8-2.05-3.54a2 2 0 0 1 0-2A7.6 7.6 0 0 0 18.5 14.48Zm-9.35 2.1a1.2 1.2 0 0 1-1.47.85L4.2 16.5a1.2 1.2 0 0 1-.84-1.47l.41-1.54a1.2 1.2 0 0 1 1.47-.85l3.48.93c.64.17 1.02.83.85 1.47l-.42 1.55Zm14.07-9.62a1.2 1.2 0 0 1-.85-1.47L23.31 2a1.2 1.2 0 0 1 1.47-.85l1.54.42c.64.17 1.02.83.85 1.47l-.93 3.47a1.2 1.2 0 0 1-1.47.85l-1.55-.41Zm3.62 32.96a1.2 1.2 0 0 1 .44-1.64l7.27-4.2a1.2 1.2 0 0 1 1.64.44l.8 1.38c.33.58.14 1.31-.44 1.64l-7.27 4.2a1.2 1.2 0 0 1-1.64-.44l-.8-1.38Zm4.23 3.33a1.2 1.2 0 0 1 .44-1.64l3.98-2.3a1.2 1.2 0 0 1 1.64.44l.8 1.38c.33.58.14 1.31-.44 1.64l-3.98 2.3a1.2 1.2 0 0 1-1.64-.44l-.8-1.38Zm2.86-37.32a1.2 1.2 0 0 1 1.7 0l1.13 1.13a1.2 1.2 0 0 1 0 1.7L34.2 11.3a1.2 1.2 0 0 1-1.7 0l-1.13-1.13a1.2 1.2 0 0 1 0-1.7l2.55-2.54Zm-29 22.36a1.2 1.2 0 0 1-1.47-.85l-.41-1.55c-.18-.64.2-1.3.84-1.47l3.48-.93c.64-.17 1.3.21 1.47.85l.42 1.55c.17.64-.21 1.3-.85 1.47l-3.48.93Z"></path>
			</svg>
		),
		name: 'Inspirations',
		to: '/',
	},
	{
		icon: (
			<svg
				fill="currentColor"
				data-tt="Sidebar_index_IconQA"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
				className="w-6 h-6">
				<path
					fill-rule="evenodd"
					clipRule="evenodd"
					d="M24.12 16.06c-.9 0-1.74.59-2.3 1.86-.1.25-.38.4-.64.31l-2.85-.95a.48.48 0 01-.3-.63c.9-2.28 2.86-4.59 6.09-4.59 3.33 0 6.02 2.7 6.02 6.03 0 1.94-1.18 3.54-2.4 4.56a7.76 7.76 0 01-4.13 1.78.47.47 0 01-.5-.48v-3c0-.27.23-.5.5-.56a4.07 4.07 0 001.57-.82c.74-.61.96-1.2.96-1.48 0-1.12-.9-2.03-2.02-2.03z"></path>
				<path d="M26 28.06a2 2 0 11-4 0 2 2 0 014 0z"></path>
				<path
					fill-rule="evenodd"
					clipRule="evenodd"
					d="M4 9.25C4 6.9 5.9 5 8.25 5h31.5C42.1 5 44 6.9 44 9.25v23.63c0 2.34-1.9 4.24-4.25 4.24H14.7l-7.29 7.3A2 2 0 014 43V9.25zm4 28.92l4.46-4.46a2 2 0 011.41-.59h25.88c.14 0 .25-.1.25-.24V9.25a.25.25 0 00-.25-.25H8.25a.25.25 0 00-.25.25v28.92z"></path>
			</svg>
		),
		name: 'Feedback',
		to: '/',
	},
];

export default function SideBarUpload() {
	return (
		<div className="h-screen-minus-59 w-72 flex flex-col border-r px-3 pt-[18px] pb-[22px]">
			<button
				className="h-[54px] bg-[#EBEBEB] text-base font-semibold rounded-sm text-[#A3A4A7] hover:cursor-not-allowed"
				disabled>
				Upload
			</button>
			<span className="border mt-4"></span>
			{listBtn.map((ele, index) => (
				<Link
					to={ele.to}
					className="flex space-x-4 items-center pl-3 h-[50px] my-2"
					key={index}>
					{ele.icon}
					<p className="text-xl font-medium">{ele.name}</p>
				</Link>
			))}

			<div className="mt-auto flex flex-col">
				<Link to={'/'} className="font-semibold">
					Back to TikTok
				</Link>
				<span className="border mt-4"></span>
				<Link className="mt-3 space-y-4 text-gray-400" to={'/'}>
					<p className="text-sm font-semibold">Company</p>
					<p className="text-sm font-semibold">Program</p>
					<p className="text-sm font-semibold">Terms & Poicies</p>
				</Link>
			</div>
		</div>
	);
}

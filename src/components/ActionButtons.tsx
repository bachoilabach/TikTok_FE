export default function ActionButtons() {
	return (
		<div className="flex space-x-6">
			<button className="bg-[#FE2C55] hover:bg-[#d42247] text-lg font-semibold text-white px-4 py-3 rounded-md">
				<div className="w-28">Post</div>
			</button>
			<button className="bg-[#0000001f] hover:bg-[#0000003d] font-semibold text-lg px-4 text-black rounded-md">
				<div className="w-28">Save draft</div>
			</button>
			<button className="bg-[#0000001f] hover:bg-[#0000003d] font-semibold text-lg px-4 text-black rounded-md">
				<div className="w-28">Discard</div>
			</button>
		</div>
	);
}

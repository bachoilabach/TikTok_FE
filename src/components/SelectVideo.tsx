import { useEffect, useState } from 'react';
import UploadVideo from './UploadVIdeo';

export default function SelectVideo() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	useEffect(() => {}, [selectedFile]);

	return (
		<div className="flex justify-center pt-6">
			{/* Upload */}
			{!selectedFile ? (
				<div className="w-[73%] bg-white p-9 h-[100%] rounded-lg shadow-2xl">
					{/* Select Video */}
					<div>
						<label
							className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 h-[540px]">
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-14 h-14 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16">
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="font-semibold text-3xl">Select video to upload</p>
								<p className="mb-2 text-lg text-gray-500 dark:text-gray-400 flex flex-col items-center">
									or drag and drop it here
									<span className="bg-[#FE2C55] text-white font-semibold px-16 py-2 rounded-md mt-2 hover:bg-[#d82345]">
										Select Video
									</span>
								</p>
							</div>

							<input
								id="dropzone-file"
								type="file"
								accept="video/*"
								onChange={handleFileChange}
								className="hidden"
							/>
						</label>
						<div className="w-full mt-7 flex justify-between">
							<span className="flex space-x-3 items-start max-w-64">
								<img
									src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTggOS42MDQ4OUwyMi41OTE1IDYuNDYzNDVDMjMuMTg4OSA2LjA1NDc2IDIzLjk5OTggNi40ODI0OCAyMy45OTk4IDcuMjA2MjNWMTYuNzkzNkMyMy45OTk4IDE3LjUxNzQgMjMuMTg4OSAxNy45NDUxIDIyLjU5MTUgMTcuNTM2NEwxOC4wMDAyIDE0LjM5NUwxOC4wMDAxIDEyLjAwMDNMMjEuOTk5NSAxNC43MDg1VjkuMjkxOTlMMTguMDAwMSAxMi4wMDAzTDE4IDkuNjA0ODlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjMyIi8+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xIDYuNUMxIDQuODQzMTUgMi4zNDMxNSAzLjUgNCAzLjVIMTVDMTYuNjU2OSAzLjUgMTggNC44NDMxNSAxOCA2LjVWMTcuNUMxOCAxOS4xNTY5IDE2LjY1NjkgMjAuNSAxNSAyMC41SDRDMi4zNDMxNSAyMC41IDEgMTkuMTU2OSAxIDE3LjVWNi41Wk00IDUuNUgxNUMxNS41NTIzIDUuNSAxNiA1Ljk0NzcyIDE2IDYuNVYxNy41QzE2IDE4LjA1MjMgMTUuNTUyMyAxOC41IDE1IDE4LjVINEMzLjQ0NzcyIDE4LjUgMyAxOC4wNTIzIDMgMTcuNVY2LjVDMyA1Ljk0NzcyIDMuNDQ3NzIgNS41IDQgNS41WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K"
									alt="Size and duration"
								/>
								<div>
									<p className="font-medium text-[18px]">Size and duration</p>
									<p className="text-[#0000007A] mt-1">
										Maximum size: 10 GB, video duration: 60 minutes.
									</p>
								</div>
							</span>
							<span className="flex space-x-3 items-start max-w-64">
								<img
									src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik02IDRDNS43MjM4NiA0IDUuNSA0LjIyMzg2IDUuNSA0LjVWMTkuNUM1LjUgMTkuNzc2MSA1LjcyMzg2IDIwIDYgMjBIMTlDMTkuMjc2MSAyMCAxOS41IDE5Ljc3NjEgMTkuNSAxOS41VjEwSDE0QzEzLjQ0NzcgMTAgMTMgOS41NTIyOCAxMyA5VjRINlpNMTUgNS4yODM5OFY4SDE3Ljk0MjNMMTUgNS4yODM5OFpNMy41IDQuNUMzLjUgMy4xMTkyOSA0LjYxOTI5IDIgNiAySDE0QzE0LjI1MTQgMiAxNC40OTM2IDIuMDk0NjggMTQuNjc4MyAyLjI2NTJMMjEuMTc4MyA4LjI2NTJDMjEuMzgzNCA4LjQ1NDUgMjEuNSA4LjcyMDkgMjEuNSA5VjE5LjVDMjEuNSAyMC44ODA3IDIwLjM4MDcgMjIgMTkgMjJINkM0LjYxOTI5IDIyIDMuNSAyMC44ODA3IDMuNSAxOS41VjQuNVoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMzIiLz4KICA8cGF0aCBkPSJNMTQuNzgyNiAxMy40NDM2QzE1LjA3MjUgMTMuNjExIDE1LjA3MjUgMTQuMDI5MyAxNC43ODI2IDE0LjE5NjdMMTAuNjUyMiAxNi41ODE0QzEwLjM2MjMgMTYuNzQ4NyAxMCAxNi41Mzk1IDEwIDE2LjIwNDhWMTEuNDM1NEMxMCAxMS4xMDA3IDEwLjM2MjMgMTAuODkxNiAxMC42NTIyIDExLjA1ODlMMTQuNzgyNiAxMy40NDM2WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K"
									alt="File formats"
								/>
								<div>
									<p className="font-medium text-[18px]">File formats</p>
									<p className="text-[#0000007A] mt-1">
										Recommended: “.mp4”. Other major formats are supported.
									</p>
								</div>
							</span>
							<span className="flex space-x-3 items-start max-w-64">
								<img
									src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIKICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGQ9Ik00IDJDMi42MTkyOSAyIDEuNSAzLjExOTI5IDEuNSA0LjVWMTkuNUMxLjUgMjAuODgwNyAyLjYxOTI5IDIyIDQgMjJIMjFDMjIuMzgwNyAyMiAyMy41IDIwLjg4MDcgMjMuNSAxOS41VjQuNUMyMy41IDMuMTE5MjkgMjIuMzgwNyAyIDIxIDJINFpNMy41IDQuNUMzLjUgNC4yMjM4NiAzLjcyMzg2IDQgNCA0SDIxQzIxLjI3NjEgNCAyMS41IDQuMjIzODYgMjEuNSA0LjVWMTkuNUMyMS41IDE5Ljc3NjEgMjEuMjc2MSAyMCAyMSAyMEg0QzMuNzIzODYgMjAgMy41IDE5Ljc3NjEgMy41IDE5LjVWNC41WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgogIDxwYXRoIGQ9Ik02LjcwMDk0IDE1LjA5NzdDNi4yMjQzNyAxNS4wOTc3IDUuOTQzMTIgMTQuNzkzIDUuOTQzMTIgMTQuNDI1OEM1Ljk0MzEyIDE0LjIyNjYgNS45OSAxNC4wNzQyIDYuMDgzNzUgMTMuOTA2Mkw3Ljg4ODQ0IDEwLjY0NDVWMTAuNjEzM0g1Ljc3MTI1QzUuMzk2MjUgMTAuNjEzMyA1LjEyNjcyIDEwLjM1OTQgNS4xMjY3MiA5Ljk4NDM4QzUuMTI2NzIgOS42MDkzOCA1LjM5NjI1IDkuMzYzMjggNS43NzEyNSA5LjM2MzI4SDguNTc1OTRDOS4xMTEwOSA5LjM2MzI4IDkuNTM2ODcgOS42OTUzMSA5LjUzNjg3IDEwLjIzMDVDOS41MzY4NyAxMC41MTk1IDkuNDQ3MDMgMTAuNzg1MiA5LjI0MzkxIDExLjE3MTlMNy40MzkyMiAxNC42MDk0QzcuMjUxNzIgMTQuOTY4OCA3LjA1NjQxIDE1LjA5NzcgNi43MDA5NCAxNS4wOTc3Wk0xMC42NDA2IDE1QzEwLjEwMTYgMTUgOS44NjcxOSAxNC42OTkyIDkuODY3MTkgMTQuMjg1MkM5Ljg2NzE5IDEzLjk4MDUgMTAuMDA3OCAxMy43NDYxIDEwLjMyMDMgMTMuNDg0NEwxMS44NzExIDEyLjE1NjJDMTIuNTAzOSAxMS42MTMzIDEyLjY4MzYgMTEuMzY3MiAxMi42ODM2IDExLjAzMTJDMTIuNjgzNiAxMC42NzU4IDEyLjQxMDIgMTAuNDI5NyAxMi4wMDc4IDEwLjQyOTdDMTEuNzEwOSAxMC40Mjk3IDExLjUwNzggMTAuNTY2NCAxMS4yOTY5IDEwLjg3MTFDMTEuMDc4MSAxMS4xOTE0IDEwLjg3ODkgMTEuMzA4NiAxMC41NjI1IDExLjMwODZDMTAuMTQwNiAxMS4zMDg2IDkuODgyODEgMTEuMDYyNSA5Ljg4MjgxIDEwLjY2NDFDOS44ODI4MSAxMC41MzUyIDkuOTA2MjUgMTAuNDE0MSA5Ljk1NzAzIDEwLjI5NjlDMTAuMjUzOSA5LjYyNSAxMS4wNDY5IDkuMjA3MDMgMTIuMDMxMiA5LjIwNzAzQzEzLjQwMjMgOS4yMDcwMyAxNC4yNzczIDkuODk4NDQgMTQuMjc3MyAxMC45MjE5QzE0LjI3NzMgMTEuNjc5NyAxMy44ODY3IDEyLjA3NDIgMTMuMDExNyAxMi44MzJMMTEuOTg0NCAxMy43MTg4VjEzLjc1SDEzLjc3MzRDMTQuMTg3NSAxMy43NSAxNC40MjE5IDEzLjk5NjEgMTQuNDIxOSAxNC4zNzVDMTQuNDIxOSAxNC43NDYxIDE0LjE4NzUgMTUgMTMuNzczNCAxNUgxMC42NDA2Wk0xNy4xOTM2IDE1LjE1NjJDMTUuNjQ2NyAxNS4xNTYyIDE0LjY3MDIgMTQuMDMxMiAxNC42NzAyIDEyLjE2OEMxNC42NzAyIDEwLjI5MyAxNS42NTg0IDkuMjAzMTIgMTcuMTkzNiA5LjIwMzEyQzE4LjcyODggOS4yMDMxMiAxOS43MTMxIDEwLjI4OTEgMTkuNzEzMSAxMi4xNjQxQzE5LjcxMzEgMTQuMDIzNCAxOC43NDA1IDE1LjE1NjIgMTcuMTkzNiAxNS4xNTYyWk0xNy4xOTM2IDEzLjg4MjhDMTcuNzAxNCAxMy44ODI4IDE4LjAyNTYgMTMuMzQ3NyAxOC4wMjU2IDEyLjE2OEMxOC4wMjU2IDEwLjk4NDQgMTcuNzAxNCAxMC40NzY2IDE3LjE5MzYgMTAuNDc2NkMxNi42ODU4IDEwLjQ3NjYgMTYuMzU3NyAxMC45ODQ0IDE2LjM1NzcgMTIuMTY4QzE2LjM1NzcgMTMuMzQ3NyAxNi42ODU4IDEzLjg4MjggMTcuMTkzNiAxMy44ODI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4zMiIvPgo8L3N2Zz4K"
									alt="Video resolutions"
								/>
								<div>
									<p className="font-medium text-[18px]">Video solutions</p>
									<p className="text-[#0000007A] mt-1">
										Minimum resolution: 720p. 2K and 4K are supported.
									</p>
								</div>
							</span>
							<span className="flex space-x-3 items-start max-w-64">
								<img
									src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNSA3LjVMMTcgNy41TDE3IDE2SDguNVY3LjVaTTYuNSA3LjVMNi40OTk5OSAxNi4yMjMxQzYuNDk5OTUgMTYuMzQyMyA2LjQ5OTg5IDE2LjQ4NDUgNi41MTAxMyAxNi42MDk4QzYuNTIyIDE2Ljc1NSA2LjU1MjQ0IDE2Ljk2MyA2LjY2MzQ5IDE3LjE4MUM2LjgwNzMgMTcuNDYzMiA3LjAzNjc3IDE3LjY5MjcgNy4zMTkwMSAxNy44MzY1QzcuNTM2OTYgMTcuOTQ3NiA3Ljc0NDk1IDE3Ljk3OCA3Ljg5MDE3IDE3Ljk4OTlDOC4wMTU0NSAxOC4wMDAxIDguMTU3NjUgMTguMDAwMSA4LjI3Njc1IDE4TDE3IDE4VjIxLjJDMTcgMjEuNDggMTcgMjEuNjIgMTcuMDU0NSAyMS43MjdDMTcuMTAyNCAyMS44MjExIDE3LjE3ODkgMjEuODk3NiAxNy4yNzMgMjEuOTQ1NUMxNy4zOCAyMiAxNy41MiAyMiAxNy44IDIySDE4LjJDMTguNDggMjIgMTguNjIgMjIgMTguNzI3IDIxLjk0NTVDMTguODIxMSAyMS44OTc2IDE4Ljg5NzYgMjEuODIxMSAxOC45NDU1IDIxLjcyN0MxOSAyMS42MiAxOSAyMS40OCAxOSAyMS4yVjE4SDIxLjdDMjEuOTggMTggMjIuMTIgMTggMjIuMjI3IDE3Ljk0NTVDMjIuMzIxMSAxNy44OTc2IDIyLjM5NzYgMTcuODIxMSAyMi40NDU1IDE3LjcyN0MyMi41IDE3LjYyIDIyLjUgMTcuNDggMjIuNSAxNy4yVjE2LjhDMjIuNSAxNi41MiAyMi41IDE2LjM4IDIyLjQ0NTUgMTYuMjczQzIyLjM5NzYgMTYuMTc4OSAyMi4zMjExIDE2LjEwMjQgMjIuMjI3IDE2LjA1NDVDMjIuMTIgMTYgMjEuOTggMTYgMjEuNyAxNkgxOUwxOSA3LjI3Njg2QzE5LjAwMDEgNy4xNTc3NSAxOS4wMDAxIDcuMDE1NDggMTguOTg5OSA2Ljg5MDE3QzE4Ljk3OCA2Ljc0NDk1IDE4Ljk0NzYgNi41MzY5NiAxOC44MzY1IDYuMzE5MDFDMTguNjkyNyA2LjAzNjc3IDE4LjQ2MzIgNS44MDczIDE4LjE4MSA1LjY2MzQ5QzE3Ljk2MyA1LjU1MjQ0IDE3Ljc1NSA1LjUyMiAxNy42MDk4IDUuNTEwMTNDMTcuNDg0NiA1LjQ5OTkgMTcuMzQyMyA1LjQ5OTk1IDE3LjIyMzMgNS40OTk5OUw4LjUgNS41VjIuOEM4LjUgMi41MTk5NyA4LjUgMi4zNzk5NiA4LjQ0NTUgMi4yNzNDOC4zOTc1NyAyLjE3ODkyIDguMzIxMDggMi4xMDI0MyA4LjIyNjk5IDIuMDU0NUM4LjEyMDA0IDIgNy45ODAwMyAyIDcuNyAySDcuM0M3LjAxOTk3IDIgNi44Nzk5NiAyIDYuNzczIDIuMDU0NUM2LjY3ODkyIDIuMTAyNDMgNi42MDI0MyAyLjE3ODkyIDYuNTU0NSAyLjI3M0M2LjUgMi4zNzk5NiA2LjUgMi41MTk5NyA2LjUgMi44VjUuNUwzLjMgNS41QzMuMDE5OTcgNS41IDIuODc5OTYgNS41IDIuNzczIDUuNTU0NUMyLjY3ODkyIDUuNjAyNDMgMi42MDI0MyA1LjY3ODkyIDIuNTU0NSA1Ljc3M0MyLjUgNS44Nzk5NiAyLjUgNi4wMTk5NyAyLjUgNi4zVjYuN0MyLjUgNi45ODAwMyAyLjUgNy4xMjAwNCAyLjU1NDUgNy4yMjY5OUMyLjYwMjQzIDcuMzIxMDcgMi42Nzg5MiA3LjM5NzU2IDIuNzczIDcuNDQ1NUMyLjg3OTk2IDcuNSAzLjAxOTk3IDcuNSAzLjMgNy41TDYuNSA3LjVaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjMyIi8+Cjwvc3ZnPgo="
									alt="Aspect ratios"
								/>
								<div>
									<p className="font-medium text-[18px]">Aspect raitos</p>
									<p className="text-[#0000007A] mt-1">
										Recommended: 16:9 for landscape, 9:16 for vertical.
									</p>
								</div>
							</span>
						</div>
					</div>
				</div>
			) : (
				<UploadVideo file={selectedFile} />
			)}
		</div>
	);
}

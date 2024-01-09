import React from "react";

interface TaskPaginationProps {
	currentPage: number;
	totalPages: number;
	onNextPage: () => void;
	onPrevPage: () => void;
}

const TaskPagination = ({
	currentPage,
	totalPages,
	onNextPage,
	onPrevPage,
}: TaskPaginationProps) => {
	return (
		<div className="d-flex justify-content-center align-items-center mt-3">
			<button
				className="btn btn-outline-secondary mx-2"
				onClick={onPrevPage}
				disabled={currentPage === 1}
			>
				Previous Page
			</button>
			<div className="d-flex align-items-center me-2">
				<p>
					Page {currentPage || 1} of {totalPages || 1}
				</p>
			</div>
			<button
				className="btn btn-outline-secondary mx-2"
				onClick={onNextPage}
				disabled={currentPage === totalPages || totalPages === 0}
			>
				Next Page
			</button>
		</div>
	);
};

export default TaskPagination;

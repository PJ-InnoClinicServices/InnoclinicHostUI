import * as React from 'react';
import { useEffect, useState } from 'react';
import { Rating } from 'primereact/rating';
import { toast, ToastContainer } from "react-toastify";
import { fetchReviewByAppointmentId, createNewReview } from "../../shared/store/reviewStore/reviewSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../shared/store/store.ts";
import { clearReviews } from "../../shared/store/reviewStore/reviewSlice";
import { format } from 'date-fns';

type AppointmentReviewProps = {
    appointmentId: string;
    doctorId: string;  // doctorId comes from props now
};

export const AppointmentReview = ({ appointmentId, doctorId }: AppointmentReviewProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { selectedReview, loading } = useSelector((state: RootState) => state.reviews);
    const user = useSelector((state: RootState) => state.user.user);

    const [value, setValue] = useState<number>();
    const [comment, setComment] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (appointmentId) {
            dispatch(fetchReviewByAppointmentId(appointmentId));
        }
        return () => {
            dispatch(clearReviews());
        };
    }, [appointmentId, dispatch]);

    useEffect(() => {
        if (selectedReview) {
            setValue(selectedReview.rating ?? 0);
            setComment(selectedReview.comment ?? '');
            setIsSubmitted(true);
        }
    }, [selectedReview]);

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const handleSubmit = async () => {
        if (!value || !comment.trim()) {
            toast.error("Please provide both a rating and a comment.");
            return;
        }
        if (!user?.id) {
            toast.error("User is not logged in.");
            return;
        }
        try {
            const newReview = {
                appointmentId,
                doctorId,
                patientId: user.id,
                rating: value,
                comment,
            };

            await dispatch(createNewReview(newReview)).unwrap();

            setIsSubmitted(true);
            toast.success("Review submitted!");
        } catch (error) {
            toast.error("Error submitting review");
        }
    };

    return (
        <div className="p-4 rounded-md">
            <ToastContainer />
            <h2 className="font-semibold text-xl">Appointment Review</h2>

            {loading && !selectedReview ? (
                <p className="text-gray-500">Loading review...</p>
            ) : (
                <div className="mt-4">
                    <Rating
                        value={value}
                        onChange={(e) => setValue(e.value || 0)}
                        cancel={false}
                        className="my-2"
                        disabled={isSubmitted || !!selectedReview}
                    />
                    <p className="text-gray-500">Rating: {value} / 5</p>

                    <div className="mt-4">
                        <label htmlFor="comment" className="block text-sm font-semibold">Your Comment
                            {selectedReview?.createdAt && (
                                <span className="text-xs text-gray-500 ml-2">
                                    ({format(new Date(selectedReview.createdAt), 'MMMM dd, yyyy HH:mm')})
                                </span>
                            )}
                        </label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={handleCommentChange}
                            rows={4}
                            className="w-[20vw] p-2 mt-2 border rounded-md"
                            placeholder="Write your review here..."
                            disabled={isSubmitted || !!selectedReview}
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            className={`w-[20vw] p-2 bg-blue-500 text-white rounded-md ${isSubmitted || !!selectedReview ? 'cursor-not-allowed bg-gray-400' : 'hover:bg-blue-600'}`}
                            disabled={isSubmitted || !!selectedReview}
                        >
                            {isSubmitted || !!selectedReview ? 'Review Submitted' : 'Submit Review'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

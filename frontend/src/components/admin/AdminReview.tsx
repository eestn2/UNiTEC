import { useEffect, useState } from "react";
import NavBar from "../UI/NavBar";
import AppWindow from "../UI/AppWindow";
import TranslateFigmaCoords from "../../global/function/TranslateFigmaCoords";
import ReviewRow from "../UI/admin/ReviewRow";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type Review = {
  id: number;
  reviewed_id: number;
  user_id: number;
  user_type: number;
  user_email?: string;
  reviewed_email?: string;
  text?: string;
};

const AdminReview: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const navigate = useNavigate();
    
  const loadReviews = async () => {
    try {
      const apiUrl = import.meta.env.PROD ? import.meta.env.VITE_API_URL_PROD : import.meta.env.VITE_API_URL_DEV;
      const response = await axios.get(`${apiUrl}/admin/get-reviews.php`);
        if (response.status !== 200 || response.data.status !== "success") {
          console.error("Failed to load reports:", response.data.message);
        } else {
          const reviewsList = response.data.data.reviews.map((review: any) => ({
            id: review.id,
            reviewed_id: review.reviewed_id,
            user_id: review.user_id,
            user_type: review.user_type,
            user_email: review.user_email,
            reviewed_email: review.reviewed_email,
            text: review.text,
          }));
          setReviews(reviewsList);
        }
    } catch (error) {
      console.error("An error occurred while loading reports:", error);
    }
  };
  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <>
      <NavBar />
      <AppWindow
        height={600}
        width={1240}
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          left: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
          top: `${TranslateFigmaCoords.translateFigmaY(100)}px`,
        }}
      >
        <AppWindow
          height={487}
          width={1200}
          style={{
            marginTop: `${TranslateFigmaCoords.translateFigmaY(10)}px`,
            border: `${TranslateFigmaCoords.translateFigmaX(3)}px solid #5386FF`,
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
          }}  > 
          <div  style={{
            overflowY: "scroll",
            height : `${TranslateFigmaCoords.translateFigmaX(487)}px`,
          }} >
            {reviews.map((review) => (
              <ReviewRow
                key={review.id}
                reviewerUserId={review.user_id}
                reviewedUserId={review.reviewed_id}
                reviewerEmail={review.user_email }
                reviewedEmail={review.reviewed_email}
                reviewerUserType ={review.user_type}
                reviewDescription={review.text}
                onClickSeeProfile={(userId) => {
                  navigate(`/profile/${userId}`);
                }}
              />))}
              </div>
          </AppWindow>
      </AppWindow>
    </>
  );
};

export default AdminReview;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { user } from "../../../types/user";

interface ProfilePictureProps {
    userId: string;
    size?: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ userId, size = 10 }) => {
    const navigate = useNavigate();
    const [User, setUser] = useState<user | null>(null);

    useEffect(() => {
        axios
            .get(`/src/API/requests/user/user-info.php?id=${userId}`)
            .then(res => {
                if (res.data.status === "success") {
                    setUser(res.data.data.user);
                }
            });
    }, [userId]);

    const handleProfileClick = () => {
        if (User) navigate(`/profile/${userId}`);
    };

    return (
        <img
            src={User?.profile_picture || '/default-profile.png'}
            alt={User ? `${User.name}'s profile` : 'Profile'}
            className="profile-picture"
            style={{ width: size * 8, height: size * 8, borderRadius: "50%" }}
            onClick={handleProfileClick}
        />
    );
};

export default ProfilePicture;
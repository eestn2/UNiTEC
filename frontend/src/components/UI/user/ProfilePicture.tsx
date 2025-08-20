import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { user } from "../../../types/user";
import { getTranslates } from "../../../global/function/getTranslates";
import defaultProfilePicture from '../../../assets/defaults/profile-picture/1.svg'; 

interface ProfilePictureProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    userId: number;
    size?: number;
    vertical?: boolean;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ userId, size = 10, vertical = false, style }) => {
    const navigate = useNavigate();
    const [User, setUser] = useState<user | null>(null);
    const [translateX] = getTranslates(vertical)

    useEffect(() => {
        axios
            .get(`/user/user-info.php?id=${userId}`)
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
            src={User?.profile_picture || defaultProfilePicture}
            alt={User ? `${User.name}` : 'Foto de perfil'}
            className="profile-picture"
            style={{ width: translateX(size), height: translateX(size), borderRadius: "50%", fill: "#aabac9", cursor: "pointer", ...style}}
            onClick={handleProfileClick}
            onMouseDown={(e) => {
                e.preventDefault();
                e.currentTarget.style.scale = '0.9';
            }} onMouseUp={(e) => {
                e.preventDefault(); 
                e.currentTarget.style.scale = '1';
            }}
            onMouseLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.scale = '1';
            }}
        />
    );
};

export default ProfilePicture;
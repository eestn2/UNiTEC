import { useState } from "react";
import { calculateAge } from "../../../global/function/calculateAge";
import getUserType from "../../../global/function/getUserType";
import TranslateFigmaCoords from "../../../global/function/TranslateFigmaCoords";
import user, { UserTypeEnum } from "../../../types/user";
import ActionButton from "../ActionButton";
import ConfirmModal from "../Modals/ConfirmModal";

interface PendingUserProps {
    user: user;
    onApprove: (id: number) => void;
    onReject: (id: number, type: UserTypeEnum) => void;
}

const PendingUser: React.FC<PendingUserProps> = ({ user, onApprove, onReject }) => {
    const [showRejectConfirm, setShowRejectConfirm] = useState(false);
    const [showAcceptConfirm, setShowAcceptConfirm] = useState(false);
    return (
    <div key={`pending-${user.id}`}>
    <div key={user.id} style={{
        background: 'white',
        borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
        padding: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
        marginTop: `${TranslateFigmaCoords.translateFigmaX(10)}px`,
        marginBottom: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
        boxShadow: `0 ${TranslateFigmaCoords.translateFigmaX(2)}px ${TranslateFigmaCoords.translateFigmaX(8)}px rgba(0,0,0,0.1)`,
        borderWidth :`${TranslateFigmaCoords.translateFigmaX(3)}px`,
        borderColor: '#5386FF',
        borderStyle: 'solid',
    }}>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridTemplateRows: 'repeat(1, 1fr)',
            gap: `${TranslateFigmaCoords.translateFigmaX(16)}px`,
            alignItems: 'center',
            border: `${TranslateFigmaCoords.translateFigmaX(5)}px`,
            paddingLeft: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            backgroundColor:'#DEE0EB',
            color:'#6F88B3',
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            borderWidth :`${TranslateFigmaCoords.translateFigmaX(3)}px`,
            borderColor: '#5386FF',
            borderStyle: 'solid'
        }}>
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "large",
            fontWeight: "bold",
        }}>
            {user.name}
        </div>
        <div className="users_approve">
            {calculateAge(user.birth_date)} años
        </div>
        <div className="users_approve">
            {user.location}
        </div>
        <div className="users_approve">
            {user.email}
        </div>
        <div  className="users_approve">
            {user.portfolio}
        </div>
        <div className="users_approve">
            {getUserType(user.type)}</div>
        </div>

        <div style={{ marginTop:`${TranslateFigmaCoords.translateFigmaX(10)}px`, display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
        <ActionButton text={"Aceptar"}
        style={{                
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            padding: `${TranslateFigmaCoords.translateFigmaX(18)}px ${TranslateFigmaCoords.translateFigmaY(16)}px`,}}
        action={() => {
            setShowAcceptConfirm(true);
        }}/>
        <ActionButton text={"Rechazar"}
        style={{                
            borderRadius: `${TranslateFigmaCoords.translateFigmaX(20)}px`,
            padding: `${TranslateFigmaCoords.translateFigmaX(18)}px ${TranslateFigmaCoords.translateFigmaY(16)}px`,
            backgroundColor: "#F03D3D"
        }}
        action={() => {
            setShowRejectConfirm(true)
        }} />
        </div>
    </div>
    {showRejectConfirm && (
    <ConfirmModal
        title="Confirmar rechazo"
        message="¿Estás seguro de que deseas rechazar este usuario?"
        onAccept={() => onReject(user.id, user.type)}
        onReject={() => setShowRejectConfirm(false)}
        onClose={() => setShowRejectConfirm(false)}
    />
    )}
    {showAcceptConfirm && (
    <ConfirmModal
        title="Confirmar aceptación"
        message="¿Estás seguro de que deseas aceptar este usuario?"
        onAccept={() => onApprove(user.id)}
        onReject={() => setShowAcceptConfirm(false)}
        onClose={() => setShowAcceptConfirm(false)}
    />
    )}
</div>
)};


export default PendingUser;
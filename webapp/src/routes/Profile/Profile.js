import { useState } from "react";
import { connect } from "react-redux";
import { editUser } from "../../state/users/actions";
import { logoutUser } from "../../state/auth/actions";
import axios from "axios";
import toBase64 from "../../toBase64";
import Button from "../../components/Button/Button";
import "./Profile.scss";
import FileInput from "../../components/FileInput/FileInput";
import Textarea from "../../components/Textarea/Textarea";

const Profile = ({ user, onEditUser, onLogout }) => {
  const [editMode, setEditMode] = useState(false);
  return editMode ? (
    <EditMode
      user={user}
      handleModeChange={setEditMode}
      onEditUser={onEditUser}
    />
  ) : (
    <ViewMode user={user} handleModeChange={setEditMode} onLogout={onLogout} />
  );
};

const ViewMode = ({ user, handleModeChange, onLogout }) => {
  return (
    <div className="profile">
        <div className="profile__left">
            <h1>My profile</h1>
            <div className="profile__left__image">
              <img src={user.picture} alt={user.id} />  
            </div>
            
            <h3>
                {user.bio ? user.bio : "No bio..."}
            </h3>
            <div className="profile__left__buttons">
                <Button text="Edit profile" onClick={() => handleModeChange(true)} />
                <Button primary text="Sign out" onClick={() => onLogout()} />
            </div>            
        </div>
        <div className="profile__image">
            <img src="/img/profile-main.svg" alt="profile-main-img" />
        </div>


    </div>
  );
};

const EditMode = ({ user, handleModeChange, onEditUser }) => {
  const [image, setImage] = useState();
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (image && image.name.slice(-3) !== "png") {
      setError("image");
      setErrorMsg("Must be PNG");
      setTimeout(() => {
        setError("");
        setErrorMsg("")
      }, 3000);
      return;
    }

    const body = {
      base64Image:
        image && image.name.slice(-3) === "png" ? await toBase64(image) : null,
      bio,
    };
    handleModeChange(false);
    axios.put(`/users/${user.id}/profile`, {
        ...body
    }).then(res => {
        onEditUser({
            id: user.id,
            bio: res.data.bio,
            picture: res.data.picture ? res.data.picture : user.picture
        });
        handleModeChange(false);
    }).catch(err => console.log(err));
  };

  return (
  <>
    <div className="profile">
        <div className="profile__left">
            <h1>My profile</h1>
            <div className="profile__left__image">
              <img src={user.picture} alt={user.id} />
              <div className="profile__left__imageSelector">
                <FileInput 
                  error={error === "image"} 
                  onChange={(e) => setImage(e.target.files[0])} 
                  text={`${error === "image" ? errorMsg : image ? image.name.slice(0, 10) + "...." : "Choose picture"}`} />
              </div>
            </div>

            <Textarea active={bio !== ""} value={bio} rows="5" label="Bio..." onChange={(e) => setBio(e.target.value)} />
            <div className="profile__left__buttons">
                <Button primary text="Save" onClick={handleSubmit} />
            </div>            
        </div>
        <div className="profile__image">
            <img src="/img/profile-second.svg" alt="profile-main-img" />
        </div>


    </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
const mapDispatchToProps = (dispatch) => ({
  onEditUser: (user) =>
    dispatch(editUser({ id: user.id, bio: user.bio, picture: user.picture })),
  onLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

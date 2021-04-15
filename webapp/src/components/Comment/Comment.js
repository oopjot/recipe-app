import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Comment.scss"

const Comment = ({ id, recipeId, authorName, text, rate, author, user, users, onDeleteComment }) => {

    const handleDelete = () => {
        onDeleteComment({commentId: id, recipeId})
    };

    const authorImg = users.find(u => u.id === author).picture;

    return (
        <div className="comment">
            <div className="comment__img">
                <img src={`/${authorImg}`} alt={author} />
            </div>
            <div className="comment__body">
                <div className="comment__body__header">
                    <h3>
                        <Link to={`/profile/${author}`}>{authorName}</Link> 
                    </h3>
                    <small>
                        Rate: <p>{' ' + rate}</p> 
                    </small>
                </div>
                <p className="comment__body__text">
                    {text}
                </p>
                {user.id === author ? (<Button deleteBtn text="X" onClick={handleDelete} />) : <></>}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user,
    users: state.users
});

export default connect(mapStateToProps)(Comment);
import { Field, Form, Formik } from "formik"
import { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { postComment } from "../../state/recipes/operations";
import Button from "../Button/Button";
import Textarea from "../Textarea/Textarea";
import "./CommentForm.scss";

const CommentForm = ({ user, onPostComment, recipeId, fetchRecipes }) => {

    const [error, setError] = useState(<></>);

    const handleSubmit = (values, { resetForm }) => {
        if (values.text.length < 10) {
            setError((
                <div className="alert alert-danger" role="alert">
                    Comment too short
                </div>
            ));
            setTimeout(() => setError((<></>)), 3000)
            return;
        }
        const comment = {
            commentId: uuidv4(),
            author: user.id,
            authorName: user.name,
            text: values.text,
            rate: parseInt(values.rate),
        };
        onPostComment({
            recipeId,
            comment
        });
        resetForm({
            text: "",
            rate: 5
        });
    }

    return (
        <Formik
            initialValues={{
                text: "",
                rate: 5
            }}
            onSubmit={handleSubmit}
        >
            {({ values, resetForm }) => (
                <div className="commentForm">
                    <Form>
                        <div className="commentForm__comment">
                            <Textarea active={values.text !== ""} rows="5" form label="Comment" name="text" />
                            <div className="commentForm__comment__rating">
                                <label htmlFor="rate" className="form-label">Rate</label>
                                <Field as="select" id="rate" className="form-select" aria-label="Rate" name="rate" >
                                    {[5, 4, 3, 2, 1].map(n => (<option key={n} value={n}>{n}</option>))}
                                </Field>
                                {error}
                            </div>
                        </div>
                        <div className="commentForm__buttons">
                            <Button primary soft text="Add comment" type="submit" />
                            <Button primary soft text="Clear" onClick={resetForm} type="reset" />
                        </div>
                    </Form>
                </div>
            )}

        </Formik>
    );
};

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    onPostComment: payload => dispatch(postComment(payload)),    
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
import { FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import toBase64 from "../../toBase64";
import { postRecipe } from "../../state/recipes/operations";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Input from "../../components/Input/Input";
import "./RecipeForm.scss"
import Textarea from "../Textarea/Textarea";
import FileInput from "../FileInput/FileInput";
import Button from "../Button/Button";

const RecipeForm = ({ user, onPostRecipe }) => {

    const [image, setImage] = useState();
    const [error, setError] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (values, { resetForm }) => {
        if (values.name.length < 2) {
            setError("name");
            setErrorMsg("Name too short");
            setTimeout(() => {
                setError("");
                setErrorMsg("");
            }, 3000)
            return;
        };
        if (values.description.length < 10) {
            setError("description");
            setErrorMsg("Description too short");
            setTimeout(() => {
                setError("");
                setErrorMsg("");
            }, 3000)
            return;
        };
        if (!image) {
            setError("image");
            setErrorMsg("Must image");
            setTimeout(() => {
                setError("");
                setErrorMsg("");
            }, 3000)
            return;
        };
        if (image.name.slice(-3) !== "png") {
            setError("image");
            setErrorMsg("Must be PNG");
            setTimeout(() => {
                setError("");
                setErrorMsg("");
            }, 3000)
            return;
        };
        if (values.ingredients.length < 2) {
            setError("ingredients");
            setErrorMsg("Minimum two");
            setTimeout(() => {
                setError("");
                setErrorMsg("");
            }, 3000)
            return;
        };

        const body = {
            ...values,
            imageId: uuidv4(),
            comments: [],
            rate: 0,
            image: await toBase64(image)
        };
        onPostRecipe({body, id: user.id});

        resetForm({
            name: "",
            description: "",
            ingredients: []
        })
    };

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                ingredients: []
            }}
            onSubmit={handleSubmit}
        >
            
            {({ values, resetForm }) => (
                <Form>
                    <Input 
                        active={values.name !== ""} 
                        label="Name" 
                        error={error === "name"}
                        errorMsg={error === "name" && errorMsg}
                        name="name" 
                        utility="form" />
                    <Textarea 
                        active={values.description !== ""} 
                        rows="5" 
                        form 
                        label="Description" 
                        error={error === "description"}
                        errorMsg={error === "description" && errorMsg}
                        name="description" />
                    <FileInput 
                        formBtn 
                        onChange={e => setImage(e.target.files[0])} 
                        error={error === "image"} 
                        text={`${error === "image" ? errorMsg : image ? image.name.slice(0, 10) + "..." : "Choose picture"}`} />
                    <FieldArray 
                        name="ingredients"
                        render={arrayHelpers => (
                            values.ingredients && values.ingredients.length > 0 ? (<>
                                <Button 
                                    text={`${error === "ingredients" ? errorMsg : "Add"}`}
                                    error={error === "ingredients"}
                                    soft
                                    primary
                                    onClick={() => arrayHelpers.insert(0, {name: "", amount: ""})} />
                                <div className="ingredients">
                                {values.ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredients__newIngredient">
                                        <Input 
                                            utility="ingredientForm"
                                            label="Ingredient"
                                            active={values.ingredients[index].name !== ""}
                                            name={`ingredients.${index}.name`} />
                                        <Input
                                            utility="ingredientForm"
                                            label="Amount" 
                                            active={values.ingredients[index].amount !== ""}
                                            name={`ingredients.${index}.amount`} />
                                        <Button 
                                            text="X"
                                            deleteBtn
                                            onClick={() => arrayHelpers.remove(index)} />
                                    </div>
                                ))}
                            </div></>
                            ) : (
                            <Button 
                                formBtn 
                                soft 
                                primary 
                                error={error === "ingredients"} 
                                text={`${error === "ingredients" ? errorMsg : "Add ingredient"}`} 
                                onClick={() => arrayHelpers.push({name: "", amount: ""})} />
                            )
                        )}
                    />
                    <div className="recipeButtons">
                        <Button formBtn soft primary text="Add recipe" type="submit" />
                        <Button
                            formBtn
                            text="Reset form"
                            onClick={() => {
                                resetForm({
                                    name: "",
                                    description: "",
                                    ingredients: []
                                });
                                setImage(null);
                            }} 
                            type="reset" />
                    </div>
                </Form>
            )}

        </Formik>
    )
}

const mapDispatchToProps = (dispatch) => ({
    onPostRecipe: (payload) => dispatch(postRecipe(payload)),
});


export default connect(null, mapDispatchToProps)(RecipeForm);
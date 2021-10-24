import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { createCategory, categoryErrorsClear } from '../../../store/actions/adminAction'
import { CATEGORY_STATE_RESET } from "../../../store/Types/adminTypes"
import ParentCategorys from "../../Utils/ParentCategorys";


const Category = () => {
    const [ctg, setCtg] = useState("");
    const [visibility, setVisibility] = useState("")
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const dispatch = useDispatch()
    const alert = useAlert()
    const { isCreated, loading, errors: ctgError } = useSelector(state => state.adminCategory)

    const submitForm = data => {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("slug", data.slug)
        formData.append("description", data.description)
        formData.append("visibility", visibility)
        formData.append("parentCategory", ctg)

        dispatch(createCategory(formData))
    }


    useEffect(() => {
        if (ctgError) {
            alert.error(ctgError)
            dispatch(categoryErrorsClear())
        }

        if (isCreated) {
            alert.success("Category create success")
            dispatch({ type: CATEGORY_STATE_RESET })
        }
    }, [ctgError, isCreated, dispatch, alert])

    return (
        <section className="category db__background">
            <div className="container" >
                <div className="category__header d-flex justify-content-between my-4">
                    <div>
                        <h3 className="card-title" >New Category</h3>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="success"
                            className="db__btn"
                            type="submit"
                            onClick={handleSubmit(submitForm)}
                        >
                            Save
                        </Button>
                    </div>
                </div>
                <div className="category__form">
                    <form action=""  >
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card card-body">
                                    <div className="category__basicInfo">
                                        <div className="mb-4">
                                            <h6 className="card-title">
                                                Basic information
                                            </h6>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="name">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    id="name"
                                                    placeholder="Man's T-shirt"
                                                    {...register("name")}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group ">
                                                <label htmlFor="slug">Slug</label>
                                                <div className="d-flex align-items-center slug" >
                                                    <span>https://example.com/category/</span>
                                                    <input
                                                        type="text" className="form-control"
                                                        id="slug"
                                                        name="slug"
                                                        placeholder="man's-t-shirt"
                                                        {...register("slug")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="description">
                                                    Description
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="description"
                                                    name="description"
                                                    {...register("description")}
                                                    rows="6"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-4">
                                    <div className="card card-body">
                                        <div className="category__visibility">
                                            <h6 className="card-title">Visibility</h6>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="visibility"
                                                    onChange={(e) => setVisibility(e.target.value)}
                                                    value={visibility}
                                                >
                                                    <FormControlLabel
                                                        value="visibile"
                                                        control={<Radio className="radio" />}
                                                        label="Visibile" />
                                                    <FormControlLabel
                                                        value="hidden"
                                                        control={<Radio className="radio" />}
                                                        label="Hidden" />
                                                </RadioGroup>
                                            </FormControl>

                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="card card-body">
                                        <div className="category__category">
                                            <h6 className="card-title">
                                                Parent category
                                            </h6>
                                            <FormControl sx={{ m: 1, maxWidth: 300, width: 300 }}>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={ctg}
                                                    label="Parent category"
                                                    onChange={(e) => setCtg(e.target.value)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}

                                                >
                                                    <MenuItem value="">
                                                        <em>Category Select</em>
                                                    </MenuItem>
                                                    {ParentCategorys.map(category => (
                                                        <MenuItem key={category} value={category}>{category}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Category;

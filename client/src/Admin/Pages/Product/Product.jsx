import { useState } from "react"
import Resizer from "react-image-file-resizer";

import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            300,
            300,
            "JPEG png jpg",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

const categorys = [
    "Mans Fashiouns",
    "Womens Fashiouns",
    "Child Fashiouns",
    "Electronics",
]

const Product = () => {
    const [ctg, setCtg] = useState("");
    const [productImgs, setProductImgs] = useState([])
    const [openDiscount, setOpenDiscount] = useState(false)
    const [visibility, setVisibility] = useState("")


    const submitImg = async (event) => {
        try {
            const file = event.target.files[0];
            const image = await resizeFile(file);
            setProductImgs(prvImg => [...prvImg, image])
        } catch (err) {
            console.log(err);
        }
    }

    const deleteImg = (img) => {
        let newArray = productImgs.filter(p => p != img)
        console.log(newArray)
        setProductImgs([...newArray])
    }




    return (
        <section className="product">
            <div className="container" >
                <div className="product__header">
                    <div>
                        <h3 className="product__header--title" >New Product</h3>
                    </div>
                    <div>
                        <button className="product__header--btn db__btn" >Save</button>
                    </div>
                </div>
                <div className="product__form">
                    <form action="">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="card card-body">
                                    <div className="product__basicInfo">
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
                                                <input type="text" class="form-control" id="name" placeholder="Product name" />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group ">
                                                <label htmlFor="slug">Slug</label>
                                                <div className="d-flex align-items-center slug" >
                                                    <span>https://example.com/products/</span>
                                                    <input type="text" className="form-control" id="slug" placeholder="example-product-160" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="description">
                                                    Description
                                                </label>
                                                <textarea class="form-control" id="description" rows="6"></textarea>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-group">
                                                <label htmlFor="shortdescription">
                                                    Short Description
                                                </label>
                                                <textarea className="form-control" id="shortdescription" rows="2"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-body my-5">
                                    <div className="product__price">
                                        <h6 className="card-title">
                                            Pricing
                                        </h6>
                                        <div className="my-2 row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="price">
                                                        Price
                                                    </label>
                                                    <input type="number" class="form-control" id="price" placeholder="Product Price" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="oldprice">
                                                        Old Price
                                                    </label>
                                                    <input type="number" class="form-control" id="oldprice" placeholder="Old Price" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-2">
                                            <div class="custom-control custom-checkbox">
                                                <Checkbox
                                                    onClick={() => setOpenDiscount(!openDiscount)}
                                                    className="discount_check"
                                                />
                                                <label class="custom-control-label" for="exampleCheck">
                                                    Discount
                                                </label>
                                            </div>
                                        </div>
                                        {openDiscount &&
                                            <div className="form-group">
                                                <label htmlFor="oldprice">
                                                    Product Discount
                                                </label>
                                                <input type="number" class="form-control" id="oldprice" placeholder="discount must be in (%)" />
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="card card-body my-5">
                                    <div className="product__inventory">
                                        <h6 className="product__inventory--title card-title">
                                            Inventory
                                        </h6>
                                        <div className="my-4">
                                            <div className="form-group">
                                                <label htmlFor="sku">
                                                    SKU
                                                </label>
                                                <input type="text" class="form-control" id="sku" placeholder="SCREW150" />
                                            </div>
                                        </div>
                                        <div className="my-4">
                                            <div className="form-group">
                                                <label htmlFor="stock">
                                                    Stock
                                                </label>
                                                <input type="number" class="form-control" id="stock" placeholder="Product Quantity" />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card card-body my-5">
                                    <div className="product_img">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="card-title">Images</h6>
                                            <label htmlFor="product-img" >
                                                <input
                                                    onChange={submitImg}
                                                    type="file"
                                                    id="product-img"
                                                    accept="image/*"
                                                    className="d-none"
                                                />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <Fab color="primary" aria-label="product-img" component="span">
                                                        <PhotoCamera />
                                                    </Fab>
                                                </IconButton>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="product__img__container">
                                        {
                                            productImgs.length == 0 ?
                                                <div className="text-center" >
                                                    <h4>No Image Secected</h4>
                                                </div> :
                                                <>
                                                    <div className="d-flex justify-content-between mt-4" >
                                                        <h6>Image</h6>
                                                        <h6>Action</h6>
                                                    </div>
                                                    <hr />
                                                    {productImgs.map((img, index) => (
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <div className=" w-25 h-25" >
                                                                <img src={img}
                                                                    alt="Product image"
                                                                    id={index}
                                                                    className=" w-100 h-100" />
                                                            </div>
                                                            <div>
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    onClick={() => deleteImg(img)}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-4">
                                    <div className="card card-body">
                                        <div className="product__visibility">
                                            <h6 className="card-title">Visibility</h6>
                                            <FormControl component="fieldset">
                                                <RadioGroup
                                                    aria-label="gender"
                                                    defaultValue={visibility ?? ""}
                                                    name="radio-buttons-group"
                                                    onChange={(e) => setVisibility(e.target.value)}
                                                >
                                                    <FormControlLabel value="visibile" control={<Radio className="radio" />} label="Visibile" />
                                                    <FormControlLabel value="hidden" control={<Radio className="radio" />} label="Hidden" />
                                                </RadioGroup>
                                            </FormControl>

                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="card card-body">
                                        <div className="product__category">
                                            <h6 className="card-title">
                                                Product Category
                                            </h6>
                                            <FormControl sx={{ m: 1, minWidth: 300 }}>
                                                <Select
                                                    labelId="demo-simple-select-helper-label"
                                                    id="demo-simple-select-helper"
                                                    value={ctg}
                                                    label="Age"
                                                    onChange={(e) => setCtg(e.target.value)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Category Select</em>
                                                    </MenuItem>
                                                    {categorys.map(category => (
                                                        <MenuItem value={category}>{category}</MenuItem>
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

export default Product;

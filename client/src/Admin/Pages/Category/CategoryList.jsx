import Button from '@mui/material/Button';

const Categorylist = () => {
    return (
        <section className="categoryList db__background">
            <div className="container">
                <div className="category__header d-flex justify-content-between my-4">
                    <div>
                        <h3 className="card-title" >Categorys</h3>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="success"
                            className="db__btn"
                            type="submit"
                        >
                            New Category
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Categorylist;

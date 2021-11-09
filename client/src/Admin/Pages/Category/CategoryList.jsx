import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllCategory, categoryErrorsClear } from "../../../store/actions/adminAction"

function createData(name, items, visibility, actions) {
    return {
        name,
        items,
        visibility,
        actions
    };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
    {
        id: 'no',
        numeric: false,
        disablePadding: true,
        label: 'NO',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'items',
        numeric: true,
        disablePadding: false,
        label: 'Items',
    },
    {
        id: 'visibility',
        numeric: true,
        disablePadding: false,
        label: 'Visibility',
    },
    {
        id: 'actions',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    },
];



const Categorylist = () => {

    const dispatch = useDispatch()
    const { categorys, loading, errors } = useSelector(state => state.adminCategoryList)


    useEffect(() => {
        dispatch(getAllCategory())
    }, [])


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
                <div className="categoryList__body">
                    <div className="card card-body">
                        <CategoryTableList categorys={categorys} />
                    </div>
                </div>
            </div>
        </section>
    );
}


const CategoryTableList = ({ categorys }) => {
    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    {headCells.map((obj) => (
                        <th scope="col" id={obj.id} >{obj.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>

                {categorys.map((value, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value.name}</td>
                        <td>{0}</td>
                        <td>{value.visibility}</td>
                        <td>
                            <EditIcon />
                            <DeleteIcon />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Categorylist;

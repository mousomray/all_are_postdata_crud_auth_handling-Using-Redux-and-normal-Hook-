import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateproduct } from "../Allreducers/editslice";
import { single } from "../Allreducers/detailslice";

const initialValue = {
    title: "",
    description: "",
    image: "",
};

const Update = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updateData, setUpdateData] = useState(initialValue);
    const [image, setImage] = useState(null);


    // Get product For Single Value start
    const getProduct = async () => {
        try {
            const response = await dispatch(single(id));
            const reg = {
                title: response?.payload?.title,
                description: response?.payload?.description,
                image: response?.payload?.image,
            };
            setUpdateData(reg);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);
    // Get product For Single Value end


    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("id", id);
        formData.append("title", updateData.title);
        formData.append("description", updateData.description);
        formData.append("image", image);

        try {
            await dispatch(updateproduct(formData));
            setLoading(false);
            navigate("/showproduct");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="my-2">Edit the data</h2>
            <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
                <div class="mb-3">
                    <label class="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        class="form-control"
                        value={updateData?.title}
                        onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input
                        type="text"
                        name="description"
                        class="form-control"
                        value={updateData?.description}
                        onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />
                    {image && (
                        <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                    )}
                </div>

                <button type="submit" class="btn btn-primary">
                    {loading ? 'Loading...' : 'Edit'}
                </button>
            </form>
        </div>
    );
};

export default Update;

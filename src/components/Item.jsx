import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../services/api";

const Item = forwardRef(({ data, onDelete }, ref) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const id = data.id;
      await deleteProduct(id);
      console.log("Deleted");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePurchase = () => {
    // Implement your purchase logic here
  };

  return (
    <div ref={ref}>
      {Object.keys(data).map((key) =>
        key === "imgUrl" ? (
          <img
            key={key}
            src={data[key]}
            alt="Item Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <p key={key}>
            <strong>{key}:</strong> {data[key]}
          </p>
        )
      )}
      <button onClick={handleDelete}>Delete Item</button>
      <button onClick={handlePurchase}>Comprar</button>
    </div>
  );
});

export default Item;

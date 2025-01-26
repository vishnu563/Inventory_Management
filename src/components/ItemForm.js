import React, { useState } from "react";

function ItemForm({ categories, onSave }) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "",
    quantity: "",
  });

  const [newCategory, setNewCategory] = useState(""); 
  const [isCustomCategory, setIsCustomCategory] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "custom") {
      setIsCustomCategory(true);
      setFormData({ ...formData, category: "" });
    } else {
      setIsCustomCategory(false);
      setFormData({ ...formData, category: selectedValue });
    }
  };

  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    setNewCategory(value);
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || formData.quantity === "") {
      alert("Please fill out all fields.");
      return;
    }

    if (formData.quantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }
   
    onSave(formData);
   
    setFormData({ id: null, name: "", category: "", quantity: "" });
    setNewCategory("");
    setIsCustomCategory(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>
          Name:
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Category:
          <select
            value={isCustomCategory ? "custom" : formData.category}
            onChange={handleCategoryChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
            <option value="custom">Add New Category</option>
          </select>
        </label>
        {isCustomCategory && (
          <input
            type="text"
            placeholder="Enter new category"
            value={newCategory}
            onChange={handleNewCategoryChange}
            className="form-input"
            required
          />
        )}
      </div>
      <div className="form-group">
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="form-input"
            required
          />
        </label>
      </div>
      <button type="submit" className="form-button">Add Item</button>
    </form>
  );
}

export default ItemForm;

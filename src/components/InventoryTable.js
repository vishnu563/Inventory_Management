import React, { useState } from "react";


function InventoryTable({
  items,
  categories,
  filterCategory,
  sortOrder,
  onFilterChange,
  onSortChange,
  onDelete,
  onEdit,
}) {

  const [editingItemId, setEditingItemId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleCategoryFilter = (e) => onFilterChange(e.target.value);

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditFormData(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSave = () => {
    onEdit(editFormData);
    setEditingItemId(null);
  };

  const sortedItems = [...items].sort((a, b) =>
    sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
  );

  const filteredItems = filterCategory
    ? sortedItems.filter((item) => item.category === filterCategory)
    : sortedItems;

  return (
    <div className="table-container">

      <div className="filter-section">
        <label>
          Filter by Category:
          <select onChange={handleCategoryFilter} 
          value={filterCategory}
          className="filter-select">
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <button onClick={() => onSortChange("asc")} className="sort-button">Sort Asc</button>
        <button onClick={() => onSortChange("desc")} className="sort-button">Sort Desc</button>

      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

          {filteredItems.map((item) => (
            <tr
              key={item.id}
              className={item.quantity < 10 ? "low-stock" : ""}
            >
              {editingItemId === item.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="edit-select"
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleEditChange}
                       className="edit-input"
                    />
                  </td>
                  <td>
                    <button onClick={handleEditSave} className="save-button">Save</button>
                    <button onClick={() => setEditingItemId(null)} className="cancel-button">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button onClick={() => handleEditClick(item)} className="edit-button">Edit</button>
                    <button onClick={() => onDelete(item.id)} className="delete-button">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>

      </table>
      
    </div>
  );
}

export default InventoryTable;

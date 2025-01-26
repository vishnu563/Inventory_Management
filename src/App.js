import React, { useState } from "react";
import InventoryTable from "./components/InventoryTable";
import ItemForm from "./components/ItemForm";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const addItem = (newItem) => {
    
    setItems([...items, { ...newItem, id: Date.now() }]);

    
    if (!categories.includes(newItem.category)) {
      setCategories([...categories, newItem.category]);
    }
  };

  const editItem = (updatedItem) => {
    
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));

    
    if (!categories.includes(updatedItem.category)) {
      setCategories([...categories, updatedItem.category]);
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1>Inventory Management</h1>
      <ItemForm
        categories={categories}
        onSave={(item) => {
          if (item.id) {
            editItem(item);
          } else {
            addItem(item);
          }
        }}
      />
      <InventoryTable
        items={items}
        categories={categories}
        filterCategory={filterCategory}
        sortOrder={sortOrder}
        onFilterChange={setFilterCategory}
        onSortChange={setSortOrder}
        onDelete={deleteItem}
        onEdit={editItem}
      />
    </div>
  );
}

export default App;

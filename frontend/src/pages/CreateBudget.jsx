import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";
const CreateBudget = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoader, setcateoryLoader] = useState(true);
  const [createCategory, setCreateCategory] = useState(false);
  const [createCategoryData, setcreateCategoryData] = useState({
    category: "",
  });

  //  create budget:
  const [budgetData, setBudgetData] = useState({
    category: "",
    amount: "",
    month: "",
    year: "",
  });
  const getCategories = async () => {
    try {
      const response = await apiClient.get("/category/get");
      setCategories(response.data.data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setcateoryLoader(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setcreateCategoryData({
      ...createCategoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/category/create", createCategoryData);
      getCategories();
      setcreateCategoryData({
        category: "",
      });
      setCreateCategory(!createCategory);
    } catch (err) {
      console.log(err.message);
    }
  };

  const month = [
    {
      value: 1,
      name: "January",
    },
    {
      value: 2,
      name: "February",
    },
    {
      value: 3,
      name: "March",
    },
    {
      value: 4,
      name: "April",
    },
    {
      value: 5,
      name: "May",
    },
    {
      value: 6,
      name: "June",
    },
    {
      value: 7,
      name: "July",
    },
    {
      value: 8,
      name: "August",
    },
    {
      value: 9,
      name: "September",
    },
    {
      value: 10,
      name: "October",
    },
    {
      value: 11,
      name: "November",
    },
    {
      value: 12,
      name: "December",
    },
  ];

  const handleChange = (e) => {
    setBudgetData({
      ...budgetData,
      [e.target.name]: e.target.value,
    });
  };

  const submitBudget = (e) => {
    e.preventDefault();
    console.log(budgetData, "test");
  };

  return (
    <>
      <main>
        <h1>create your budget here :</h1>
        <form onSubmit={submitBudget}>
          <div className="category">
            <label>category</label>
            {categoryLoader ? (
              <>
                <select name="" id="">
                  <option value="" disabled>
                    loading...
                  </option>
                </select>
              </>
            ) : categories.length === 0 ? (
              <>
                <select name="" id="">
                  <option value="" disabled>
                    no categories found
                  </option>
                </select>
              </>
            ) : (
              <>
                <select name="category" onChange={handleChange}>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="create-category">
              {createCategory ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter Category"
                    onChange={handleCategoryChange}
                    name="category"
                    value={createCategoryData.category}
                  />{" "}
                  <button onClick={handleCategorySubmit}>save</button>{" "}
                  <button onClick={() => setCreateCategory(!createCategory)}>
                    cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setCreateCategory(!createCategory)}>
                    create category
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="amount">
            <label>Amount:</label>
            <input
              type="number"
              value={budgetData.amount}
              placeholder="Enter Your Amount"
              name="amount"
              onChange={handleChange}
            />
          </div>
          <div className="month">
            <label>Month:</label>
            <select onChange={handleChange} name="month">
              {month.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="year">
            <label>Year:</label>
            <input
              type="number"
              placeholder="Enter Your Year"
              min="2026"
              max="2100"
              onChange={handleChange}
              value={budgetData.year}
              name="year"
            />
          </div>

          <button type="submit">create budget</button>
        </form>
      </main>
    </>
  );
};
export default CreateBudget;

import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";
const CreateBudget = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoader, setcateoryLoader] = useState(true);
  const [createCategory, setCreateCategory] = useState(false);
  const [createCategoryData, setcreateCategoryData] = useState({
    category: "",
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

  return (
    <>
      <main>
        <h1>create your budget here :</h1>
        <form>
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
                <select name="" id="">
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
            <input type="number" placeholder="Enter Your Amount" />
          </div>
          <div className="month">
            <label>Month:</label>
            <select>
              {month.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>
          <div className="year">
            <label>Year:</label>
            <input type="number" placeholder="Enter Your Year" />
          </div>
        </form>
      </main>
    </>
  );
};
export default CreateBudget;

import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";
const CreateBudget = () => {
  const [categories, setCategories] = useState([]);
  const [categoryLoader, setcateoryLoader] = useState(true);
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
  console.log(categories, "testttcat");
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
          </div>
        </form>
      </main>
    </>
  );
};
export default CreateBudget;

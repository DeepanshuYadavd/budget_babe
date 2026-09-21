import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";
import {
  Layers,
  Plus,
  X,
  Check,
  IndianRupee,
  Calendar,
  CalendarDays,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

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
    year: new Date().getFullYear().toString(),
  });

  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCategories = async () => {
    try {
      const response = await apiClient.get("/category/get");
      setCategories(response.data.data || []);
      // If categories exist and budgetData has no category yet, preselect the first category
      if (response.data.data?.length > 0 && !budgetData.category) {
        setBudgetData((prev) => ({
          ...prev,
          category: prev.category || response.data.data[0]._id,
        }));
      }
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
    if (!createCategoryData.category.trim()) return;

    try {
      await apiClient.post("/category/create", createCategoryData);
      await getCategories();
      setcreateCategoryData({
        category: "",
      });
      setCreateCategory(false);
      setStatusMessage({
        type: "success",
        text: "New category created successfully!",
      });
    } catch (err) {
      console.log(err.message);
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to create category",
      });
    }
  };

  const month = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  const handleChange = (e) => {
    setBudgetData({
      ...budgetData,
      [e.target.name]: e.target.value,
    });
    if (statusMessage.text) {
      setStatusMessage({ type: "", text: "" });
    }
  };

  const createBudget = async (dataToSubmit) => {
    try {
      setIsSubmitting(true);
      const response = await apiClient.post("/budget/create", dataToSubmit);
      console.log(response, "test");
      setStatusMessage({
        type: "success",
        text: "Budget created successfully!",
      });
      setBudgetData({
        category: categories.length > 0 ? categories[0]._id : "",
        amount: "",
        month: "",
        year: new Date().getFullYear().toString(),
      });
    } catch (err) {
      console.log(err.message);
      setStatusMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to create budget",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitBudget = (e) => {
    e.preventDefault();
    if (!budgetData.category) {
      setStatusMessage({ type: "error", text: "Please select a category." });
      return;
    }
    if (!budgetData.amount || Number(budgetData.amount) <= 0) {
      setStatusMessage({ type: "error", text: "Please enter a valid amount." });
      return;
    }
    if (!budgetData.month) {
      setStatusMessage({ type: "error", text: "Please select a month." });
      return;
    }
    if (!budgetData.year) {
      setStatusMessage({ type: "error", text: "Please specify a year." });
      return;
    }

    createBudget(budgetData);
  };

  return (
    <div className="create-budget-wrapper">
      <div className="create-budget-card">
        <div className="auth-header" style={{ marginBottom: "1.75rem" }}>
          <h1>Create Budget</h1>
          <p>Define spending limits per category to stay financially on track.</p>
        </div>

        {statusMessage.text && (
          <div
            className={`alert ${
              statusMessage.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="alert-icon" />
            ) : (
              <AlertCircle className="alert-icon" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={submitBudget}>
          {/* Category Selection */}
          <div className="form-group">
            <div className="category-header-bar">
              <label className="form-label" htmlFor="budget-category">
                Category
              </label>
              <button
                type="button"
                className="btn-inline-toggle"
                onClick={() => setCreateCategory(!createCategory)}
              >
                {createCategory ? (
                  <>
                    <X size={14} /> Close
                  </>
                ) : (
                  <>
                    <Plus size={14} /> New Category
                  </>
                )}
              </button>
            </div>

            <div className="input-container">
              <Layers className="input-icon" />
              {categoryLoader ? (
                <select
                  id="budget-category"
                  className="form-select"
                  disabled
                  value=""
                >
                  <option value="" disabled>
                    Loading categories...
                  </option>
                </select>
              ) : categories.length === 0 ? (
                <select
                  id="budget-category"
                  className="form-select"
                  disabled
                  value=""
                >
                  <option value="" disabled>
                    No categories found. Create one first!
                  </option>
                </select>
              ) : (
                <select
                  id="budget-category"
                  name="category"
                  className="form-select"
                  value={budgetData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Inline Create Category Form */}
            {createCategory && (
              <div className="inline-category-box">
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                    fontWeight: 600,
                  }}
                >
                  Create New Category:
                </span>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: "1rem" }}
                  placeholder="e.g. Groceries, Entertainment, Rent"
                  onChange={handleCategoryChange}
                  name="category"
                  value={createCategoryData.category}
                />
                <div className="inline-category-actions">
                  <button
                    type="button"
                    className="btn-mini-cancel"
                    onClick={() => setCreateCategory(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-mini-save"
                    onClick={handleCategorySubmit}
                  >
                    <Check size={14} style={{ display: "inline", marginRight: "4px" }} />
                    Save Category
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="budget-amount">
              Budget Amount
            </label>
            <div className="input-container">
              <IndianRupee className="input-icon" />
              <input
                id="budget-amount"
                type="number"
                step="any"
                min="1"
                className="form-input"
                value={budgetData.amount}
                placeholder="e.g. 5000"
                name="amount"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Month & Year in 2 Columns */}
          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label" htmlFor="budget-month">
                Month
              </label>
              <div className="input-container">
                <Calendar className="input-icon" />
                <select
                  id="budget-month"
                  className="form-select"
                  onChange={handleChange}
                  name="month"
                  value={budgetData.month}
                  required
                >
                  <option value="" disabled>
                    Select Month
                  </option>
                  {month.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="budget-year">
                Year
              </label>
              <div className="input-container">
                <CalendarDays className="input-icon" />
                <input
                  id="budget-year"
                  type="number"
                  className="form-input"
                  placeholder="YYYY"
                  min="2020"
                  max="2100"
                  onChange={handleChange}
                  value={budgetData.year}
                  name="year"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                <span>Creating Budget...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Create Budget</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBudget;

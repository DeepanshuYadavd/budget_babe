import { Budget } from "../modal/budget.schema.js";

export const createBudget = async (req, res, next) => {
  try {
    const { category, amount, month, year } = req.body;
    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    const isBudgetExist = await Budget.findOne({
      user: req.user._id,
      category: category,
      month: month,
      year: year,
    });

    if (isBudgetExist) {
      return res.status(409).json({
        message: "Budget with this category is already exist",
      });
    }
    const budgetData = await Budget.create({
      user: req.user._id,
      category,
      amount,
      month,
      year,
    });
    return res.status(201).json({
      message: "Budget created successfully",
      data: {
        budget: budgetData._id,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getBudget = async (req, res, next) => {
  try {
    const budget = await Budget.find().populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "category",
      },
    ]);
    if (budget.length === 0) {
      return res.status(400).json({
        message: "Budget Not found",
      });
    }
    return res.status(200).json({
      budget,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

import { Budget } from "../modal/budget.schema.js";
import { Purchase } from "../modal/purchase.schema.js";

export const getDashboardData = async (req, res, next) => {
  try {
    // 1. Get all budgets and purchases for current user
    const budgets = await Budget.find({ user: req.user._id })
      .populate("category")
      .sort({ createdAt: -1 });

    const purchases = await Purchase.find({ user: req.user._id })
      .populate("category")
      .populate("budget")
      .sort({ date: -1, createdAt: -1 });

    // 2. Core calculations
    const totalBudget = budgets.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const totalSpent = purchases.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const remaining = totalBudget - totalSpent;

    // 3. Calculate spent amount per budget
    const budgetSpentMap = {};
    purchases.forEach((p) => {
      const bId = p.budget?._id?.toString() || p.budget?.toString();
      if (bId) {
        budgetSpentMap[bId] = (budgetSpentMap[bId] || 0) + (Number(p.amount) || 0);
      }
    });

    const enrichedBudgets = budgets.map((b) => {
      const bId = b._id.toString();
      const spent = budgetSpentMap[bId] || 0;
      const amount = Number(b.amount) || 0;
      const rem = amount - spent;
      const percentageSpent = amount > 0 ? Math.min(100, Math.round((spent / amount) * 100)) : 0;

      return {
        ...b.toObject(),
        spent,
        remaining: rem,
        percentageSpent,
      };
    });

    // 4. Calculate category spending breakdown
    const categoryMap = {};
    purchases.forEach((p) => {
      const catName = p.category?.category || p.category?.name || "General";
      categoryMap[catName] = (categoryMap[catName] || 0) + (Number(p.amount) || 0);
    });

    const categoryBreakdown = Object.entries(categoryMap)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    const burnRate = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    const activeBudgetsCount = budgets.filter((b) => !b.isDone).length;

    // 5. Send clean and rich response
    return res.status(200).json({
      totalBudget,
      totalSpent,
      remaining,
      totalBudgets: budgets.length,
      totalPurchases: purchases.length,
      burnRate,
      activeBudgetsCount,
      budgets: enrichedBudgets,
      recentPurchases: purchases.slice(0, 8),
      categoryBreakdown,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};


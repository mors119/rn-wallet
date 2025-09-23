export async function getTransactionsByUserId() {
  try {
    const { userId } = req.params;

    console.log('user ID:', userId);

    const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
      `;

    res.status(200).json(transactions);
  } catch (error) {
    console.log('Error getting the transactions', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function createTransaction() {}

const baseUrl = 'http://localhost:3000/api/expenses';
let editExpenseId = null; // To track the expense being edited
const resetForm = () => {
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
};


document.getElementById('expenseForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const expenseData = { amount, description, category };
    if (editExpenseId) {
        try {
            await axios.put(`${baseUrl}/edit/${editExpenseId}`, expenseData);
            fetchExpenses(); // Refresh the expense list after updating
            resetForm(); // Reset the form
            editExpenseId = null; // Clear the edit ID
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    } else {
        try {
            const res = await axios.post(`${baseUrl}/add`, expenseData);
            fetchExpenses(); // Refresh the expense list after adding a new expense
            resetForm(); // Reset the form
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    }
});


const fetchExpenses = async () => {
    try {
        const response = await axios.get(`${baseUrl}/`);//Frontend → Express App → expenseRoutes → expenseController → expenseModel → Database
        const expenses = response.data;
        const ul = document.getElementById('list');
        ul.innerHTML = ''; // Clear existing list
        expenses.forEach(expense => {
            const li = document.createElement('li');
            const delbtn = document.createElement('button');
            const edtibtn = document.createElement('button');
            edtibtn.textContent = 'Edit';
            delbtn.textContent = 'Delete';
            li.textContent = `${expense.amount} - ${expense.description} - (${expense.category})`;
            ul.appendChild(li);
            li.appendChild(delbtn);
            delbtn.addEventListener('click', async () => {
                try {
                    await axios.delete(`${baseUrl}/delete/${expense.id}`);
                    li.remove();
                    fetchExpenses(); // Refresh the expense list after deletion
                } catch (error) {
                    console.error('Error deleting expense:', error);
                }
            });

            li.appendChild(edtibtn);
            edtibtn.addEventListener('click', async () => {
                document.getElementById('amount').value = expense.amount;
                document.getElementById('description').value = expense.description;
                document.getElementById('category').value = expense.category;
                editExpenseId = expense.id; // Set the ID of the expense being edited
               

            });


        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
    }
};

fetchExpenses();


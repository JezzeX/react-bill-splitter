import React from "react";
import Button from "./Button";

export default function FormSplitBill({
    selectedFriend,
    bill,
    expense,
    setBill,
    setExpense,
    updateBalance,
}) {
    const [isPaying, setIsPaying] = React.useState('user');
    let bal = bill - expense;
    let final = isPaying === 'user' ? -bal : expense;
    return (
        <form
            className="form-split-bill"
            onSubmit={(e) => updateBalance(selectedFriend, e, final)}
        >
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>Bill value</label>
            <input
                type="number"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
            />

            <label>Your expense</label>
            <input
                type="number"
                value={expense}
                onChange={(e) => setExpense(Number(e.target.value))}
            />

            <label>{selectedFriend.name}'s expense</label>
            <input type="text" disabled value={bal} />

            <label>Who is paying the bill</label>
            <select onChange={(e) => setIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split bill </Button>
        </form>
    );
}

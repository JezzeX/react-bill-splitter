import React from 'react';
import './index.css';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = React.useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = React.useState(false);
  const [selectedFriend, setSelectedFriend] = React.useState('');
  const [bill, setBill] = React.useState('');
  const [expense, setExpense] = React.useState('');

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(newfriend) {
    setFriends((friends) => [...friends, newfriend]);
    setShowAddFriend(false);
  }

  function handleCurrentFriend(id) {
    setSelectedFriend(friends.find((friend) => friend.id === id));
    setBill('');
    setExpense('');
  }

  function updateBalance(selectedFriend, e, value) {
    e.preventDefault();

    setFriends((friends) =>
      friends.map((friend) =>
        selectedFriend.id === friend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleCurrentFriend={handleCurrentFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onclick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill
        bill={bill}
        expense={expense}
        setBill={setBill}
        setExpense={setExpense}
        selectedFriend={selectedFriend}
        updateBalance={updateBalance}
      />}
    </div>
  );
}

function Button({ children, onclick }) {
  return (
    <button onClick={onclick} className="button">
      {children}
    </button>
  );
}

function FriendsList({ friends, handleCurrentFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          handleCurrentFriend={handleCurrentFriend}
        />
      ))}
    </ul>
  );
}

function Friends({ friend, handleCurrentFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          {' '}
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {' '}
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p className="black"> You are even</p>}
      <Button onclick={() => handleCurrentFriend(friend.id)}>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    console.log(newFriend);

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({
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

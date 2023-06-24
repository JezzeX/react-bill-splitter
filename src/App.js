import React from 'react';
import './index.css';
import Button from './components/Button';
import FormAddFriend from './components/FormAddFriend';
import FriendsList from './components/FriendsList';
import FormSplitBill from './components/FormSplitBill';

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

    setBill("")
    setExpense("")
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






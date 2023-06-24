import Button from "./Button";

export default function FriendsList({ friends, handleCurrentFriend }) {
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
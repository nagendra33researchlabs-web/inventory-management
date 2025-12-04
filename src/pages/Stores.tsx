import { useAppContext } from "../context/AppContext";
const Stores = () => {
  const {user} = useAppContext();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stores</h1>
      <div className="bg-white rounded-lg shadow p-6">
        {/* <p>Stores management content will go here.{user}</p> */}
        <p>{user ? user.name : 'No user'}</p>
      </div>
    </div>
  );
};

export default Stores;

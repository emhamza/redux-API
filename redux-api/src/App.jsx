import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./users/usersSlice";

function App() {
  const {users, isLoading, error } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  if (isLoading){
    return <p>Loading...</p>
  }
  if (error){
    return <p>Loading Error</p>
  }
  return (
    <>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name.first} {user.name.last}
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default App

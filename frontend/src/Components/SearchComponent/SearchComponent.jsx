import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import SearchUserCard from "./SearchUserCard";
import "./SearchComponent.css"; // optional: can be replaced by Tailwind or modern CSS module

const SearchComponent = ({ setIsSearchVisible }) => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSearchUser = (query) => {
    const data = {
      jwt: token,
      query,
    };
    dispatch(searchUserAction(data));
  };

  const debouncedHandleSearchUser = debounce(handleSearchUser, 800);

  return (
    <div className="bg-white shadow-xl rounded-xl w-full max-w-md mx-auto mt-10 overflow-hidden">
      <div className="p-5">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Search Users</h1>
        <input
          onChange={(e) => debouncedHandleSearchUser(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="text"
          placeholder="Search by username..."
        />
      </div>

      <hr />

      <div className="p-5 max-h-80 overflow-y-auto">
        {!user?.searchResult?.isError ? (
          user?.searchResult?.length > 0 ? (
            user.searchResult.map((item) => (
              <SearchUserCard
                key={item.id}
                setIsSearchVisible={setIsSearchVisible}
                username={item.username}
                image={item?.image}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 pt-10">Start typing to search users</p>
          )
        ) : (
          <h2 className="text-red-500 font-semibold text-center pt-10">User Not Found</h2>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;

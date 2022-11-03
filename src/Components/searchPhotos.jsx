import React, { useState } from 'react';
import Unsplash, { toJson } from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  });

function SearchPhotos() {

    const [query, setQuery] = useState('');

    const searchPhotos = async (e) => {
        e.preventDefault();
        unsplash.search
        .photos(query, 1, 1)
        .then(toJson)
        .then((json) => {
            console.log(json);
        });
      };

    return (
        <>
            <form className="form" onSubmit={searchPhotos}> 
                <label className="label" htmlFor="query"> 
                    {" "}
                    📷
                </label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder={`Try "dog" or "apple"`}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="button">
                    Search
                </button>
            </form>
        </>
    );
};

export default SearchPhotos;
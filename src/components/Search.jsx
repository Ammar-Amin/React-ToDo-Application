import React from 'react'

function Search({ input }) {
    return (
        <div className="w-full bg-white absolute z-10">
            <p className="max-w-[500px] p-4 m-auto break-words text-xl">{input}</p>
        </div>
    )
}

export default Search

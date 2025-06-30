import React from 'react'

const Home = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold">Welcome, {localStorage.getItem("username")}</h1>
    </div>
  )
}

export default Home